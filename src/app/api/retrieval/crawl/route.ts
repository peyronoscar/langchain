import { NextRequest, NextResponse } from "next/server";
import puppeteer, { Page } from 'puppeteer'
import fs from 'fs'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
   // const body = await req.json();
   // const text = body.text;

   try {

      // Launch a new browser session.
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Navigate to the URL.
      await page.goto('https://www.ikea.com/se/sv/cat/produkter-products/', {
         waitUntil: 'networkidle2',
      });

      const categoryLinks = await page.$$eval('.vn-list--plain a', links => links.filter(link => link.textContent !== "Se alla").map(link => ({ href: link.href, text: link.textContent })));
      const uniqueCategoryLinks = [...new Set(categoryLinks)]
      uniqueCategoryLinks.splice(0, 2)

      for (let category of uniqueCategoryLinks) {
         await crawlCategory(page, category)
      }

      await browser.close();

      return NextResponse.json({ ok: true }, { status: 200 });
   } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 500 });
   }
}

async function crawlCategory(page: Page, category: { href: string, text: string | null }) {
   const categoryLink = category.href;
   const categoryText = category.text;
   await page.goto(categoryLink + "?page=1000", {
      waitUntil: 'networkidle2',
   });

   const productLinks = await page.$$eval('.plp-mastercard__price a', links => links.map(link => link.href));

   const uniqueProductLinks = [...new Set(productLinks)].filter(link => link.startsWith("https://www.ikea.com/se/sv/"));
   let i = 0;

   console.log(uniqueProductLinks.length, categoryText)

   for (let link of uniqueProductLinks) {
      await page.goto(link, { waitUntil: 'networkidle2' });
      const title = await page.$eval('.pip-header-section__title--big', span => span.textContent);
      const subtitle = await page.$eval('.pip-header-section__description-text', span => span.textContent);
      const price = await page.$eval('.pip-temp-price__integer', span => span.textContent);
      const summary = await page.evaluate(() => {
         const span = document.querySelector('.pip-product-summary__description');
         return span ? span.textContent : null;
      });
      const details = await page.$eval('.pip-product-details__container', span => span.textContent);
      const size = await page.$eval('.pip-product-dimensions__dimensions-container', span => span.textContent);
      const sku = await page.$eval('.pip-product-identifier__value', span => span.textContent);

      const data = `Title: ${title}\nSubtitle: ${subtitle ? subtitle.slice(0, -1) : subtitle}\nPrice: ${price}SEK\nSummary: ${summary}\nDetails: ${details}\n${size ? size.replace(/([A-ZÅÄÖ])/g, '\n$1').trim() : size}\nSKU: ${sku}\n\n`;
      fs.appendFile(`src/document_loaders/${categoryText}_products.txt`, data, (err: any) => {
         if (err) throw err;
         console.log('Data has been written to the file', i);
      });

      i++;
   }
}
