import {
  getBroadcastMonthInterval,
  getBroadcastMonth,
  getBroadcastQuarter,
  getBroadcastQuarterInterval,
  getBroadcastQuarterIntervalFromYearQuarter,
  getBroadcastQuarterWeek,
  getBroadcastWeek,
  getBroadcastWeekInterval,
  getBroadcastWeekKey,
  getBroadcastWeekKeyInterval,
  getBroadcastWeeksInInterval,
  getBroadcastYear,
  getBroadcastYearInterval,
  getBroadcastYearQuarter,
  getBroadcastYearsQuarters,
  incrementYearQuarter,
  Interval,
  isYearQuarter,
  parseDateFromBroadcastWeekKey,
  parseDateFromISO,
  parseDateFromSQL,
  parseIntervalFromISO,
  parseIntervalFromSQL,
  toCalendarDateTime,
  yearQuarterIsGreaterThan,
  yearQuarterToInteger,
  integerToYearQuarter,
  formatBroadcastDateInterval,
  formatToISOWithoutTZ,
  formatToSQLWithoutTZ,
  makeFormatter,
  DateTime,
} from "../lib";
import { expect, test } from "vitest";

const testFormat = makeFormatter("yyyy-MM-dd EEE");

test("parsing dates", () => {
  expect(parseDateFromSQL("2021-07-23 03:15:00").toISODate()).toBe(
    "2021-07-23",
  );
  expect(parseDateFromSQL("2021-08-11").toISODate()).toBe("2021-08-11");
  expect(parseDateFromISO("2021-07-23T03:15:00").toISODate()).toBe(
    "2021-07-23",
  );
  expect(parseDateFromISO("2021-08-11").toISODate()).toBe("2021-08-11");
});

test("parsing intervals", () => {
  expect(
    parseIntervalFromSQL(["2021-07-23 03:15:00", "2021-08-11"]).isValid,
  ).toBe(true);

  expect(
    parseIntervalFromISO(["2021-07-23T03:15:00", "2021-08-11"]).isValid,
  ).toBe(true);
});

