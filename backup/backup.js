const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const config = require("../config");

const dbPath = path.join(__dirname, "../database/database.sqlite");
const backupDir = path.join(__dirname, "files");

if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

cron.schedule(`0 */${config.backup.intervalHours} * * *`, () => {
  const timestamp = Date.now();
  const backupFile = path.join(backupDir, `backup-${timestamp}.sqlite`);

  fs.copyFile(dbPath, backupFile, () => {
    const files = fs
      .readdirSync(backupDir)
      .sort()
      .reverse()
      .slice(config.backup.retentionCount);

    for (const file of files) {
      fs.unlinkSync(path.join(backupDir, file));
    }

    console.log("💾 Database backup created");
  });
});
