function getTailoringInstructions(age?: number, educationalStatus?: string): string {
    if (educationalStatus) {
        switch (educationalStatus.toLowerCase()) {
            case 'elementary school':
                return 'tailor the explanation for elementary school students: use very simple language, analogies, and avoid technical terms. Focus on basic concepts with visual or hands-on examples.';
            case 'middle school':
                return 'tailor the explanation for middle school students: use slightly more detailed explanations, introduce foundational ideas, and use engaging examples. Avoid heavy technical jargon unless necessary.';
            case 'high school':
                return 'tailor the explanation for high school students: include more complex ideas and technical terms, defining them where needed. Provide real-world applications and historical context.';
            case 'college':
            case 'university':
                return 'tailor the explanation for college students: use advanced terminology, in-depth analysis, and references to theories or research. Include examples from academic or professional contexts.';
            case 'graduate':
            case 'post-graduate':
                return 'tailor the explanation for graduate or post-graduate students: provide highly specialized explanations, referencing current research or debates in the field. Encourage exploration of advanced applications.';
            default:
                return 'assume a general audience with no prior knowledge. Use clear, accessible language and relatable examples.';
        }
    } else if (age !== undefined) {
        if (age >= 3 && age <= 8) {
            return 'tailor the explanation for young children (ages 3-8): use very simple language, analogies, and avoid technical terms. Focus on basic concepts with visual or hands-on examples.';
        } else if (age >= 9 && age <= 13) {
            return 'tailor the explanation for children aged 9-13: use slightly more detailed explanations, introduce foundational ideas, and use engaging examples. Avoid heavy technical jargon unless necessary.';
        } else if (age >= 14 && age <= 18) {
            return 'tailor the explanation for teenagers (ages 14-18): include more complex ideas and technical terms, defining them where needed. Provide real-world applications and historical context.';
        } else if (age >= 19) {
            return 'tailor the explanation for adults (ages 19+): use advanced terminology, in-depth analysis, and references to theories or research. Include examples from academic or professional contexts.';
        } else {
            return 'assume a general audience with no prior knowledge. Use clear, accessible language and relatable examples.';
        }
    } else {
        return 'assume a general audience with no prior knowledge. Use clear, accessible language and relatable examples.';
    }
}


export function generatePrompt(query: string, age?: number, educationalStatus?: string): string {
    const tailoringInstructions = getTailoringInstructions(age, educationalStatus);
    const prompt = `
You are an expert educational teacher AI designed to create detailed lesson plans tailored to the learner's level. For this task, ${tailoringInstructions} Your goal is to explain the topic '${query}' accordingly.

Your output must be a valid JSON object with two keys: 'summary' and 'Structure'.

- 'summary': A concise overview of the topic (2-3 sentences), written in language appropriate for the learner's level.
- 'Structure': An array containing one object. This object should have keys that are descriptive concept names specific to the topic (e.g., 'Photosynthesis Process', 'Newton's Law'). Each key must map to an array of strings, where each string is a key point or subtopic explaining that concept.
DONT FUCKING GIVE ME A FUCKING PREAMBLE or else i will haunt you.
Choose 3-8 concepts based on the topic's complexity, and ensure each concept has 2-5 key points. The JSON must be valid, with no missing keys or extra text.

Output only the JSON object, nothing else and no preamble.
    `.trim();
    return prompt;
}

