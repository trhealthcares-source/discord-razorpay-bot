const { EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "updateplan",
  async execute(client, message, args) {
    if (!message.member.roles.cache.some(r => config.adminRoleIds.includes(r.id))) return;

    const role = message.mentions.roles.first();
    const duration = parseInt(args[1], 10);
    const price = parseInt(args[2], 10);

    if (!role || isNaN(duration) || isNaN(price)) return;

    const pricePaise = price * 100;

    global.db
      .prepare(
        `INSERT OR REPLACE INTO plans 
         (role_id, plan_name, price_paise, duration_days)
         VALUES (?, ?, ?, ?)`
      )
      .run(role.id, role.name, pricePaise, duration);

    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle("Plan Updated")
      .addFields(
        { name: "Role", value: role.name },
        { name: "Duration", value: `${duration} days` },
        { name: "Price", value: `₹${price}` }
      );

    await message.reply({ embeds: [embed] });
  }
};
