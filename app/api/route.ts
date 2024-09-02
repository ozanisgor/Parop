var cron = require("node-cron");

cron.schedule("*/30 * * * *", () => {
  console.log("running a task every 30 minutes");
});
