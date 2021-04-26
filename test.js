const test = require("ava");
const {
  parseDateFromISO,
  formatBroadcastDateRange,
  getBroadcastWeekRange,
  getBroadcastMonthRange,
  getBroadcastQuarterRange,
  getBroadcastYearRange,
  getBroadcastYear,
  getBroadcastQuarter,
  getBroadcastYearQuarter,
  getBroadcastWeek,
  getBroadcastQuarterWeek,
  makeFormatter,
} = require("./");

const testFormat = makeFormatter("yyyy-MM-dd EEE");

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

const broadcastWeekTestDate = [
  ["2018-01-01", 1],
  ["2016-12-31", 1],
  ["2017-12-31", 53],
  ["2018-04-30", 18],
  ["2018-05-28", 22],
  ["2018-08-27", 35],
  ["2018-12-30", 52],
  ["2018-12-31", 1],
  ["2019-08-27", 35],
  ["2019-03-31", 13],
  ["2019-04-01", 14],
  ["2019-06-30", 26],
  ["2019-07-01", 27],
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
  broadcastWeekTestDate.forEach(([weekStart, weekNumber]) => {
    t.is(
      getBroadcastWeek(parseDateFromISO(weekStart)),
      weekNumber,
      `getBroadcastWeek ${weekStart}`
    );
  });
});

test("broadcast calendar range", (t) => {
  broadcastTestData.forEach(([weekStr, expected]) => {
    const week = parseDateFromISO(weekStr);

    t.deepEqual(
      formatBroadcastDateRange(getBroadcastWeekRange(week), testFormat),
      expected.week,
      `getBroadcastWeekRange ${weekStr}`
    );

    t.deepEqual(
      formatBroadcastDateRange(getBroadcastMonthRange(week), testFormat),
      expected.month,
      `getBroadcastMonthRange expects ${expected.month.toString()}`
    );

    t.deepEqual(
      formatBroadcastDateRange(getBroadcastQuarterRange(week), testFormat),
      expected.quarter,
      `getBroadcastQuarterRange expects ${expected.quarter.toString()}`
    );

    t.deepEqual(
      formatBroadcastDateRange(getBroadcastYearRange(week), testFormat),
      expected.year,
      `getBroadcastYearRange expects ${expected.year.toString()}`
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

    const expectedWeekNubmer = broadcastWeekTestDate.find(
      (w) => weekStr === w[0]
    );

    t.deepEqual(
      getBroadcastQuarterWeek(parseDateFromISO(week)),
      [expected.broadcastQuarter, expectedWeekNubmer[1]],
      `getBroadcastQuarterWeek ${week} expects [${expected.broadcastQuarter} ${expectedWeekNubmer[1]}]`
    );
  });
});
