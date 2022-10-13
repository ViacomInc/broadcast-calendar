import { DateTime } from "luxon";

import { BroadcastTimeZone } from "./types";

const DAY = 24 * 60 * 60 * 1000;

function isLastWeekOverflown(date: DateTime): boolean {
  const yearEnd = date.endOf("year");
  const yearEndWeekDay = yearEnd.weekday;
  if (yearEndWeekDay === 7) {
    return false;
  }
  return yearEnd.toMillis() - date.toMillis() <= yearEndWeekDay * DAY;
}

export function getBroadcastWeek(date: DateTime): number {
  const day = date.setZone(BroadcastTimeZone).startOf("day");

  if (isLastWeekOverflown(day)) {
    return 1;
  }

  const yearStart = DateTime.fromObject(
    {
      year: day.year,
      month: 1,
      day: 1,
    },
    { zone: BroadcastTimeZone }
  );
  const yearStartDay = yearStart.weekday - 1;
  const weekNo = Math.ceil(
    ((day.valueOf() - yearStart.toMillis() + yearStartDay * DAY) / DAY + 1) / 7
  );
  return weekNo;
}
