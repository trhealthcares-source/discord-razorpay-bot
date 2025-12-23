const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "database.sqlite");
const schemaPath = path.join(__dirname, "schema.sql");

const db = new Database(dbPath);

// Initialize schema
const schema = fs.readFileSync(schemaPath, "utf8");
db.exec(schema);

// Expose DB globally
global.db = db;

console.log("✅ Database initialized");

module.exports = db;
