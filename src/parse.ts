import { DateTime, Interval } from "luxon";
import { BroadCastTimeZone, StringInterval } from "./types";

export function parseDateFromSQL(date: string): DateTime {
  return DateTime.fromSQL(date, { zone: BroadCastTimeZone });
}

export function parseDateFromISO(date: string): DateTime {
  return DateTime.fromISO(date, { zone: BroadCastTimeZone });
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