const broadcastTestData: [
  string,
  {
    broadcastYear: number;
    broadcastQuarter: number;
    broadcastMonth: number;
    week: [string, string];
    month: [string, string];
    quarter: [string, string];
    year: [string, string];
  },
][] = [
  [
    "2017-12-31",
    {
      broadcastYear: 2017,
      broadcastQuarter: 4,
      broadcastMonth: 12,
      week: ["2017-12-25 Mon", "2017-12-31 Sun"],
      month: ["2017-11-27 Mon", "2017-12-31 Sun"],
      quarter: ["2017-09-25 Mon", "2017-12-31 Sun"],
      year: ["2016-12-26 Mon", "2017-12-31 Sun"],
    },
  ],
  [
    "2018-12-31",
    {
      broadcastYear: 2019,
      broadcastQuarter: 1,
      broadcastMonth: 1,
      week: ["2018-12-31 Mon", "2019-01-06 Sun"],
      month: ["2018-12-31 Mon", "2019-01-27 Sun"],
      quarter: ["2018-12-31 Mon", "2019-03-31 Sun"],
      year: ["2018-12-31 Mon", "2019-12-29 Sun"],
    },
  ],
  [
    "2019-03-31",
    {
      broadcastYear: 2019,
      broadcastQuarter: 1,
      broadcastMonth: 3,
      week: ["2019-03-25 Mon", "2019-03-31 Sun"],
      month: ["2019-02-25 Mon", "2019-03-31 Sun"],
      quarter: ["2018-12-31 Mon", "2019-03-31 Sun"],
      year: ["2018-12-31 Mon", "2019-12-29 Sun"],
    },
  ],
  [
    "2019-04-01",
    {
      broadcastYear: 2019,
      broadcastQuarter: 2,
      broadcastMonth: 4,
      week: ["2019-04-01 Mon", "2019-04-07 Sun"],
      month: ["2019-04-01 Mon", "2019-04-28 Sun"],
      quarter: ["2019-04-01 Mon", "2019-06-30 Sun"],
      year: ["2018-12-31 Mon", "2019-12-29 Sun"],
    },
  ],
  [
    "2019-06-30",
    {
      broadcastYear: 2019,
      broadcastQuarter: 2,
      broadcastMonth: 6,
      week: ["2019-06-24 Mon", "2019-06-30 Sun"],
      month: ["2019-05-27 Mon", "2019-06-30 Sun"],
      quarter: ["2019-04-01 Mon", "2019-06-30 Sun"],
      year: ["2018-12-31 Mon", "2019-12-29 Sun"],
    },
  ],
  [
    "2019-07-01",
    {
      broadcastYear: 2019,
      broadcastQuarter: 3,
      broadcastMonth: 7,
      week: ["2019-07-01 Mon", "2019-07-07 Sun"],
      month: ["2019-07-01 Mon", "2019-07-28 Sun"],
      quarter: ["2019-07-01 Mon", "2019-09-29 Sun"],
      year: ["2018-12-31 Mon", "2019-12-29 Sun"],
    },
  ],
  [
    "2019-09-29",
    {
      broadcastYear: 2019,
      broadcastQuarter: 3,
      broadcastMonth: 9,
      week: ["2019-09-23 Mon", "2019-09-29 Sun"],
      month: ["2019-08-26 Mon", "2019-09-29 Sun"],
      quarter: ["2019-07-01 Mon", "2019-09-29 Sun"],
      year: ["2018-12-31 Mon", "2019-12-29 Sun"],
    },
  ],
  [
    "2019-09-30",
    {
      broadcastYear: 2019,
      broadcastQuarter: 4,
      broadcastMonth: 10,
      week: ["2019-09-30 Mon", "2019-10-06 Sun"],
      month: ["2019-09-30 Mon", "2019-10-27 Sun"],
      quarter: ["2019-09-30 Mon", "2019-12-29 Sun"],
      year: ["2018-12-31 Mon", "2019-12-29 Sun"],
    },
  ],
  [
    "2019-12-29",
    {
      broadcastYear: 2019,
      broadcastQuarter: 4,
      broadcastMonth: 12,
      week: ["2019-12-23 Mon", "2019-12-29 Sun"],
      month: ["2019-11-25 Mon", "2019-12-29 Sun"],
      quarter: ["2019-09-30 Mon", "2019-12-29 Sun"],
      year: ["2018-12-31 Mon", "2019-12-29 Sun"],
    },
  ],
  [
    "2019-12-30",
    {
      broadcastYear: 2020,
      broadcastQuarter: 1,
      broadcastMonth: 1,
      week: ["2019-12-30 Mon", "2020-01-05 Sun"],
      month: ["2019-12-30 Mon", "2020-01-26 Sun"],
      quarter: ["2019-12-30 Mon", "2020-03-29 Sun"],
      year: ["2019-12-30 Mon", "2020-12-27 Sun"],
    },
  ],
  [
    "2020-04-30",
    {
      broadcastYear: 2020,
      broadcastQuarter: 2,
      broadcastMonth: 5,
      week: ["2020-04-27 Mon", "2020-05-03 Sun"],
      month: ["2020-04-27 Mon", "2020-05-31 Sun"],
      quarter: ["2020-03-30 Mon", "2020-06-28 Sun"],
      year: ["2019-12-30 Mon", "2020-12-27 Sun"],
    },
  ],
  [
    "2021-12-31",
    {
      broadcastYear: 2022,
      broadcastQuarter: 1,
      broadcastMonth: 1,
      week: ["2021-12-27 Mon", "2022-01-02 Sun"],
      month: ["2021-12-27 Mon", "2022-01-30 Sun"],
      quarter: ["2021-12-27 Mon", "2022-03-27 Sun"],
      year: ["2021-12-27 Mon", "2022-12-25 Sun"],
    },
  ],
  [
    "2025-01-01",
    {
      broadcastYear: 2025,
      broadcastQuarter: 1,
      broadcastMonth: 1,
      week: ["2024-12-30 Mon", "2025-01-05 Sun"],
      month: ["2024-12-30 Mon", "2025-01-26 Sun"],
      quarter: ["2024-12-30 Mon", "2025-03-30 Sun"],
      year: ["2024-12-30 Mon", "2025-12-28 Sun"],
    },
  ],
];

