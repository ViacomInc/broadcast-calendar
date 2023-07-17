# US Broadcast Calendar Date Functions

![build](https://github.com/ViacomInc/broadcast-calendar/actions/workflows/main.yml/badge.svg)

This is a collection of functions to help converting good ol' dates to
_Broadcast_ dates when you need to be working in the
[Broadcast Calendar](https://en.wikipedia.org/wiki/Broadcast_calendar).

# Notes

- **Broadcast calendar timezone is Eastern Time. It does have DST**
- **All functinons expect `DateTime` passed as an argument to be in Eastern Time Zone. Use `parse_` functions when possible.**
- **You can not trust time zones during the DST switchover unless you explicitly specify the time zone.**

## Installation

`npm i @viacomcbs/broadcast-calendar`

This library uses [luxon](https://moment.github.io/luxon/) to work with dates.

## Usage

### Broadcast Time Zone

**All functinons expect `DateTime` passed as an argument to be in Eastern Time Zone. Use `parse_` functions when possible.**

```ts
import {
  DateTime,
  BroadcastTimeZone,
  parseDateFromISO,
} from "@viacomcbs/broadcast-calendar";

const dateTime1 = parseDateFromISO("2022-12-26");
const dateTime2 = DateTime.fromISO("2022-12-26", { zone: BroadcastTimeZone });

// dateTime1 is the same as dateTime2
```

### Year Quarter

```ts
type YearQuarter = {
  year: number;
  quarter: number;
};
```

- **isYearQuarter(yq?: unknown): yq is YearQuarter**

`YearQuarter` type guard function

- **getBroadcastYear(date: DateTime): null | number**

returns broadcast year for a given date

- **getBroadcastQuarter(date: DateTime): null | number**

returns broadcast quarter for a given date

- **getBroadcastQuarterWeek(date: DateTime): null | [number, number]**

returns `[quarter, week]` numbers for a given date

- **getBroadcastYearQuarter(date: DateTime): null | YearQuarter**

returns broadcast year and quarter for a given date

- **getBroadcastYearsQuarters(Interval): null | YearQuarters[]**

returns array of broadcast years and quarters for a given dates interval

- **incrementYearQuarter({ year, quarter }: YearQuarter, incrementValue?: number): YearQuarter**

increments quarter (and year if needed) for a given year quarter

- **yearQuarterIsGreaterThan(a: YearQuarter, b: YearQuarter): boolean**

return true if a is greater than b

- **yearQuarterToInteger(value: YearQuarter): null | number**

returns an interger reperesention of YearQuarter type, like 20221

- **integerToYearQuarter(value: number): null | YearQuarter**

take an interger reperesention of Year Quarter, like 20221 and return YearQuarter type or null if integer is incorrect

### Week

- **getBroadcastWeek(date: DateTime): null | number**

returns broadcast week number for a given date

- **getBroadcastWeekKey(date: DateTime): null | number**

returns broadcast week key for a given date. Examples: `202103`, `202232`

### Interval

Set of functions that return broadcast dates `Interval` for a given date.

- **getBroadcastWeekKeyInterval(weekKey: number): Interval**
- **getBroadcastWeekInterval(date: DateTime): null | Interval**
- **getBroadcastMonthInterval(date: DateTime): null | Interval**
- **getBroadcastQuarterInterval(date: DateTime): null | Interval**
- **getBroadcastYearInterval(date: DateTime): null | Interval**
- **getBroadcastYearIntervalFromYear(year: number): null | Interval**
- **getBroadcastQuarterIntervalFromYearQuarter({ year, quarter, }: YearQuarter): null | Interval**

- **getBroadcastWeeksInInterval(interval: Interval): null | Interval[]**

returns the array of broadcast weeks intervals for a given `interval`

### Parse

- **parseDateFromSQL(date: string): DateTime**
- **parseDateFromISO(date: string): DateTime**
- **parseDateFromBroadcastWeekKey(weekKeyStr: string): null | DateTime**

Parses string and returns `luxon` DateTime in US Broadcast calendar time zone (Eastern Time)

- **parseIntervalFromSQL(interval: StringInterval): Interval**
- **parseIntervalFromISO(interval: StringInterval): Interval**

Parses string interval and returns `luxon` Interval in US Broadcast calendar time zone (Eastern Time)

### Format

- **formatToISOWithoutTZ(datetime: DateTime): null | string**
- **formatToSQLWithoutTZ(datetime: DateTime): null | string**

Return the string representation of DateTime but drops timezone offset

- **formatBroadcastDateInterval(interval: Interval, format?: (date: DateTime) => string): null | StringInterval**

Takes `Interval` instance and returns a tuple with two ISO (or with `format` function) formatted dates

### Calendar

- **getBroadcastCalendar(date: DateTime): BroadcastCalendar**

returns all the broadcast calendar information

- **toCalendarDateTime(broadcast: DateTime): DateTime**

converts broadcast date time into calendar date time.

Broadcast day starts at 6am, so broadcast date `2022-07-23 03:15:00` equals to `2022-07-24 03:15:00` in gregorian calendar.

## CLI

`broadcast-calendar [ISO Date | Broadcast Week Key]`

Outputs broadcast calendar data JSON for given date or broadcast week key. If the date or key are omited outputs calendar for today.

License Apache 2.0 - see [LICENSE](./LICENSE) for more details.
