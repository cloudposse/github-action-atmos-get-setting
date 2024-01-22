import { z } from "zod";

export const getNestedValue = (obj: any, path: string): any | undefined => {
  return path.split(".").reduce((currentObj, key) => {
    return currentObj && typeof currentObj === "object" && key in currentObj
      ? currentObj[key]
      : undefined; // Property doesn't exist along the path
  }, obj);
};

export const SingleSettingInput = z.object({
  component: z.string(),
  stack: z.string(),
  "settings-path": z.string()
});

export const SettingInput = z.object({
  component: z.string(),
  stack: z.string(),
  settingsPath: z.string(),
  outputPath: z.string()
});

export const SettingsInput = z.array(SettingInput).min(1);

export type SingleSettingInput = z.infer<typeof SingleSettingInput>;
export type SettingInput = z.infer<typeof SettingInput>;
export type SettingsInput = z.infer<typeof SettingsInput>;
