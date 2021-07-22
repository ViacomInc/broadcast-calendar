import { DateTime, Interval } from "luxon";

import { BroadcastTimeZone, YearQuarter } from "./types";

function getLastSunday(date: DateTime): DateTime {
  return date.minus({ day: date.weekday % 7 });
}

export function getBroadcastWeekStart(date: DateTime): DateTime {
  return date.startOf("week");
}

export function getBroadcastWeekEnd(date: DateTime): DateTime {
  return date.endOf("week");
}

export function getBroadcastWeekRange(date: DateTime): Interval {
  return Interval.fromDateTimes(date.startOf("week"), date.endOf("week"));
}

export function getBroadcastMonthRange(date: DateTime): Interval {
  const endOfMonthDate = date.endOf("month");

  if (endOfMonthDate.weekday !== 7 && date.hasSame(endOfMonthDate, "week")) {
    const start = getBroadcastWeekRange(date).start;
    const endDate = date.plus({ month: 1 }).endOf("month");
    const end = getLastSunday(endDate);

    return Interval.fromDateTimes(start, end);
  }

  const startDate = date.startOf("month");
  const start = getBroadcastWeekRange(startDate).start;
  const end = getLastSunday(endOfMonthDate);

  return Interval.fromDateTimes(start, end);
}

export function getBroadcastQuarterRange(date: DateTime): Interval {
  const { start: weekStart, end: weekEnd } = getBroadcastWeekRange(date);

  if (!weekStart.hasSame(weekEnd, "year")) {
    const end = getLastSunday(date.plus({ months: 3 }).endOf("month"));
    return Interval.fromDateTimes(weekStart, end);
  }

  const quarterDate = weekStart.hasSame(weekEnd, "month") ? date : weekEnd;
  const currentYear = quarterDate.year;
  const currentMonth = quarterDate.month;
  const quarterStartMonth = currentMonth - ((currentMonth - 1) % 3);

  const startOfQuarterDate = DateTime.fromObject({
    year: currentYear,
    month: quarterStartMonth,
    day: 1,
    zone: BroadcastTimeZone,
  });

  const start = getBroadcastWeekRange(startOfQuarterDate).start;
  const end = getLastSunday(
    startOfQuarterDate.plus({ months: 2 }).endOf("month")
  );
  return Interval.fromDateTimes(start, end);
}

export function getBroadcastYearRange(date: DateTime): Interval {
  const { start: weekStart, end: weekEnd } = getBroadcastWeekRange(date);
  const end = getLastSunday(weekEnd.endOf("year"));
  if (!weekStart.hasSame(weekEnd, "year")) {
    return Interval.fromDateTimes(weekStart, end);
  }

  const start = getBroadcastWeekRange(date.startOf("year")).start;
  return Interval.fromDateTimes(start, end);
}

const QUARTER_TO_MONTH: Record<number, number> = {
  1: 1,
  2: 4,
  3: 7,
  4: 10,
};

export function getBroadcastQuarterRangeFromYearQuarter({
  year,
  quarter,
}: YearQuarter): Interval {
  return getBroadcastQuarterRange(
    DateTime.fromJSDate(new Date(year, QUARTER_TO_MONTH[quarter], 1))
  );
}

export function getBroadcastWeeksInRange(range: Interval): Interval[] {
  const res: Interval[] = [];
  let weekDateRange = getBroadcastWeekRange(range.start);

  while (weekDateRange.start <= range.end) {
    res.push(weekDateRange);
    weekDateRange = getBroadcastWeekRange(weekDateRange.end.plus({ day: 1 }));
  }

  return res;
}
