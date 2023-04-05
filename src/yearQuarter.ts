import { DateTime, Interval } from "luxon";

import { YearQuarter, YearQuarters } from "./types";
import { getBroadcastYearInterval } from "./interval";
import { getBroadcastWeek } from "./week";
import { isValid } from "./helpers";

export function getBroadcastYear(date: DateTime): null | number {
  const yearInterval = getBroadcastYearInterval(date);

  if (!(yearInterval && isValid(yearInterval.end))) {
    return null;
  }

  return yearInterval.end.get("year");
}

export function getBroadcastQuarter(date: DateTime): null | number {
  const week = getBroadcastWeek(date);
  if (!isValid(date) || week === null) {
    return null;
  }

  const quarterLength = 13;
  return Math.min(Math.ceil(week / quarterLength), 4);
}

export function getBroadcastQuarterWeek(
  date: DateTime
): null | [number, number] {
  const week = getBroadcastWeek(date);
  if (!isValid(date) || week === null) {
    return null;
  }

  const quarterLength = 13;
  const quarter = Math.min(Math.ceil(week / quarterLength), 4);
  return [quarter, week];
}

export function getBroadcastYearQuarter(date: DateTime): null | YearQuarter {
  const year = getBroadcastYear(date);
  const quarter = getBroadcastQuarter(date);

  if (year === null || quarter === null) {
    return null;
  }

  return { year, quarter };
}

export function getBroadcastYearsQuarters({
  start,
  end,
}: Interval): null | YearQuarters[] {
  if (!isValid(start) || !isValid(end)) {
    return null;
  }

  // we just cheked that both dates are correct
  const startDateYearQuarter = getBroadcastYearQuarter(start) as YearQuarter;
  const endDateYearQuarter = incrementYearQuarter(
    getBroadcastYearQuarter(end) as YearQuarter
  );

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

export function isYearQuarter(yq: unknown): yq is YearQuarter {
  return Boolean(
    yq &&
      typeof yq === "object" &&
      typeof (yq as YearQuarter).year === "number" &&
      typeof (yq as YearQuarter).quarter === "number" &&
      ((yq as YearQuarter).quarter >= 1 || (yq as YearQuarter).quarter <= 4)
  );
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

/**
 * Returns an interger reperesention of YearQuarter type, like 20221
 */
export function yearQuarterToInteger({
  year,
  quarter,
}: YearQuarter): null | number {
  if (quarter < 1 || quarter > 4) {
    return null;
  }

  return year * 10 + quarter;
}

/**
 * Take an interger reperesention of Year Quarter, like 20221
 * and return YearQuarter type or null if integer is incorrect
 */
export function integerToYearQuarter(value: number): YearQuarter | null {
  const year = Math.floor(value / 10);
  const quarter = value % 10;

  if (quarter < 1 || quarter > 4) {
    return null;
  }

  return { year, quarter };
}