const broadcastMonthTestDates: [string, number][] = [
  ["2024-01-01", 1],
  ["2024-01-30", 2],
  ["2024-01-31", 2],
  ["2024-03-31", 3],
  ["2024-04-01", 4],
  ["2024-04-28", 4],
  ["2024-04-29", 5],
  ["2024-04-30", 5],
  ["2024-11-25", 12],
  ["2024-11-30", 12],
  ["2024-12-01", 12],
  ["2024-12-31", 1],
];

test.each(broadcastMonthTestDates)(
  "getBroadcastMonth %s",
  (weekStart, monthNumber) => {
    expect(getBroadcastMonth(parseDateFromISO(weekStart))).toBe(monthNumber);
  },
);

const broadcastWeekTestDates: [string, number][] = [
  ["2016-12-31", 1],
  ["2017-12-31", 53],
  ["2018-01-01", 1],
  ["2018-04-30", 18],
  ["2018-05-28", 22],
  ["2018-08-27", 35],
  ["2018-12-30", 52],
  ["2018-12-31", 1],
  ["2019-03-31", 13],
  ["2019-04-01", 14],
  ["2019-06-30", 26],
  ["2019-07-01", 27],
  ["2019-08-27", 35],
  ["2019-09-29", 39],
  ["2019-09-30", 40],
  ["2019-12-29", 52],
  ["2019-12-30", 1],
  ["2019-12-31", 1],
  ["2020-04-20", 17],
  ["2020-04-30", 18],
  ["2020-07-13", 29],
  ["2020-12-27", 52],
  ["2021-06-28", 27],
  ["2021-12-26", 52],
  ["2021-12-27", 1],
  ["2021-12-31", 1],
  ["2022-06-26", 26],
  ["2022-06-27", 27],
  ["2022-12-25", 52],
  ["2022-12-26", 1],
  ["2023-12-30", 53],
  ["2025-01-01", 1],
  ["2028-12-29", 53],
];

test.each(broadcastWeekTestDates)(
  "getBroadcastWeek %s",
  (weekStart, weekNumber) => {
    expect(getBroadcastWeek(parseDateFromISO(weekStart))).toBe(weekNumber);
  },
);

const broadcastWeekKeyTestDates = {
  201601: "2015-12-28",
  201753: "2017-12-25",
  201801: "2018-01-01",
  201818: "2018-04-30",
  201822: "2018-05-28",
  201835: "2018-08-27",
  201852: "2018-12-24",
  201901: "2018-12-31",
  201913: "2019-03-25",
  201914: "2019-04-01",
  201926: "2019-06-24",
  201927: "2019-07-01",
  201935: "2019-08-26",
  201939: "2019-09-23",
  201940: "2019-09-30",
  201952: "2019-12-23",
  202017: "2020-04-20",
  202018: "2020-04-27",
  202029: "2020-07-13",
  202052: "2020-12-21",
  202101: "2020-12-28",
  202127: "2021-06-28",
  202152: "2021-12-20",
  202201: "2021-12-27",
  202226: "2022-06-20",
  202227: "2022-06-27",
  202252: "2022-12-19",
  202353: "2023-12-25",
  202853: "2028-12-25",
};

test.each(Object.entries(broadcastWeekKeyTestDates))(
  "parseDateFromISO %s",
  (weekKey, weekStart) => {
    expect(getBroadcastWeekKey(parseDateFromISO(weekStart))).toBe(
      parseInt(weekKey, 10),
    );
  },
);

test.each(Object.entries(broadcastWeekKeyTestDates))(
  "parseDateFromBroadcastWeekKey %i",
  (weekKey, weekStart) => {
    expect(parseDateFromBroadcastWeekKey(weekKey)?.toISODate()).toBe(weekStart);
  },
);

