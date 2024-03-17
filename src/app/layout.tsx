import "@/styles/globals.css";

import { Navbar } from "@/components/Navbar";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

import { Metadata } from "next";
import Image from "next/image";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { CodeViewer } from "@/components/layout/code-viewer";
import { MaxLengthSelector } from "@/components/layout/maxlength-selector";
import { ModelSelector } from "@/components/layout/model-selector";
import { PresetActions } from "@/components/layout/preset-actions";
import { PresetSave } from "@/components/layout/preset-save";
import { PresetSelector } from "@/components/layout/preset-selector";
import { PresetShare } from "@/components/layout/preset-share";
import { TemperatureSelector } from "@/components/layout/temperature-selector";
import { TopPSelector } from "@/components/layout/top-p-selector";
import { models, types } from "@/data/models";
import { presets } from "@/data/presets";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { ModeToggle } from "@/components/layout/mode-toggle";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>LangChain + Next.js Template</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta
          name="description"
          content="Starter template showing how to use LangChain in Next.js projects. See source code and deploy your own at https://github.com/langchain-ai/langchain-nextjs-template!"
        />
        <meta property="og:title" content="LangChain + Next.js Template" />
        <meta
          property="og:description"
          content="Starter template showing how to use LangChain in Next.js projects. See source code and deploy your own at https://github.com/langchain-ai/langchain-nextjs-template!"
        />
        <meta property="og:image" content="/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LangChain + Next.js Template" />
        <meta
          name="twitter:description"
          content="Starter template showing how to use LangChain in Next.js projects. See source code and deploy your own at https://github.com/langchain-ai/langchain-nextjs-template!"
        />
        <meta name="twitter:image" content="/images/og-image.png" />
      </head>
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container flex flex-col items-start justify-between py-4 space-y-2 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
            <h2 className="text-lg font-semibold">Playground</h2>
            <div className="flex w-full ml-auto space-x-2 sm:justify-end">
              <PresetSelector presets={presets} />
              <PresetSave />
              <div className="hidden space-x-2 md:flex">
                <CodeViewer />
                <PresetShare />
              </div>
              <PresetActions />
              <ModeToggle />
            </div>
          </div>
          <Separator />
          <div className="container flex-1 min-h-0 py-6">
            <main className="flex h-full gap-6">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
