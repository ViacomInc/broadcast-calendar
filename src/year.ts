import { DateTime } from "luxon";

import { getBroadcastYearInterval } from "./interval";
import { IfValid, isValid } from "./helpers";

/**
 * returns broadcast year for a given date
 **/
export function getBroadcastYear<IsValid extends boolean>(
  date: DateTime<IsValid>,
): IfValid<IsValid, number> {
  const yearInterval = getBroadcastYearInterval(date);

  if (!(yearInterval && isValid(yearInterval.end))) {
    return null as IfValid<IsValid, number>;
  }

  return yearInterval.end.get("year") as IfValid<IsValid, number>;
}
