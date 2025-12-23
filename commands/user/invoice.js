const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "invoice",
  async execute(client, message) {
    const payment = global.db
      .prepare(
        "SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC LIMIT 1"
      )
      .get(message.author.id);

    if (!payment) return;

    const embed = new EmbedBuilder()
      .setColor(0x00aa00)
      .setTitle("Your Invoice")
      .addFields(
        { name: "Payment ID", value: payment.payment_id },
        { name: "Amount", value: `₹${payment.amount_paise / 100}` }
      );

    message.author.send({ embeds: [embed] }).catch(() => {});
  }
};
