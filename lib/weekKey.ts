import type { DateTime } from "luxon";
import { getBroadcastWeek } from "./week";
import { IfValid, isValid } from "./helpers";
import { getBroadcastYear } from "./year";

/**
 * returns broadcast week key for a given date. Examples: `202103`, `202232`
 **/
export function getBroadcastWeekKey<IsValid extends boolean>(
  date: DateTime<IsValid>,
): IfValid<IsValid, number> {
  if (!isValid(date)) {
    return null as IfValid<IsValid, number>;
  }

  const broadcastYear = getBroadcastYear(date);
  const broadcastWeek = getBroadcastWeek(date);

  return (broadcastYear * 100 + broadcastWeek) as IfValid<IsValid, number>;
}
