const config = require("../config");

async function createTicket(interaction) {
  const guild = interaction.guild;
  const user = interaction.user;

  const existing = guild.channels.cache.find(
    c => c.name === `payment-${user.username.toLowerCase()}`
  );
  if (existing) {
    return interaction.reply({ content: "You already have an open ticket.", ephemeral: true });
  }

  const channel = await guild.channels.create({
    name: `payment-${user.username}`,
    type: 0,
    parent: config.channels.ticketCategory,
    permissionOverwrites: [
      {
        id: guild.id,
        deny: ["ViewChannel"]
      },
      {
        id: user.id,
        allow: ["ViewChannel", "SendMessages"]
      }
    ]
  });

  await interaction.reply({ content: `Ticket created: ${channel}`, ephemeral: true });
}

module.exports = { createTicket };
