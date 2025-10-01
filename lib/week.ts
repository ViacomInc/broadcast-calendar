import { DateTime } from "luxon";

import { IfValid, isValid } from "./helpers";

/**
 * returns broadcast week number (1-54) for a given date
 **/
export function getBroadcastWeek<IsValid extends boolean>(
  date: DateTime<IsValid>,
): IfValid<IsValid, number> {
  if (!isValid(date)) {
    return null as IfValid<IsValid, number>;
  }

  return Math.ceil(date.endOf("week").ordinal / 7) as IfValid<IsValid, number>;
}
