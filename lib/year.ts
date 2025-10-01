import { DateTime } from "luxon";

import { IfValid, isValid } from "./helpers";

/**
 * returns broadcast year for a given date
 **/
export function getBroadcastYear<IsValid extends boolean>(
  date: DateTime<IsValid>,
): IfValid<IsValid, number> {
  if (!isValid(date)) {
    return null as IfValid<IsValid, number>;
  }

  return date.endOf("week").year as unknown as IfValid<IsValid, number>;
}
