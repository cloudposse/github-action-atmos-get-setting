import { z } from "zod";
import { runAtmosDescribeComponent } from "./atmos";

export const getNestedValue = (obj: any, path: string): any | undefined => {
  return path.split(".").reduce((currentObj, key) => {
    return currentObj && typeof currentObj === "object" && key in currentObj
      ? currentObj[key]
      : undefined; // Property doesn't exist along the path
  }, obj);
};

export const SingleSettingInput = z.object({
  component: z.string().trim().min(1),
  stack: z.string().trim().min(1),
  "settings-path": z.string().trim().min(1)
});

export const SettingInput = z.object({
  component: z.string().trim().min(1),
  stack: z.string().trim().min(1),
  settingsPath: z.string().trim().min(1),
  outputPath: z.string().trim().min(1)
});

export const SettingsInput = z.array(SettingInput).min(1);

export type SingleSettingInput = z.infer<typeof SingleSettingInput>;
export type SettingInput = z.infer<typeof SettingInput>;
export type SettingsInput = z.infer<typeof SettingsInput>;

export const getSetting = async (
  component: string,
  stack: string,
  settingsPath: string,
  processTemplates: boolean,
  processFunctions: boolean
) => {
  const cmdOutput = await runAtmosDescribeComponent(component, stack, processTemplates, processFunctions);
  const json = JSON.parse(cmdOutput);

  return getNestedValue(json, settingsPath);
};
