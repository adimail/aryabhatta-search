/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ChatMessage {
  content: string;
}

export interface ChatChoice {
  message: ChatMessage;
}

export interface ChatCompletion {
  choices: ChatChoice[];
}

export interface ParsedData {
  summary: string;
  Structure: Record<string, any> | any[];
}

export interface GoogleSearchProps {
  query: string;
}

export interface YandexImage {
  thumbnail: string;
  link: string;
  title: string;
}
