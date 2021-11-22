#!/usr/bin/env node
const calendar = require("../lib");

const usageHelp = `
  Usage:
    broadcast-calendar <ISO Date | Broadcast Week Key>

  Example:
    broadcast-calendar ${calendar.DateTime.now().toISODate()}
    broadcast-calendar ${calendar.getBroadcastWeekKey(calendar.DateTime.now())}
`;

const dateStr = process.argv[2];
if (!dateStr || dateStr.length < 4) {
  console.log(usageHelp);
  process.exit(1);
}

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
