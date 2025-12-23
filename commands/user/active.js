const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "active",
  async execute(client, message) {
    const subs = global.db
      .prepare(
        "SELECT * FROM subscriptions WHERE user_id = ? AND status = 'active'"
      )
      .all(message.author.id);

    if (!subs.length) {
      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle("No Active Subscription")
        .setDescription("You do not have any active subscriptions.");
      return message.reply({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Your Active Subscriptions");

    for (const sub of subs) {
      embed.addFields({
        name: sub.plan_name,
        value: `Expires <t:${Math.floor(sub.expire_at / 1000)}:F>`
      });
    }

    message.reply({ embeds: [embed] });
  }
};
