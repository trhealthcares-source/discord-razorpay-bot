const { scheduleExpiry } = require("../subscriptions/expiry");
const { scheduleReminder } = require("./reminder");

module.exports = async function recovery(client) {
  try {
    const subs = global.db
      .prepare("SELECT * FROM subscriptions WHERE status = 'active'")
      .all();

    for (const sub of subs) {
      scheduleExpiry(client, sub);
      scheduleReminder(client, sub);
    }

    console.log(`🔁 Restored ${subs.length} subscription timers`);
  } catch (e) {
    console.error("Recovery error:", e.message);
  }
};
