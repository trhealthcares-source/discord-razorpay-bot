async function lockTicket(channel) {
  try {
    await channel.permissionOverwrites.edit(channel.guild.id, {
      SendMessages: false
    });
  } catch (e) {
    console.error("Ticket lock error:", e.message);
  }
}

module.exports = { lockTicket };
