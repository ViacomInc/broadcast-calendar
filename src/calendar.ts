import { DateTime } from "luxon";
import {
  BroadcastCalendar,
  getBroadcastYear,
  getBroadcastYearRange,
  getBroadcastQuarter,
  getBroadcastQuarterRange,
  getBroadcastMonthRange,
  getBroadcastWeek,
  getBroadcastWeekRange,
  getBroadcastWeekKey,
} from "./index";

export function getBroadcastCalendar(date: DateTime): BroadcastCalendar {
  return {
    date,
    year: getBroadcastYear(date),
    yearInterval: getBroadcastYearRange(date),
    quarter: getBroadcastQuarter(date),
    quarterInterval: getBroadcastQuarterRange(date),
    monthInterval: getBroadcastMonthRange(date),
    week: getBroadcastWeek(date),
    weekInterval: getBroadcastWeekRange(date),
    weekKey: getBroadcastWeekKey(date),
  };
}