test.each(broadcastTestData)(
  "broadcast calendar intervals for $s",
  (weekStr, expected) => {
    const week = parseDateFromISO(weekStr) as DateTime<true>;

    expect(
      formatBroadcastDateInterval(getBroadcastWeekInterval(week), testFormat),
      `getBroadcastWeekInterval ${weekStr}`,
    ).toStrictEqual(expected.week);

    expect(
      formatBroadcastDateInterval(getBroadcastMonthInterval(week), testFormat),
      `getBroadcastMonthInterval expects ${expected.month.toString()}`,
    ).toStrictEqual(expected.month);

    expect(
      formatBroadcastDateInterval(
        getBroadcastQuarterInterval(week),
        testFormat,
      ),
      `getBroadcastQuarterInterval expects ${expected.quarter.toString()}`,
    ).toStrictEqual(expected.quarter);

    expect(
      formatBroadcastDateInterval(getBroadcastYearInterval(week), testFormat),
      `getBroadcastYearInterval expects ${expected.year.toString()}`,
    ).toStrictEqual(expected.year);

    expect(
      getBroadcastYear(week),
      `getBroadcastYear expects ${expected.broadcastYear}`,
    ).toBe(expected.broadcastYear);

    expect(
      getBroadcastQuarter(week),
      `getBroadcastQuarter expects ${expected.broadcastQuarter}`,
    ).toBe(expected.broadcastQuarter);

    expect(
      getBroadcastMonth(week),
      `getBroadcastMonth expects ${expected.broadcastMonth}`,
    ).toBe(expected.broadcastMonth);

    expect(
      getBroadcastYearQuarter(week),
      `getBroadcastYearQuarter expects ${expected.broadcastYear} ${expected.broadcastQuarter}`,
    ).toStrictEqual({
      year: expected.broadcastYear,
      quarter: expected.broadcastQuarter,
    });

    const expectedWeekNubmer = broadcastWeekTestDates.find(
      (w) => weekStr === w[0],
    );

    expect(
      getBroadcastQuarterWeek(week),
      `getBroadcastQuarterWeek ${weekStr} expects [${expected.broadcastQuarter} ${expectedWeekNubmer?.[1]}]`,
    ).toStrictEqual([expected.broadcastQuarter, expectedWeekNubmer?.[1]]);

    expect(
      formatBroadcastDateInterval(
        getBroadcastQuarterIntervalFromYearQuarter({
          year: expected.broadcastYear,
          quarter: expected.broadcastQuarter,
        }) as Interval<true>,
        testFormat,
      ),
      `getBroadcastQuarterIntervalFromYearQuarter expects ${expected.quarter.toString()}`,
    ).toStrictEqual(expected.quarter);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const yearQuarter = yearQuarterToInteger({
      year: expected.broadcastYear,
      quarter: expected.broadcastQuarter,
    })!;

    expect(
      integerToYearQuarter(yearQuarter),
      `yearQuarterToInteger matches integerToYearQuarter`,
    ).toStrictEqual({
      year: expected.broadcastYear,
      quarter: expected.broadcastQuarter,
    });
  },
);

const broadcastWeekKeys = {
  "2016-12-31": 201701,
  "2017-12-31": 201753,
  "2018-04-30": 201818,
  "2018-05-28": 201822,
  "2018-08-27": 201835,
  "2018-12-30": 201852,
  "2018-12-31": 201901,
  "2019-08-27": 201935,
  "2019-12-31": 202001,
  "2020-04-20": 202017,
  "2020-12-27": 202052,
  "2021-06-28": 202127,
  "2021-12-26": 202152,
  "2021-12-27": 202201,
  "2022-06-26": 202226,
  "2022-06-27": 202227,
  "2022-12-25": 202252,
  "2022-12-26": 202301,
  "2023-12-30": 202353,
  "2028-12-29": 202853,
};

test.each(Object.entries(broadcastWeekKeys))(
  `getBroadcastWeekKey for %s expects %i`,
  (dateStr, weekKey) => {
    const date = parseDateFromISO(dateStr);
    expect(getBroadcastWeekKey(date)).toBe(weekKey);
  },
);

