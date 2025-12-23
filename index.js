/**
 * Entry point for Discord Razorpay Subscription Bot
 * Compatible with bot-hosting.net
 */

require("dotenv").config();
const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require("discord.js");
const config = require("./config");

// ===== ENV VALIDATION =====
if (!process.env.DISCORD_TOKEN) {
  console.error("❌ DISCORD_TOKEN missing in .env");
  process.exit(1);
}

// ===== CLIENT =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

// ===== COLLECTIONS =====
client.commands = new Collection();

// ===== LOAD DATABASE & SCHEDULERS =====
require("./database/db");
require("./scheduler/recovery")(client);
require("./backup/backup");

// ===== LOAD COMMANDS =====
const loadCommands = (dir) => {
  const fs = require("fs");
  const path = require("path");

  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      loadCommands(fullPath);
    } else if (file.name.endsWith(".js")) {
      const command = require(fullPath);
      if (command.name) {
        client.commands.set(command.name, command);
      }
    }
  }
};

loadCommands("./commands");

// ===== MESSAGE HANDLER =====
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();
  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    await command.execute(client, message, args);
  } catch (err) {
    console.error(err);
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Error")
      .setDescription("An unexpected error occurred. Please try again later.");
    message.reply({ embeds: [embed] }).catch(() => {});
  }
});

// ===== READY =====
client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // Send ticket panel message if not exists
  try {
    const panel = require("./tickets/panel");
    await panel.ensurePanel(client);
  } catch (e) {
    console.error("Ticket panel error:", e.message);
  }
});

// ===== LOGIN =====
client.login(process.env.DISCORD_TOKEN);
