import { DateTime, Interval } from "luxon";
import { BroadcastTimeZone, StringInterval } from "./types";
import { getBroadcastYearInterval } from "./interval";
import { isValid } from "./helpers";

export function parseDateFromSQL(date: string) {
  return DateTime.fromSQL(date, { zone: BroadcastTimeZone });
}

export function parseDateFromISO(date: string) {
  return DateTime.fromISO(date, { zone: BroadcastTimeZone });
}

export function parseIntervalFromSQL(interval: StringInterval): Interval {
  return Interval.fromDateTimes(
    parseDateFromSQL(interval[0]),
    parseDateFromSQL(interval[1]),
  );
}

export function parseIntervalFromISO(interval: StringInterval): Interval {
  return Interval.fromDateTimes(
    parseDateFromISO(interval[0]),
    parseDateFromISO(interval[1]),
  );
}

export function parseDateFromBroadcastWeekKey(
  weekKeyStr: string,
): null | DateTime<true> {
  const weekKey = parseInt(weekKeyStr, 10);
  const broadcastYear = Math.trunc(weekKey / 100);
  const weekNumber = weekKey % 100;
  const yearInterval = getBroadcastYearInterval(
    DateTime.fromObject({ year: broadcastYear, month: 7, day: 1 }),
  );

  if (!yearInterval || !yearInterval.isValid || !isValid(yearInterval.start)) {
    return null;
  }

  return yearInterval.start.plus({ weeks: weekNumber - 1 });
}
