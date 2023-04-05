import { DateTime, Interval } from "luxon";

import { BroadcastTimeZone, YearQuarter } from "./types";
import { isValid } from "./helpers";

function getLastSunday(date: DateTime): DateTime {
  return date.minus({ days: date.weekday % 7 });
}

export function getBroadcastWeekStart(date: DateTime): DateTime {
  return date.startOf("week");
}

export function getBroadcastWeekEnd(date: DateTime): DateTime {
  return date.endOf("week");
}

export function getBroadcastWeekInterval(date: DateTime): Interval {
  return Interval.fromDateTimes(date.startOf("week"), date.endOf("week"));
}

export function getBroadcastWeekKeyInterval(weekKey: number): null | Interval {
  const broadcastYear = Math.trunc(weekKey / 100);
  const weekNumber = weekKey % 100;
  const middleYear = DateTime.fromObject({
    year: broadcastYear,
    month: 7,
    day: 1,
  });

  if (!isValid(middleYear)) {
    return null;
  }

  const start = getBroadcastYearInterval(middleYear)?.start;
  if (!isValid(start)) {
    return null;
  }

  return getBroadcastWeekInterval(start.plus({ weeks: weekNumber - 1 }));
}

export function getBroadcastMonthInterval(date: DateTime): null | Interval {
  const endOfMonthDate = date.endOf("month");

  if (endOfMonthDate.weekday !== 7 && date.hasSame(endOfMonthDate, "week")) {
    const start = getBroadcastWeekInterval(date).start;
    const endDate = date.plus({ months: 1 }).endOf("month");
    const end = getLastSunday(endDate);

    if (!isValid(start) || !isValid(end)) {
      return null;
    }

    return Interval.fromDateTimes(start, end);
  }

  const startDate = date.startOf("month");
  const start = getBroadcastWeekInterval(startDate).start;
  const end = getLastSunday(endOfMonthDate);

  if (!isValid(start) || !isValid(end)) {
    return null;
  }

  return Interval.fromDateTimes(start, end);
}

export function getBroadcastQuarterInterval(date: DateTime): null | Interval {
  const { start: weekStart, end: weekEnd } = getBroadcastWeekInterval(date);

  if (!isValid(weekStart) || !isValid(weekEnd)) {
    return null;
  }

  if (!weekStart.hasSame(weekEnd, "year")) {
    const end = getLastSunday(date.plus({ months: 3 }).endOf("month"));
    return Interval.fromDateTimes(weekStart, end);
  }

  const quarterDate = weekStart.hasSame(weekEnd, "month") ? date : weekEnd;
  const currentYear = quarterDate.year;
  const currentMonth = quarterDate.month;
  const quarterStartMonth = currentMonth - ((currentMonth - 1) % 3);

  const startOfQuarterDate = DateTime.fromObject(
    {
      year: currentYear,
      month: quarterStartMonth,
      day: 1,
    },
    { zone: BroadcastTimeZone }
  );

  const start = getBroadcastWeekInterval(startOfQuarterDate).start;
  const end = getLastSunday(
    startOfQuarterDate.plus({ months: 2 }).endOf("month")
  );

  if (!isValid(start) || !isValid(end)) {
    return null;
  }

  return Interval.fromDateTimes(start, end);
}

export function getBroadcastYearInterval(date: DateTime): null | Interval {
  const { start: weekStart, end: weekEnd } = getBroadcastWeekInterval(date);
  if (!isValid(weekStart) || !isValid(weekEnd)) {
    return null;
  }

  const end = getLastSunday(weekEnd.endOf("year"));
  if (!weekStart.hasSame(weekEnd, "year")) {
    return Interval.fromDateTimes(weekStart, end);
  }

  const start = getBroadcastWeekInterval(date.startOf("year")).start;
  if (!isValid(start)) {
    return null;
  }

  return Interval.fromDateTimes(start, end);
}

const QUARTER_TO_MONTH: Record<number, number> = {
  1: 2,
  2: 5,
  3: 8,
  4: 11,
};

export function getBroadcastQuarterIntervalFromYearQuarter({
  year,
  quarter,
}: YearQuarter): null | Interval {
  return getBroadcastQuarterInterval(
    DateTime.fromObject(
      { year, month: QUARTER_TO_MONTH[quarter], day: 1 },
      { zone: BroadcastTimeZone }
    )
  );
}

export function getBroadcastWeeksInInterval({
  start,
  end,
}: Interval): null | Interval[] {
  if (!isValid(start) || !isValid(end)) {
    return null;
  }

  const res: Interval[] = [];
  let weekDateInterval = getBroadcastWeekInterval(start);

  while (
    isValid(weekDateInterval.start) &&
    isValid(weekDateInterval.end) &&
    weekDateInterval.start <= end
  ) {
    res.push(weekDateInterval);
    weekDateInterval = getBroadcastWeekInterval(
      weekDateInterval.end.plus({ days: 1 })
    );
  }

  return res;
}
