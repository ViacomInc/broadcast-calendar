import { DateTime } from "luxon";

export type DefaultInvalidType = null;

export type IfValid<
  ThisIsValid extends boolean,
  ValidType,
  InvalidType = DefaultInvalidType,
> = ThisIsValid extends true ? ValidType : InvalidType;

export function isValid(
  date: DateTime | null | undefined,
): date is DateTime<true> {
  return Boolean(date?.isValid);
}
