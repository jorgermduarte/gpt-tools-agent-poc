import express from 'express';
import dotenv from 'dotenv';
import { OpenAIAgent } from './openai/openai.js';
import { ToolFactory } from './openai/tool.factory.js';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/prompt', async (req, res) => {
  try {
    const userInput = req.body.prompt;
    if (!userInput) return res.status(400).json({ error: 'Missing prompt' });

    const messages = [{ role: 'user', content: userInput }];

    // Primeira chamada ao modelo
    let response = await OpenAIAgent.chat(messages);

    while (true) {
      const toolCalls = response.choices[0].message.tool_calls;
      messages.push(response.choices[0].message);

      if (toolCalls) {
        for (const call of toolCalls) {
          const { name, arguments: argsJson } = call.function;
          const args = JSON.parse(argsJson);

          const result = await ToolFactory.execute(name, args);

          messages.push({
            role: 'tool',
            tool_call_id: call.id,
            content: result
          });
        }

        // Continua após executar tools
        response = await OpenAIAgent.continue(messages);
      } else {
        // Sem tool_calls, resposta final
        break;
      }
    }

    res.json({ response: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API pronta em http://localhost:${PORT}`));
