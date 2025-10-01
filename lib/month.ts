import { DateTime } from "luxon";

import { IfValid, isValid } from "./helpers";

/**
  return broadcast month (1-12) for a given date
**/
export function getBroadcastMonth<IsValid extends boolean>(
  date: DateTime<IsValid>,
): IfValid<IsValid, number> {
  if (!isValid(date)) {
    return null as IfValid<IsValid, number>;
  }

  return date.endOf("week").month as unknown as IfValid<IsValid, number>;
}
