import { DateTime, Interval } from "luxon";
import {
  BroadcastCalendar,
  BroadcastCalendarString,
  BroadcastTimeZone,
  StringInterval,
} from "./types";

export const makeFormatter =
  (format: string) =>
  (date: DateTime): string =>
    date.setZone(BroadcastTimeZone).toFormat(format);

export const toISODate = makeFormatter("yyyy-MM-dd");

export function formatToISOWithoutTZ(datetime: DateTime): string {
  return datetime.toISO({
    includeOffset: false,
    suppressMilliseconds: true,
  });
}

export function formatToSQLWithoutTZ(datetime: DateTime): string {
  return datetime.toSQL({
    includeOffset: false,
  });
}

export function formatBroadcastDateInterval(
  interval: Interval,
  format = toISODate
): StringInterval {
  return [format(interval.start), format(interval.end)];
}

export function formatBroadcastCalendar({
  date,
  year,
  yearInterval,
  quarter,
  quarterInterval,
  monthInterval,
  week,
  weekKey,
  weekInterval,
}: BroadcastCalendar): BroadcastCalendarString {
  return {
    date: date.toISODate(),
    year,
    yearInterval: formatBroadcastDateInterval(yearInterval),
    quarter,
    quarterInterval: formatBroadcastDateInterval(quarterInterval),
    monthInterval: formatBroadcastDateInterval(monthInterval),
    week,
    weekInterval: formatBroadcastDateInterval(weekInterval),
    weekKey,
    weekDay: date.toFormat("EEEE"),
  };
}
