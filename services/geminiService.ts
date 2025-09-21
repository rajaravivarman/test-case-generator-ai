import { GoogleGenAI, Type } from "@google/genai";
import { Project, Requirement, TestCase } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateTestCasesPrompt = (project: Project, requirements: Requirement[]): string => {
    const requirementsText = requirements.map(req => `- ${req.id}: ${req.text}`).join('\n');

    return `
You are an expert QA Engineer specializing in software testing and compliance. Your task is to analyze the following software project description and user requirements to generate a comprehensive set of test cases.

Project Name: ${project.name}
Project Description: ${project.description}

Requirements:
${requirementsText}

For each requirement, generate one or more detailed test cases. Each test case must be directly traceable to a single requirement ID provided.

Your output must be a valid JSON array of test case objects. Do not include any text, markdown formatting, or explanations before or after the JSON array. Adhere strictly to the provided JSON schema.
`;
};

const testCaseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: {
          type: Type.STRING,
          description: "A unique identifier for the test case, e.g., 'TC-001'."
        },
        title: {
          type: Type.STRING,
          description: "A concise, descriptive title for the test case."
        },
        description: {
          type: Type.STRING,
          description: "A brief description of the test case's objective."
        },
        steps: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
          description: "An array of strings, where each string is a clear, sequential step to execute the test."
        },
        expectedResults: {
          type: Type.STRING,
          description: "A clear description of the expected outcome after executing the test steps."
        },
        requirementId: {
          type: Type.STRING,
          description: "The ID of the requirement this test case covers, e.g., 'REQ-001'."
        }
      },
      required: ["id", "title", "description", "steps", "expectedResults", "requirementId"]
    }
};

export const generateTestCasesFromRequirements = async (project: Project, requirements: Requirement[]): Promise<TestCase[]> => {
    try {
        const prompt = generateTestCasesPrompt(project, requirements);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: testCaseSchema,
                temperature: 0.2, // Lower temperature for more deterministic, structured output
            },
        });
        
        const jsonText = response.text.trim();

        if (!jsonText) {
            throw new Error("Received an empty response from the AI.");
        }
        
        const generatedCases: TestCase[] = JSON.parse(jsonText);
        return generatedCases;

    } catch (error: any) {
        console.error("Error calling Gemini API:", error);
        throw new Error(`Failed to communicate with the AI model. ${error.message}`);
    }
};
