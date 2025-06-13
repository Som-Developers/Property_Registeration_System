const { mailtrapClient, sender } = require("./mailtrap.config");

const sendApprovalEmail = async (email, propertyName) => {
  await mailtrapClient.send({
    from: sender,
    to: [{ email }],
    subject: "Your Property Has Been Approved",
    text: `Good news! Your property "${propertyName}" has been approved.`,
    category: "Approval Notification"
  });
};

const sendRejectionEmail = async (email, propertyName, reason) => {
  await mailtrapClient.send({
    from: sender,
    to: [{ email }],
    subject: "Your Property Has Been Rejected",
    text: `Unfortunately, your property "${propertyName}" has been rejected. Reason: ${reason}`,
    category: "Rejection Notification"
  });
};

module.exports = {
  sendApprovalEmail,
  sendRejectionEmail
};
