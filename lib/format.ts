import { DateTime, Interval } from "luxon";
import { BroadcastTimeZone, StringInterval } from "./types";
import { BroadcastCalendar } from "./calendar";
import { IfValid } from "./helpers";

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
  }) as IfValid<IsValid, string>;
}

export function formatToSQLWithoutTZ<IsValid extends boolean>(
  datetime: DateTime<IsValid>,
) {
  return datetime.toSQL({
    includeOffset: false,
  }) as IfValid<IsValid, string>;
}

export function formatBroadcastDateInterval<IsValid extends boolean>(
  interval: Interval<IsValid>,
  format = toISODate,
): IfValid<IsValid, StringInterval> {
  if (!interval.isValid || !interval.start || !interval.end) {
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
    date: date.toISODate() as IfValid<IsValid, string>,
    year,
    yearInterval: yearInterval && formatBroadcastDateInterval(yearInterval),
    quarter,
    quarterInterval:
      quarterInterval && formatBroadcastDateInterval(quarterInterval),
    monthInterval: monthInterval && formatBroadcastDateInterval(monthInterval),
    week,
    weekInterval: formatBroadcastDateInterval(weekInterval),
    weekKey,
    weekDay: date.toFormat("EEEE") as IfValid<
      IsValid,
      string,
      "Invalide DateTime"
    >,
  };
}
