const config = require("../config");

function scheduleTicketDelete(channel) {
  setTimeout(() => {
    channel.delete().catch(() => {});
  }, config.ticketAutoDeleteMinutes * 60 * 1000);
}

module.exports = { scheduleTicketDelete };
