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
  year: null | number;
  yearInterval: null | Interval;
  quarter: null | number;
  quarterInterval: null | Interval;
  monthInterval: null | Interval;
  week: null | number;
  weekInterval: null | Interval;
  weekKey: null | number;
};

export type BroadcastCalendarString = {
  date: null | string;
  year: null | number;
  yearInterval: null | StringInterval;
  quarter: null | number;
  quarterInterval: null | StringInterval;
  monthInterval: null | StringInterval;
  week: null | number;
  weekInterval: null | StringInterval;
  weekKey: null | number;
  weekDay: null | string;
};
