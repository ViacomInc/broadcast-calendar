# US Broadcast Calendar Date Functions

![build](https://github.com/ViacomInc/broadcast-calendar/actions/workflows/main.yml/badge.svg)

This is a collection of functions to help converting good ol' dates to
_Broadcast_ dates when you need to be working in the
[Broadcast Calendar](https://en.wikipedia.org/wiki/Broadcast_calendar).

## Installation

`npm i @viacomcbs/broadcast-calendar`

This library uses [luxon](https://moment.github.io/luxon/) to work with dates.

## Usage

### Year Quarter

```ts
type YearQuarter = {
  year: number;
  quarter: number;
};
```

- **isYearQuarter(yq?: YearQuarter): yq is YearQuarter**

`YearQuarter` type guard function

- **getBroadcastYear(date: DateTime): number**

returns broadcast year for a given date

- **getBroadcastQuarter(date: DateTime): number**

returns broadcast quarter for a given date

- **getBroadcastQuarterWeek(date: DateTime): [number, number]**

returns `[quarter, week]` numbers for a given date

- **getBroadcastYearQuarter(date: DateTime): YearQuarter**

returns broadcast year and quarter for a given date

- **getBroadcastYearsQuarters(Interval): YearQuarters**

returns array of broadcast years and quarters for a given dates interval

- **incrementYearQuarter({ year, quarter }: YearQuarter, incrementValue?: number): YearQuarter**

increments quarter (and year if needed) for a given year quarter

- **yearQuarterIsGreaterThan(a: YearQuarter, b: YearQuarter): boolean**

return true if a is greater than b

### Week

- **getBroadcastWeek(date: DateTime): number**

returns broadcast week number for a given date

- **getBroadcastWeekKey(date: DateTime): number**

returns broadcast week key for a given date. Examples: `202103`, `202232`

### Range

Set of functions that return broadcast dates `Interval` for a given date.

- **getBroadcastWeekKeyRange(weekKey: number): Interval**
- **getBroadcastWeekRange(date: DateTime): Interval**
- **getBroadcastMonthRange(date: DateTime): Interval**
- **getBroadcastQuarterRange(date: DateTime): Interval**
- **getBroadcastYearRange(date: DateTime): Interval**
- **getBroadcastQuarterRangeFromYearQuarter({ year, quarter, }: YearQuarter): Interval**

- **getBroadcastWeeksInRange(range: Interval): Interval[]**

returns the array of broadcast weeks intervals for a given `range`

### Parse

- **parseDateFromSQL(date: string): DateTime**
- **parseDateFromISO(date: string): DateTime**
- **parseDateFromBroadcastWeekKey(weekKeyStr: string): DateTime**

Parses string and returns `luxon` DateTime in US Broadcast calendar time zone (EST)

- **parseIntervalFromSQL(range: StringInterval): Interval**
- **parseIntervalFromISO(range: StringInterval): Interval**

Parses string interval and returns `luxon` Interval in US Broadcast calendar time zone (EST)

### Format

- **formatBroadcastDateRange(range: Interval, format?: (date: DateTime) => string): StringInterval**

Takes `Interval` instance and returns a tuple with two ISO (or with `format` function) formatted dates

### Calendar

- **getBroadcastCalendar(date: DateTime): BroadcastCalendar**

returns all the broadcast calendar information

## CLI

`broadcast-calendar [ISO Date | Broadcast Week Key]`

Outputs broadcast calendar data JSON for given date or broadcast week key. If the date or key are omited outputs calendar for today.

License Apache 2.0 - see [LICENSE](./LICENSE) for more details.
