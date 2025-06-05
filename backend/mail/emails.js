const {mailtrapClient, sender} = require("./mailtrap.config");


const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
            text: `Your password reset link: ${resetURL}`,
			category: "Password Reset",
		});
        
	} catch (error) {
		console.error("Error sending password reset email", error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			text: "Your Password has been reset successfully",
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error("Error sending password reset success email", error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};

module.exports = {
    sendPasswordResetEmail,
    sendResetSuccessEmail
}