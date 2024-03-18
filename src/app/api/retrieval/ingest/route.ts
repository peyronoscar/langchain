import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import fs from "fs"


// Before running, follow set-up instructions at
// https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase

/**
 * This handler takes input text, splits it into chunks, and embeds those chunks
 * into a vector store for later retrieval. See the following docs for more information:
 *
 * https://js.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/recursive_text_splitter
 * https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/supabase
 */
export async function POST(req: NextRequest) {
  // const body = await req.json();
  // const text = body.text;

  if (process.env.NEXT_PUBLIC_DEMO === "true") {
    return NextResponse.json(
      {
        error: [
          "Ingest is not supported in demo mode.",
          "Please set up your own version of the repo here: https://github.com/langchain-ai/langchain-nextjs-template",
        ].join("\n"),
      },
      { status: 403 },
    );
  }

  try {
    const loader = new DirectoryLoader(
      "src/document_loaders",
      {
        // ".json": (path) => new JSONLoader(path, [""]),
        // ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
        ".txt": (path) => new TextLoader(path),
      }
    );

    const docs = await loader.load();

    // const data = JSON.parse(fs.readFileSync("/Users/oscarpeyron/Documents/Studier/langchain/src/document_loaders/data.json", 'utf8'));

    // // Initialize an empty string to accumulate the content
    // let allContent = '';

    // // Function to add each object's content to the allContent string
    // data.forEach((doc, index) => {
    //   const { title, summary_text, content_text, ikea_internal_text } = doc;
    //   allContent += `Title: ${title}\nSummary: ${summary_text}\nContent: ${content_text}\nInternal text: ${ikea_internal_text}`;

    //   // Add a separator between articles, but not after the last one
    //   if (index < data.length - 1) {
    //     allContent += "\n\n";
    //   }
    // });

    // // Specify the filename for the consolidated file
    // const filename = 'all_articles.txt';

    // // Write the accumulated content to the file
    // fs.writeFileSync(filename, allContent, 'utf8');
    // console.log(`All content has been written to ${filename}.`);


    // return;

    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PRIVATE_KEY!,
    );

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
      chunkSize: 1024,
      chunkOverlap: 100,
    });

    for (const doc of docs) {
      const text = doc.pageContent;
      const splitDocuments = await splitter.createDocuments([text]);

      const vectorstore = await SupabaseVectorStore.fromDocuments(
        splitDocuments,
        new OpenAIEmbeddings(),
        {
          client,
          tableName: "documents",
          queryName: "match_documents",
        },
      );

      console.log({ vectorstore })
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
