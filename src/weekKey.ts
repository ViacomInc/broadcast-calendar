import { DateTime } from "luxon";
import { getBroadcastYear } from "./yearQuarter";
import { getBroadcastWeek } from "./week";

export function getBroadcastWeekKey(date: DateTime): number {
  const broadcastYear = getBroadcastYear(date);
  const broadcastWeek = getBroadcastWeek(date);
  return broadcastYear * 100 + broadcastWeek;
}
