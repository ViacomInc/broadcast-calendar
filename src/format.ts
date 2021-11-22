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

const dateFormat = makeFormatter("yyyy-MM-dd");

export function formatBroadcastDateRange(
  range: Interval,
  format = dateFormat
): StringInterval {
  return [format(range.start), format(range.end)];
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
    yearInterval: formatBroadcastDateRange(yearInterval),
    quarter,
    quarterInterval: formatBroadcastDateRange(quarterInterval),
    monthInterval: formatBroadcastDateRange(monthInterval),
    week,
    weekInterval: formatBroadcastDateRange(weekInterval),
    weekKey,
  };
}
