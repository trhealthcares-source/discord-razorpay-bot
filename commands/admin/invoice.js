const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "invoice",
  async execute(client, message, args) {
    const member = message.mentions.members.first();
    if (!member) return;

    const payment = global.db
      .prepare(
        "SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC LIMIT 1"
      )
      .get(member.id);

    if (!payment) return;

    const embed = new EmbedBuilder()
      .setColor(0x00aa00)
      .setTitle("Invoice")
      .addFields(
        { name: "Payment ID", value: payment.payment_id },
        { name: "Amount", value: `₹${payment.amount_paise / 100}` }
      );

    await member.send({ embeds: [embed] }).catch(() => {});
    await message.reply({ embeds: [embed] });
  }
};
