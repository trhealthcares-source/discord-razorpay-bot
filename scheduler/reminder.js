const { EmbedBuilder } = require("discord.js");
const config = require("../config");

function scheduleReminder(client, subscription) {
  const remindAt =
    subscription.expire_at -
    config.reminderBeforeExpiryHours * 60 * 60 * 1000;

  const delay = remindAt - Date.now();
  if (delay <= 0) return;

  setTimeout(async () => {
    try {
      const user = await client.users.fetch(subscription.user_id);
      const embed = new EmbedBuilder()
        .setColor(0xffa500)
        .setTitle("Subscription Expiring Soon")
        .setDescription(
          `Your **${subscription.plan_name}** subscription will expire in **2 days**.`
        );

      user.send({ embeds: [embed] }).catch(() => {});
    } catch (e) {
      console.error("Reminder error:", e.message);
    }
  }, delay);
}

module.exports = { scheduleReminder };
