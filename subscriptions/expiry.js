const { EmbedBuilder } = require("discord.js");
const config = require("../config");

function scheduleExpiry(client, subscription) {
  const delay = subscription.expire_at - Date.now();
  if (delay <= 0) return;

  setTimeout(async () => {
    try {
      const guild = await client.guilds.fetch(config.guildId);
      const member = await guild.members.fetch(subscription.user_id);
      await member.roles.remove(subscription.role_id).catch(() => {});

      global.db
        .prepare(
          "UPDATE subscriptions SET status = 'expired' WHERE id = ?"
        )
        .run(subscription.id);

      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle("Subscription Expired")
        .setDescription(
          `Your **${subscription.plan_name}** subscription has expired.`
        );

      member.send({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error("Expiry error:", e.message);
    }
  }, delay);
}

module.exports = { scheduleExpiry };
