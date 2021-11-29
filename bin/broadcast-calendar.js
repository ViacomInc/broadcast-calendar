#!/usr/bin/env node
const calendar = require("../lib");

const now = calendar.DateTime.now();
const usageHelp = `
  Usage:
    broadcast-calendar <ISO Date | Broadcast Week Key>

  Example:
    broadcast-calendar ${now.toISODate()}
    broadcast-calendar ${calendar.getBroadcastWeekKey(now)}
`;

const arg1 = process.argv[2];
if (["-h", "--help"].includes(arg1)) {
  console.log(usageHelp);
  process.exit(1);
}

const dateStr = !arg1 || arg1.length < 4 ? now.toISODate() : arg1;

const date =
  dateStr.length === 6
    ? calendar.parseDateFromBroadcastWeekKey(dateStr)
    : calendar.parseDateFromISO(dateStr);

if (!date.isValid) {
  console.log(`Failed to parse date from input: ${date.invalidReason}`);
  console.log(usageHelp);
  process.exit(1);
}

const broadcastCalendar = calendar.getBroadcastCalendar(date);
console.log(calendar.formatBroadcastCalendar(broadcastCalendar));
