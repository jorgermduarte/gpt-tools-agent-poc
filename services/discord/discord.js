import { Client as DiscordClient, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const discord = new DiscordClient({
  intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds],
  partials: ['CHANNEL']
});

await discord.login(process.env.DISCORD_BOT_TOKEN);

export class DiscordService {
  static async notify(message) {
    const user = await discord.users.fetch(process.env.DISCORD_ADMIN_ID);
    if (user) await user.send(message);
  }
}
