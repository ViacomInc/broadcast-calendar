import { DateTime } from "luxon";

export type IfValid<
  ThisIsValid extends boolean,
  ValidType,
  InvalidType = DefaultInvalidType,
> = ThisIsValid extends true ? ValidType : InvalidType;

export type DefaultInvalidType = null;

export function isValid(
  date: DateTime | null | undefined,
): date is DateTime<true> {
  return Boolean(date?.isValid);
}
