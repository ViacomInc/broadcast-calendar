import { DateTime } from "luxon";
import {
  getBroadcastYearInterval,
  getBroadcastQuarterInterval,
  getBroadcastMonthInterval,
  getBroadcastWeekInterval,
} from "./interval";
import { getBroadcastWeek } from "./week";
import { getBroadcastWeekKey } from "./weekKey";
import { getBroadcastYear } from "./year";
import { getBroadcastQuarter } from "./quarter";

export function toCalendarDateTime<IsValid extends boolean>(
  broadcast: DateTime<IsValid>,
): DateTime<IsValid> {
  return broadcast.hour < 6 ? broadcast.plus({ day: 1 }) : broadcast;
}

export function toBroadcastDateTime<IsValid extends boolean>(
  calendar: DateTime<IsValid>,
): DateTime<IsValid> {
  return calendar.hour < 6 ? calendar.minus({ day: 1 }) : calendar;
}

export function getBroadcastCalendar<IsValid extends boolean>(
  date: DateTime<IsValid>,
) {
  return {
    date,
    year: getBroadcastYear(date),
    yearInterval: getBroadcastYearInterval(date),
    quarter: getBroadcastQuarter(date),
    quarterInterval: getBroadcastQuarterInterval(date),
    monthInterval: getBroadcastMonthInterval(date),
    week: getBroadcastWeek(date),
    weekInterval: getBroadcastWeekInterval(date),
    weekKey: getBroadcastWeekKey(date),
  };
}

export type BroadcastCalendar<IsValid extends boolean> = ReturnType<
  typeof getBroadcastCalendar<IsValid>
>;
