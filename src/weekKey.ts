import type { DateTime } from "luxon";
import { getBroadcastYear } from "./yearQuarter";
import { getBroadcastWeek } from "./week";

export function getBroadcastWeekKey(date: DateTime): null | number {
  const broadcastYear = getBroadcastYear(date);
  const broadcastWeek = getBroadcastWeek(date);

  if (broadcastYear === null || broadcastWeek === null) {
    return null;
  }

  return broadcastYear * 100 + broadcastWeek;
}
