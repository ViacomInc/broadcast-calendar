import type { DateTime } from "luxon";
import { getBroadcastYear } from "./yearQuarter";
import { getBroadcastWeek } from "./week";
import { IfValid } from "./helpers";

export function getBroadcastWeekKey<IsValid extends boolean>(
  date: DateTime<IsValid>,
): IfValid<IsValid, number> {
  const broadcastYear = getBroadcastYear(date);
  const broadcastWeek = getBroadcastWeek(date);

  if (broadcastYear === null || broadcastWeek === null) {
    return null as IfValid<IsValid, number>;
  }

  return (broadcastYear * 100 + broadcastWeek) as IfValid<IsValid, number>;
}
