const test = require("ava");
const {
  formatBroadcastDateInterval,
  formatToISOWithoutTZ,
  formatToSQLWithoutTZ,
  getBroadcastMonthInterval,
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
  makeFormatter,
  parseDateFromBroadcastWeekKey,
  parseDateFromISO,
  parseDateFromSQL,
  parseIntervalFromISO,
  parseIntervalFromSQL,
  toCalendarDateTime,
  yearQuarterIsGreaterThan,
} = require("./");

const testFormat = makeFormatter("yyyy-MM-dd EEE");

test("parsing dates", (t) => {
  t.is(parseDateFromSQL("2021-07-23 03:15:00").toISODate(), "2021-07-23");
  t.is(parseDateFromSQL("2021-08-11").toISODate(), "2021-08-11");
  t.is(parseDateFromISO("2021-07-23T03:15:00").toISODate(), "2021-07-23");
  t.is(parseDateFromISO("2021-08-11").toISODate(), "2021-08-11");
});

test("parsing intervals", (t) => {
  t.is(
    parseIntervalFromSQL(["2021-07-23 03:15:00", "2021-08-11"]).isValid,
    true
  );
  t.is(
    parseIntervalFromISO(["2021-07-23T03:15:00", "2021-08-11"]).isValid,
    true
  );
});

const broadcastTestData = [
  [
    "2017-12-31",
    {
      broadcastYear: 2017,
      broadcastQuarter: 4,
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
      week: ["2021-12-27 Mon", "2022-01-02 Sun"],
      month: ["2021-12-27 Mon", "2022-01-30 Sun"],
      quarter: ["2021-12-27 Mon", "2022-03-27 Sun"],
      year: ["2021-12-27 Mon", "2022-12-25 Sun"],
    },
  ],
];

const broadcastWeekTestDates = [
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
  ["2028-12-29", 53],
];

test("getBroadcastWeek", (t) => {
  broadcastWeekTestDates.forEach(([weekStart, weekNumber]) => {
    t.is(
      getBroadcastWeek(parseDateFromISO(weekStart)),
      weekNumber,
      `getBroadcastWeek ${weekStart}`
    );
  });
});

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

test("parseDateFromBroadcastWeekKey", (t) => {
  Object.entries(broadcastWeekKeyTestDates).forEach(([weekKey, weekStart]) => {
    // test data
    t.is(
      getBroadcastWeekKey(parseDateFromISO(weekStart)),
      parseInt(weekKey, 10)
    );

    // test function
    t.is(
      parseDateFromBroadcastWeekKey(weekKey).toISODate(),
      weekStart,
      `parseDateFromBroadcastWeekKey ${weekKey}`
    );
  });
});

test("broadcast calendar interval", (t) => {
  broadcastTestData.forEach(([weekStr, expected]) => {
    const week = parseDateFromISO(weekStr);

    t.deepEqual(
      formatBroadcastDateInterval(getBroadcastWeekInterval(week), testFormat),
      expected.week,
      `getBroadcastWeekInterval ${weekStr}`
    );

    t.deepEqual(
      formatBroadcastDateInterval(getBroadcastMonthInterval(week), testFormat),
      expected.month,
      `getBroadcastMonthInterval expects ${expected.month.toString()}`
    );

    t.deepEqual(
      formatBroadcastDateInterval(
        getBroadcastQuarterInterval(week),
        testFormat
      ),
      expected.quarter,
      `getBroadcastQuarterInterval expects ${expected.quarter.toString()}`
    );

    t.deepEqual(
      formatBroadcastDateInterval(getBroadcastYearInterval(week), testFormat),
      expected.year,
      `getBroadcastYearInterval expects ${expected.year.toString()}`
    );

    t.deepEqual(
      getBroadcastYear(week),
      expected.broadcastYear,
      `getBroadcastYear expects ${expected.broadcastYear}`
    );

    t.deepEqual(
      getBroadcastQuarter(week),
      expected.broadcastQuarter,
      `getBroadcastQuarter expects ${expected.broadcastQuarter}`
    );

    t.deepEqual(
      getBroadcastYearQuarter(week),
      {
        year: expected.broadcastYear,
        quarter: expected.broadcastQuarter,
      },
      `getBroadcastYearQuarter expects ${expected.broadcastYear} ${expected.broadcastQuarter}`
    );

    const expectedWeekNubmer = broadcastWeekTestDates.find(
      (w) => weekStr === w[0]
    );

    t.deepEqual(
      getBroadcastQuarterWeek(parseDateFromISO(week)),
      [expected.broadcastQuarter, expectedWeekNubmer[1]],
      `getBroadcastQuarterWeek ${week} expects [${expected.broadcastQuarter} ${expectedWeekNubmer[1]}]`
    );

    t.deepEqual(
      formatBroadcastDateInterval(
        getBroadcastQuarterIntervalFromYearQuarter({
          year: expected.broadcastYear,
          quarter: expected.broadcastQuarter,
        }),
        testFormat
      ),
      expected.quarter,
      `getBroadcastQuarterIntervalFromYearQuarter expects ${expected.quarter.toString()}`
    );
  });
});

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

