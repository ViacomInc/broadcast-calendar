import { DateTime, Interval } from "luxon";

export type YearQuarter = {
  year: number;
  quarter: number;
};

export type YearQuarters = {
  year: number;
  quarters: number[];
};

export const BroadcastTimeZone = "America/New_York";

export type StringInterval = [string, string];

export type BroadcastCalendar = {
  date: DateTime;
  year: number;
  yearInterval: Interval;
  quarter: number;
  quarterInterval: Interval;
  monthInterval: Interval;
  week: number;
  weekInterval: Interval;
  weekKey: number;
};

export type BroadcastCalendarString = {
  date: string;
  year: number;
  yearInterval: StringInterval;
  quarter: number;
  quarterInterval: StringInterval;
  monthInterval: StringInterval;
  week: number;
  weekInterval: StringInterval;
  weekKey: number;
  weekDay: string;
};