test.each(Object.entries(broadcastWeekKeys))(
  `getBroadcastWeekKeyInterval for %s`,
  (dateStr, weekKey) => {
    const { start: expectedStart, end: expectedEnd } = getBroadcastWeekInterval(
      parseDateFromISO(dateStr) as DateTime<true>,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { start, end } = getBroadcastWeekKeyInterval(weekKey)!;

    expect(
      start.toISODate(),
      `getBroadcastWeekKeyInterval start date for ${weekKey} expects ${expectedStart.toISODate()}`,
    ).toBe(expectedStart.toISODate());

    expect(
      end.toISODate(),
      `getBroadcastWeekKeyInterval end date for ${weekKey} expects ${expectedEnd.toISODate()}`,
    ).toBe(expectedEnd.toISODate());
  },
);

test("year quarter comparasing function", () => {
  const larger = { year: 2021, quarter: 4 };
  const smaller = { year: 2020, quarter: 4 };

  expect(yearQuarterIsGreaterThan(smaller, larger)).toBe(false);
  expect(yearQuarterIsGreaterThan(larger, smaller)).toBe(true);
  expect(yearQuarterIsGreaterThan(larger, larger)).toBe(false);
});

test("year quarter increment function", () => {
  const yq = { year: 2021, quarter: 4 };

  expect(incrementYearQuarter(yq, 1)).toStrictEqual({ year: 2022, quarter: 1 });
  expect(incrementYearQuarter(yq, -4)).toStrictEqual({
    year: 2020,
    quarter: 4,
  });
});

test("year quarter type guard", () => {
  expect(isYearQuarter({ year: 2021, quarter: 4 })).toBe(true);
  expect(isYearQuarter({ year: 2021 })).toBe(false);
  expect(isYearQuarter({ quarter: 4 })).toBe(false);
  expect(isYearQuarter({ year: "2021", quarter: 4 })).toBe(false);
  expect(isYearQuarter({ year: "2021", quarter: "4" })).toBe(false);
  expect(isYearQuarter(undefined)).toBe(false);
});

test("years quarters from Interval", () => {
  const interval = Interval.fromISO("2020-07-01/2021-07-01");
  const yearsQuarters = getBroadcastYearsQuarters(interval);

  expect(yearsQuarters).toStrictEqual([
    {
      year: 2020,
      quarters: [3, 4],
    },
    {
      year: 2021,
      quarters: [1, 2, 3],
    },
  ]);
});

test("broadcast weeks in interval", () => {
  const interval = Interval.fromISO("2021-07-23/2021-08-11") as Interval<true>;
  const weeksIntervals = getBroadcastWeeksInInterval(interval).map(
    ({ start, end }) => ({ start: start.toISODate(), end: end.toISODate() }),
  );

  expect(weeksIntervals).toStrictEqual([
    {
      start: "2021-07-19",
      end: "2021-07-25",
    },
    {
      start: "2021-07-26",
      end: "2021-08-01",
    },
    {
      start: "2021-08-02",
      end: "2021-08-08",
    },
    {
      start: "2021-08-09",
      end: "2021-08-15",
    },
  ]);
});

test("converting from broadcast calendar to gregorian calendar", () => {
  expect(
    toCalendarDateTime(parseDateFromSQL("2022-07-23 03:15:00")).toISODate(),
  ).toBe("2022-07-24");

  expect(
    toCalendarDateTime(parseDateFromSQL("2022-07-23 06:15:00")).toISODate(),
  ).toBe("2022-07-23");
});

test("2022-12-25T23:59:59-05:00 is not 202201", () => {
  expect(
    getBroadcastWeekKey(parseDateFromISO("2022-12-25T23:59:59-05:00")),
  ).toBe(202252);
});

test("formatToISOWithoutTZ", () => {
  expect(
    formatToISOWithoutTZ(parseDateFromISO("2022-12-25T23:59:59-05:00")),
  ).toBe("2022-12-25T23:59:59");
});

test("formatToSQLWithoutTZ", () => {
  expect(
    formatToSQLWithoutTZ(parseDateFromISO("2022-12-25T23:59:59-05:00")),
  ).toBe("2022-12-25 23:59:59.000");
});