test("getBroadcastWeekKey", (t) => {
  Object.entries(broadcastWeekKeys).map(([dateStr, weekKey]) => {
    const date = parseDateFromISO(dateStr);
    t.is(
      getBroadcastWeekKey(date),
      weekKey,
      `getBroadcastWeekKey for ${dateStr} expects ${weekKey}`
    );
  });
});

test("getBroadcastWeekKeyInterval", (t) => {
  Object.entries(broadcastWeekKeys).map(([dateStr, weekKey]) => {
    const { start: expectedStart, end: expectedEnd } = getBroadcastWeekInterval(
      parseDateFromISO(dateStr)
    );
    const { start, end } = getBroadcastWeekKeyInterval(weekKey);

    t.is(
      start.toISODate(),
      expectedStart.toISODate(),
      `getBroadcastWeekKeyInterval start date for ${weekKey} expects ${expectedStart}`
    );
    t.is(
      end.toISODate(),
      expectedEnd.toISODate(),
      `getBroadcastWeekKeyInterval end date for ${weekKey} expects ${expectedEnd}`
    );
  });
});

test("year quarter comparasing function", (t) => {
  const larger = { year: 2021, quarter: 4 };
  const smaller = { year: 2020, quarter: 4 };

  t.is(yearQuarterIsGreaterThan(smaller, larger), false);
  t.is(yearQuarterIsGreaterThan(larger, smaller), true);
  t.is(yearQuarterIsGreaterThan(larger, larger), false);
});

test("year quarter increment function", (t) => {
  const yq = { year: 2021, quarter: 4 };

  t.deepEqual(incrementYearQuarter(yq, 1), { year: 2022, quarter: 1 });
  t.deepEqual(incrementYearQuarter(yq, -4), { year: 2020, quarter: 4 });
});

test("year quarter type guard", (t) => {
  t.is(isYearQuarter({ year: 2021, quarter: 4 }), true);
  t.is(isYearQuarter({ year: 2021 }), false);
  t.is(isYearQuarter({ quarter: 4 }), false);
  t.is(isYearQuarter({ year: "2021", quarter: 4 }), false);
  t.is(isYearQuarter({ year: "2021", quarter: "4" }), false);
  t.is(isYearQuarter(), false);
});

test("years quarters from Interval", (t) => {
  const interval = Interval.fromISO("2020-07-01/2021-07-01");
  const yearsQuarters = getBroadcastYearsQuarters(interval);

  t.deepEqual(yearsQuarters, [
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

test("broadcast weeks in interval", (t) => {
  const interval = Interval.fromISO("2021-07-23/2021-08-11");
  const weeksIntervals = getBroadcastWeeksInInterval(interval).map(
    ({ start, end }) => ({ start: start.toISODate(), end: end.toISODate() })
  );

  t.deepEqual(weeksIntervals, [
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

test("converting from broadcast calendar to gregorian calendar", (t) => {
  t.is(
    toCalendarDateTime(parseDateFromSQL("2022-07-23 03:15:00")).toISODate(),
    "2022-07-24"
  );

  t.is(
    toCalendarDateTime(parseDateFromSQL("2022-07-23 06:15:00")).toISODate(),
    "2022-07-23"
  );
});

test("2022-12-25T23:59:59-05:00 is not 202201", (t) => {
  t.is(
    getBroadcastWeekKey(parseDateFromISO("2022-12-25T23:59:59-05:00")),
    202252
  );
});

test("formatToISOWithoutTZ", (t) => {
  t.is(
    formatToISOWithoutTZ(parseDateFromISO("2022-12-25T23:59:59-05:00")),
    "2022-12-25T23:59:59"
  );
});

test("formatToSQLWithoutTZ", (t) => {
  t.is(
    formatToSQLWithoutTZ(parseDateFromISO("2022-12-25T23:59:59-05:00")),
    "2022-12-25 23:59:59.000"
  );
});
