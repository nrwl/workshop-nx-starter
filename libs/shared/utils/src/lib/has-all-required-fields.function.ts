export function hasAllRequiredFields<T>(
  arg: any,
  requiredFields: (keyof T)[]
): boolean {
  for (const key of requiredFields) {
    if (!Object.keys(arg).includes(key as string)) {
      return false;
    }
  }
  return true;
}
