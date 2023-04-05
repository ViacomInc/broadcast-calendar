import { DateTime } from "luxon";

export function isValid(date: DateTime | null | undefined): date is DateTime {
  return Boolean(date?.isValid);
}
