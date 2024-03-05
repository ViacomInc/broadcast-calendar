import { DateTime, Interval } from "luxon";
import { BroadcastTimeZone, StringInterval } from "./types";
import { IfValid } from "./helpers";
import { BroadcastCalendar } from "./calendar";

export const makeFormatter =
  (format: string) =>
  (date: DateTime): string =>
    date.setZone(BroadcastTimeZone).toFormat(format);

export const toISODate = makeFormatter("yyyy-MM-dd");

export function formatToISOWithoutTZ<IsValid extends boolean>(
  datetime: DateTime<IsValid>,
) {
  return datetime.toISO({
    includeOffset: false,
    suppressMilliseconds: true,
  });
}

export function formatToSQLWithoutTZ<IsValid extends boolean>(
  datetime: DateTime<IsValid>,
) {
  return datetime.toSQL({
    includeOffset: false,
  });
}

export function formatBroadcastDateInterval<IsValid extends boolean>(
  interval: Interval<IsValid>,
  format = toISODate,
): IfValid<IsValid, StringInterval> {
  if (!interval.start || !interval.end) {
    return null as IfValid<IsValid, StringInterval>;
  }

  return [format(interval.start), format(interval.end)] as IfValid<
    IsValid,
    StringInterval
  >;
}

export function formatBroadcastCalendar<IsValid extends boolean>({
  date,
  year,
  yearInterval,
  quarter,
  quarterInterval,
  monthInterval,
  week,
  weekKey,
  weekInterval,
}: BroadcastCalendar<IsValid>) {
  return {
    date: date.toISODate(),
    year,
    yearInterval: yearInterval && formatBroadcastDateInterval(yearInterval),
    quarter,
    quarterInterval:
      quarterInterval && formatBroadcastDateInterval(quarterInterval),
    monthInterval: monthInterval && formatBroadcastDateInterval(monthInterval),
    week,
    weekInterval: weekInterval && formatBroadcastDateInterval(weekInterval),
    weekKey,
    weekDay: date.toFormat("EEEE"),
  };
}
