import { DateTime, Interval } from "luxon";

import { YearQuarter, YearQuarters } from "./types";
import { IfValid, isValid } from "./helpers";
import { getBroadcastYear } from "./year";
import { getBroadcastQuarter } from "./quarter";

export function getBroadcastYearQuarter<IsValid extends boolean>(
  date: DateTime<IsValid>,
): IfValid<IsValid, YearQuarter> {
  const year = getBroadcastYear(date);
  const quarter = getBroadcastQuarter(date);

  if (year === null || quarter === null) {
    return null as IfValid<IsValid, YearQuarter>;
  }

  return { year, quarter } as IfValid<IsValid, YearQuarter>;
}

export function getBroadcastYearsQuarters<IsValid extends boolean>({
  start,
  end,
}: Interval<IsValid>): IfValid<IsValid, YearQuarters[]> {
  if (!isValid(start) || !isValid(end)) {
    return null as IfValid<IsValid, YearQuarters[]>;
  }

  // we just cheked that both dates are correct
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
        { year, quarter }: YearQuarter,
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
      {},
    ),
  ) as IfValid<IsValid, YearQuarters[]>;
}

export function isYearQuarter(yq: unknown): yq is YearQuarter {
  return Boolean(
    yq &&
      typeof yq === "object" &&
      typeof (yq as YearQuarter).year === "number" &&
      typeof (yq as YearQuarter).quarter === "number" &&
      ((yq as YearQuarter).quarter >= 1 || (yq as YearQuarter).quarter <= 4),
  );
}

export function incrementYearQuarter(
  { year, quarter }: YearQuarter,
  incrementValue = 1,
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
  b: YearQuarter,
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
