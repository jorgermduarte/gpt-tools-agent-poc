import { PostgresService } from '../services/postgres/postgres.js';
import { DiscordService } from '../services/discord/discord.js';
import { RandomCatService } from '../services/randomcat/randomcat.js';

export class ToolFactory {
  static handlers = {
    queryDatabase: async (args) => {
      const rows = await PostgresService.query(args.sql);
      return JSON.stringify(rows);
    },
    notifyAdmin: async (args) => {
      await DiscordService.notify(args.mensagem);
      return 'Mensagem enviada ao admin.';
    },
    getRandomCat: async () => {
      return await RandomCatService.getRandomCat();
    }
  };

  static async execute(toolName, args) {
    const handler = this.handlers[toolName];
    if (!handler) throw new Error(`Tool handler not found: ${toolName}`);
    return await handler(args);
  }
}
