import { MailtrapClient } from 'mailtrap';
import dotenv from "dotenv";

dotenv.config();
const { MailtrapClient } = require("mailtrap");
require("dotenv").config();

const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "noreply@property-system.com",
  name: "Property Registration System"
};

module.exports = {
  mailtrapClient,
  sender
};
