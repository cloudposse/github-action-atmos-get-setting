import * as core from "@actions/core";
import { getNestedValue, runAtmosDescribeComponent, SettingsInput } from "@lib";
import * as YAML from "yaml";

export const processMultipleSettings = async (processTemplates: boolean, processFunctions: boolean, atmosProfile?: string) => {
  const settingsInput = core.getInput("settings");

  if (settingsInput) {
    const yaml = YAML.parse(settingsInput);
    const parseResult = SettingsInput.safeParse(yaml);

    if (parseResult.success && parseResult.data.length > 0) {
      const settings = parseResult.data;

      // Group settings by (component, stack) to avoid redundant atmos calls
      const groups = new Map<string, typeof settings>();
      for (const item of settings) {
        const key = `${item.component}\0${item.stack}`;
        if (!groups.has(key)) {
          groups.set(key, []);
        }
        groups.get(key)!.push(item);
      }

      const output: Record<string, any> = {};

      for (const [key, items] of groups) {
        const { component, stack } = items[0];
        const cmdOutput = await runAtmosDescribeComponent(component, stack, processTemplates, processFunctions, atmosProfile);
        const json = JSON.parse(cmdOutput);

        for (const item of items) {
          output[item.outputPath] = getNestedValue(json, item.settingsPath);
        }
      }

      core.setOutput("settings", JSON.stringify(output));
      return true;
    }
  }
  return false;
};
