import { DateTime } from "luxon";
import { BroadcastCalendar } from "./types";
import { getBroadcastYear, getBroadcastQuarter } from "./yearQuarter";
import {
  getBroadcastYearInterval,
  getBroadcastQuarterInterval,
  getBroadcastMonthInterval,
  getBroadcastWeekInterval,
} from "./interval";
import { getBroadcastWeek } from "./week";
import { getBroadcastWeekKey } from "./weekKey";

export function getBroadcastCalendar(date: DateTime): BroadcastCalendar {
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
