import { DateTime, Interval } from "luxon";
import { BroadCastTimeZone, StringInterval } from "./types";

export const makeFormatter = (format: string) => (date: DateTime): string =>
  date.setZone(BroadCastTimeZone).toFormat(format);

const dateFormat = makeFormatter("yyyy-MM-dd");

export function formatBroadcastDateRange(
  range: Interval,
  format = dateFormat
): StringInterval {
  return [format(range.start), format(range.end)];
}
