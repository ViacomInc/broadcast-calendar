import { DateTime } from "luxon";

import { IfValid, isValid } from "./helpers";
import { getBroadcastWeek } from "./week";

/**
 * returns broadcast quarter for a given date
 **/
export function getBroadcastQuarter<IsValid extends boolean>(
  date: DateTime<IsValid>,
): IfValid<IsValid, number> {
  const week = getBroadcastWeek(date);
  if (!isValid(date) || week === null) {
    return null as IfValid<IsValid, number>;
  }

  return Math.ceil(date.endOf("week").month / 3) as IfValid<IsValid, number>;
}

/**
 * returns broadcast [quarter, week] for a given date
 **/
export function getBroadcastQuarterWeek<IsValid extends boolean>(
  date: DateTime<IsValid>,
): IfValid<IsValid, [number, number]> {
  if (!isValid(date)) {
    return null as IfValid<IsValid, [number, number]>;
  }

  const week = getBroadcastWeek(date);

  const quarterLength = 13;
  const quarter = Math.min(Math.ceil(week / quarterLength), 4);
  return [quarter, week] as IfValid<IsValid, [number, number]>;
}
