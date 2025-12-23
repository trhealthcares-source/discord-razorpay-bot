const { EmbedBuilder } = require("discord.js");

function storeInvoice(userId, roleId, amountPaise, paymentId, invoiceId) {
  global.db
    .prepare(
      `INSERT INTO payments 
       (user_id, role_id, amount_paise, payment_id, invoice_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(
      userId,
      roleId,
      amountPaise,
      paymentId,
      invoiceId,
      Date.now()
    );
}

async function sendInvoiceDM(user, payment) {
  const embed = new EmbedBuilder()
    .setColor(0x00aa00)
    .setTitle("Invoice")
    .addFields(
      { name: "Payment ID", value: payment.payment_id },
      { name: "Amount", value: `₹${payment.amount_paise / 100}` }
    )
    .setTimestamp();

  await user.send({ embeds: [embed] }).catch(() => {});
}

module.exports = {
  storeInvoice,
  sendInvoiceDM
};
