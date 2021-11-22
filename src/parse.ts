import { DateTime, Interval } from "luxon";
import { BroadcastTimeZone, StringInterval } from "./types";
import { getBroadcastYearRange } from "./range";

export function parseDateFromSQL(date: string): DateTime {
  return DateTime.fromSQL(date, { zone: BroadcastTimeZone });
}

export function parseDateFromISO(date: string): DateTime {
  return DateTime.fromISO(date, { zone: BroadcastTimeZone });
}

export function parseIntervalFromSQL(range: StringInterval): Interval {
  return Interval.fromDateTimes(
    parseDateFromSQL(range[0]),
    parseDateFromSQL(range[1])
  );
}

export function parseIntervalFromISO(range: StringInterval): Interval {
  return Interval.fromDateTimes(
    parseDateFromISO(range[0]),
    parseDateFromISO(range[1])
  );
}

export function parseDateFromBroadcastWeekKey(weekKeyStr: string): DateTime {
  const weekKey = parseInt(weekKeyStr, 10);
  const broadcastYear = Math.trunc(weekKey / 100);
  const weekNumber = weekKey % 100;
  const { start } = getBroadcastYearRange(
    DateTime.fromObject({ year: broadcastYear, month: 7, day: 1 })
  );

  return start.plus({ weeks: weekNumber - 1 });
}
