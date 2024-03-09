import { DateTime } from "luxon";

export function getDateCachedFor<T>(fn: (date: DateTime<true>) => T) {
  const cache = new Map<string, T>();

  return (date: DateTime<true>): T => {
    const key = date.toISODate();
    const cachedValue = cache.get(key);
    if (cachedValue) {
      return cachedValue;
    }

    const value = fn(date);
    cache.set(key, value);
    return value;
  };
}
