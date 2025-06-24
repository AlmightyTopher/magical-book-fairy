require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const FAIRY_WEBHOOK_URL = process.env.FAIRY_WEBHOOK_URL;
const FAIRY_NAME = process.env.FAIRY_NAME || 'The Magical Book Fairy';

client.once('ready', () => {
  console.log(`${FAIRY_NAME} is fluttering online!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.mentions.has(client.user)) return;

  const cleanContent = message.content.replace(/<@!?(\d+)>/, '').trim();
  if (!cleanContent) return;

  try {
    await message.channel.sendTyping();

    const { data } = await axios.post(FAIRY_WEBHOOK_URL, {
      message: cleanContent
    });

    const fairyReply = data.response || '✨ My magic fizzled. Try again soon.';
    await message.reply(fairyReply);

  } catch (err) {
    console.error('Error sending to n8n webhook:', err.message);
    await message.reply('⚠️ My wand slipped. I couldn’t cast that spell.');
  }
});

client.login(DISCORD_TOKEN);
