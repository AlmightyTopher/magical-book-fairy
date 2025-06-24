require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
  console.log(`🧚 The Magical Book Fairy has awoken as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase().includes("book fairy")) {
    message.reply("📚✨ You've summoned the Magical Book Fairy. What wisdom do you seek?");
  }
});

client.login(process.env.DISCORD_TOKEN);