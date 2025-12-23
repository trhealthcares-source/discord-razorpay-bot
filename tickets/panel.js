const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../config");

async function ensurePanel(client) {
  const channel = await client.channels.fetch(config.channels.ticketPanel);
  if (!channel) return;

  const messages = await channel.messages.fetch({ limit: 10 });
  const exists = messages.some(m => m.author.id === client.user.id);

  if (exists) return;

  const embed = new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle("Purchase Subscription")
    .setDescription("Click the button below to start payment.");

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("open_ticket")
      .setLabel("Buy / Renew")
      .setStyle(ButtonStyle.Primary)
  );

  await channel.send({ embeds: [embed], components: [row] });
}

module.exports = { ensurePanel };
