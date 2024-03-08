import { DateTime } from "luxon";
import { IfValid, isValid } from "./helpers";

export function getCachedFor(
  fn: <IsValid extends boolean>(
    date: DateTime<IsValid>,
  ) => IfValid<IsValid, number>,
) {
  const cache = new Map<string, number>();

  return <IsValid extends boolean>(
    date: DateTime<IsValid>,
  ): IfValid<IsValid, number> => {
    if (!isValid(date)) {
      return null as IfValid<IsValid, number>;
    }

    const key = date.toISODate() as string;
    const cachedValue = cache.get(key);
    if (cachedValue) {
      return cachedValue as IfValid<IsValid, number>;
    }

    const value = fn(date);
    cache.set(key, value);
    return value as IfValid<IsValid, number>;
  };
}
