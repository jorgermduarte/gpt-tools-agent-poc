import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { tools } from './tools.js';
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class OpenAIAgent {
    static tools = tools;
    static async chat(messages, tools = OpenAIAgent.tools) {
        return await client.chat.completions.create({
        model: 'gpt-4o',
        messages,
        tools,
        tool_choice: 'auto'
        });
    }

    static async continue(messages) {
        return await client.chat.completions.create({
            model: 'gpt-4o',
            messages,
            tools: OpenAIAgent.tools,
            tool_choice: 'auto'
        });
    }
}
