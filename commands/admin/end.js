const { EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "end",
  async execute(client, message, args) {
    if (!message.member.roles.cache.some(r => config.adminRoleIds.includes(r.id))) return;

    const role = message.mentions.roles.first();
    const member = message.mentions.members.first();
    if (!role || !member) return;

    global.db
      .prepare(
        "UPDATE subscriptions SET status = 'ended' WHERE user_id = ? AND role_id = ?"
      )
      .run(member.id, role.id);

    await member.roles.remove(role).catch(() => {});

    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Subscription Ended")
      .setDescription(`Your **${role.name}** subscription was ended by admin.`);

    await member.send({ embeds: [embed] }).catch(() => {});
    await message.reply({ embeds: [embed] });
  }
};
