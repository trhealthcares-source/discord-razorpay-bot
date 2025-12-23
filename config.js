/**
 * Global configuration for the Discord Razorpay Subscription Bot
 * Do NOT put secrets here. Secrets go only in .env
 */

module.exports = {
  // ===== DISCORD =====
  guildId: "1353078618800001044",

  adminRoleIds: [
    "1442747204329668648"
  ],

  channels: {
    ticketPanel: "1452921809627250752",
    ticketCategory: "1452921662604443658",
    adminLog: "1452922443197841408",
    paymentLog: "1452922497015218348",
    dashboard: "1452922562030993448"
  },

  // ===== COMMAND =====
  prefix: "!",

  // ===== TIME =====
  timezone: "Asia/Kolkata",
  reminderBeforeExpiryHours: 48,
  ticketAutoDeleteMinutes: 5,

  // ===== PLANS (1 ROLE = 1 PLAN) =====
  plans: {
    "1442747444977733643": {
      name: "Premium Member Monthly",
      priceInr: 299,          // shown to users
      pricePaise: 29900,      // used internally
      durationDays: 30
    }
  },

  // ===== BACKUP =====
  backup: {
    intervalHours: 6,
    retentionCount: 20
  }
};
