import { DateTime, Interval } from "luxon";

import { YearQuarter, YearQuarters } from "./types";
import { getBroadcastYearInterval } from "./interval";
import { getBroadcastWeek } from "./week";

export function getBroadcastYear(date: DateTime): number {
  const end = getBroadcastYearInterval(date).end;
  return end.get("year");
}

export function getBroadcastQuarter(date: DateTime): number {
  const week = getBroadcastWeek(date);
  const quarterLength = 13;
  return Math.min(Math.ceil(week / quarterLength), 4);
}

export function getBroadcastQuarterWeek(date: DateTime): [number, number] {
  const week = getBroadcastWeek(date);
  const quarterLength = 13;
  const quarter = Math.min(Math.ceil(week / quarterLength), 4);
  return [quarter, week];
}

export function getBroadcastYearQuarter(date: DateTime): YearQuarter {
  return {
    year: getBroadcastYear(date),
    quarter: getBroadcastQuarter(date),
  };
}

export function getBroadcastYearsQuarters({
  start,
  end,
}: Interval): YearQuarters[] {
  const startDateYearQuarter = getBroadcastYearQuarter(start);
  const endDateYearQuarter = incrementYearQuarter(getBroadcastYearQuarter(end));

  let currentYearQuarter = startDateYearQuarter;
  const yearQuarters = [];

  while (yearQuarterIsGreaterThan(endDateYearQuarter, currentYearQuarter)) {
    yearQuarters.push(currentYearQuarter);
    currentYearQuarter = incrementYearQuarter(currentYearQuarter);
  }

  return Object.values(
    yearQuarters.reduce(
      (
        acc: { [key: number]: YearQuarters },
        { year, quarter }: YearQuarter
      ) => {
        if (!acc[year]) {
          acc[year] = {
            year,
            quarters: [],
          };
        }

        acc[year].quarters.push(quarter);
        return acc;
      },
      {}
    )
  );
}

export function isYearQuarter(yq?: YearQuarter): yq is YearQuarter {
  if (
    !yq ||
    typeof yq !== "object" ||
    typeof yq.year !== "number" ||
    typeof yq.quarter !== "number"
  ) {
    return false;
  }

  return true;
}

export function incrementYearQuarter(
  { year, quarter }: YearQuarter,
  incrementValue = 1
): YearQuarter {
  const quarterUnbounded = quarter + incrementValue;
  const yearIncrement = Math.floor((quarterUnbounded - 1) / 4);
  const quarterBounded = quarterUnbounded - 4 * yearIncrement;

  return {
    year: yearIncrement + year,
    quarter: quarterBounded,
  };
}

export function yearQuarterIsGreaterThan(
  a: YearQuarter,
  b: YearQuarter
): boolean {
  if (a.year === b.year) {
    return a.quarter > b.quarter;
  }
  return a.year > b.year;
}
