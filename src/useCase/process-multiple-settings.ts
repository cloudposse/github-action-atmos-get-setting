import * as core from "@actions/core";
import { getSetting, SettingsInput } from "@lib";
import * as YAML from "yaml";

export const processMultipleSettings = async (processTemplates: boolean, processFunctions: boolean) => {
  const settingsInput = core.getInput("settings");

  if (settingsInput) {
    const yaml = YAML.parse(settingsInput);
    const parseResult = SettingsInput.safeParse(yaml);

    if (parseResult.success && parseResult.data.length > 0) {
      const settings = parseResult.data;

      const output = await settings.reduce(async (accPromise, item) => {
        const acc = await accPromise;
        const { outputPath, ...rest } = item;
        const result = await getSetting(
          item.component,
          item.stack,
          item.settingsPath,
          processTemplates,
          processFunctions);
        return { ...acc, [outputPath]: result };
      }, Promise.resolve({}));

      core.setOutput("settings", JSON.stringify(output));
      return true;
    }
  }
  return false;
};
