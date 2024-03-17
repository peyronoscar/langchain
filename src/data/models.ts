export const types = ["GPT-4", "GPT-3"] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  id: string
  name: string
  description: string
  strengths?: string
  type: Type,
  maxTokens: number
}

export const models: Model<ModelType>[] = [
  {
    id: "be638fb1-973b-4471-a49c-291325185102",
    name: "gpt-4-0125-preview",
    description:
      "The latest GPT-4 model intended to reduce cases of “laziness” where the model doesn’t complete a task. Returns a maximum of 4,096 output tokens.",
    type: "GPT-4",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
    maxTokens: 4096
  },
  {
    id: "be638fb1-973b-4471-a49c-291325185103",
    name: "gpt-4-turbo-preview",
    description:
      "Currently points to gpt-4-0125-preview.",
    type: "GPT-4",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
    maxTokens: 4096
  },
  {
    id: "be638fb1-973b-4471-a49c-291325185104",
    name: "gpt-4-1106-preview",
    description:
      "GPT-4 Turbo model featuring improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Returns a maximum of 4,096 output tokens. This is a preview model.",
    type: "GPT-4",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
    maxTokens: 4096
  },
  {
    id: "be638fb1-973b-4471-a49c-291325185105",
    name: "gpt-4-vision-preview",
    description:
      "GPT-4 with the ability to understand images, in addition to all other GPT-4 Turbo capabilities. Currently points to gpt-4-1106-vision-preview.",
    type: "GPT-4",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
    maxTokens: 4096
  },
  {
    id: "be638fb1-973b-4471-a49c-291325185106",
    name: "gpt-4-1106-vision-preview",
    description:
      "GPT-4 with the ability to understand images, in addition to all other GPT-4 Turbo capabilities. Returns a maximum of 4,096 output tokens. This is a preview model version.",
    type: "GPT-4",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
    maxTokens: 4096
  },
  {
    id: "be638fb1-973b-4471-a49c-291325185107",
    name: "gpt-4",
    description:
      "Currently points to gpt-4-0613.",
    type: "GPT-4",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
    maxTokens: 8192
  },
  {
    id: "be638fb1-973b-4471-a49c-291325185108",
    name: "gpt-4-0613",
    description:
      "Snapshot of gpt-4 from June 13th 2023 with improved function calling support.",
    type: "GPT-4",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
    maxTokens: 8192
  },
  {
    id: "be638fb1-973b-4471-a49c-291325185109",
    name: "gpt-4-32k",
    description:
      "Currently points to gpt-4-32k-0613. See continuous model upgrades. This model was never rolled out widely in favor of GPT-4 Turbo.",
    type: "GPT-4",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
    maxTokens: 32768
  },
  {
    id: "be638fb1-973b-4471-a49c-291325185110",
    name: "gpt-4-32k-0613",
    description:
      "Snapshot of gpt-4-32k from June 13th 2023 with improved function calling support. This model was never rolled out widely in favor of GPT-4 Turbo.",
    type: "GPT-4",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
    maxTokens: 32768
  },
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "gpt-3.5-turbo-0125",
    description:
      "The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls. Returns a maximum of 4,096 output tokens.",
    type: "GPT-3",
    strengths:
      "Complex intent, cause and effect, creative generation, search, summarization for audience",
    maxTokens: 16385
  },
  {
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "gpt-3.5-turbo",
    description: "Currently points to gpt-3.5-turbo-0125.	",
    type: "GPT-3",
    strengths:
      "Language translation, complex classification, sentiment, summarization",
    maxTokens: 16385
  },
  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "gpt-3.5-turbo-1106",
    description: "GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Returns a maximum of 4,096 output tokens.",
    type: "GPT-3",
    strengths: "Moderate classification, semantic search",
    maxTokens: 16385
  },
  {
    id: "be638fb1-973b-4471-a49c-290325085802",
    name: "gpt-3.5-turbo-instruct",
    description:
      "Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions.",
    type: "GPT-3",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
    maxTokens: 4096
  },
]
