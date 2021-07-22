import { DateTime, Interval } from "luxon";
import { BroadcastTimeZone, StringInterval } from "./types";

export const makeFormatter = (format: string) => (date: DateTime): string =>
  date.setZone(BroadcastTimeZone).toFormat(format);

const dateFormat = makeFormatter("yyyy-MM-dd");

export function formatBroadcastDateRange(
  range: Interval,
  format = dateFormat
): StringInterval {
  return [format(range.start), format(range.end)];
}
