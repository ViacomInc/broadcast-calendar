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

export function formatBroadcastDateInterval(
  interval: Interval,
  format = dateFormat
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
