export const getNestedValue = (obj: any, path: string): any | undefined => {
  return path.split(".").reduce((currentObj, key) => {
    return currentObj && typeof currentObj === "object" && key in currentObj
      ? currentObj[key]
      : undefined; // Property doesn't exist along the path
  }, obj);
};
