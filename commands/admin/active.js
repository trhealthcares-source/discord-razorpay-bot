const { EmbedBuilder } = require("discord.js");
const config = require("../../config");
const { createSubscription, extendSubscription } = require("../../subscriptions/manager");

module.exports = {
  name: "active",
  async execute(client, message, args) {
    if (!message.member.roles.cache.some(r => config.adminRoleIds.includes(r.id))) return;

    const role = message.mentions.roles.first();
    const member = message.mentions.members.first();
    const duration = parseInt(args[2], 10);

    if (!role || !member || isNaN(duration)) return;

    const existing = global.db
      .prepare("SELECT * FROM subscriptions WHERE user_id = ? AND role_id = ? AND status = 'active'")
      .get(member.id, role.id);

    let expireAt;
    if (existing) {
      expireAt = extendSubscription(member.id, role.id, duration);
    } else {
      expireAt = createSubscription(member.id, role.id, duration);
      await member.roles.add(role).catch(() => {});
    }

    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Subscription Activated")
      .setDescription(`Expires <t:${Math.floor(expireAt / 1000)}:F>`);

    await member.send({ embeds: [embed] }).catch(() => {});
    await message.reply({ embeds: [embed] });
  }
};
