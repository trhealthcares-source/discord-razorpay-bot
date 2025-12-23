const config = require("../config");
const { EmbedBuilder } = require("discord.js");

function createSubscription(userId, roleId, durationDays) {
  const now = Date.now();
  const expireAt = now + durationDays * 24 * 60 * 60 * 1000;

  global.db
    .prepare(
      `INSERT INTO subscriptions 
       (user_id, role_id, plan_name, start_at, expire_at, status)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(
      userId,
      roleId,
      config.plans[roleId].name,
      now,
      expireAt,
      "active"
    );

  return expireAt;
}

function extendSubscription(userId, roleId, durationDays) {
  const sub = global.db
    .prepare(
      "SELECT * FROM subscriptions WHERE user_id = ? AND role_id = ? AND status = 'active'"
    )
    .get(userId, roleId);

  if (!sub) return null;

  const newExpire =
    sub.expire_at + durationDays * 24 * 60 * 60 * 1000;

  global.db
    .prepare(
      "UPDATE subscriptions SET expire_at = ? WHERE id = ?"
    )
    .run(newExpire, sub.id);

  return newExpire;
}

function endSubscription(userId, roleId) {
  global.db
    .prepare(
      "UPDATE subscriptions SET status = 'ended' WHERE user_id = ? AND role_id = ?"
    )
    .run(userId, roleId);
}

module.exports = {
  createSubscription,
  extendSubscription,
  endSubscription
};
