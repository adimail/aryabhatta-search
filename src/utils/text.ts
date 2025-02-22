export function cleanLLMResponse({ response }: { response: string }) {
    return response.replace(/```json\n/, "").replace(/```\n/, "");
}

