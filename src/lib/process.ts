import * as core from "@actions/core";
import { getSingleSetting, SettingsInput, SingleSettingInput } from "@lib";
import * as YAML from "yaml";

export const processSingleSetting = async () => {
  const component = core.getInput("component");
  const stack = core.getInput("stack");
  const settingsPath = core.getInput("settings-path");

  const singleSetting = {
    component,
    stack,
    "settings-path": settingsPath
  };

  const parseResult = SingleSettingInput.safeParse(singleSetting);

  if (parseResult.success) {
    const value = await getSingleSetting(
      parseResult.data.component,
      parseResult.data.stack,
      parseResult.data["settings-path"]
    );
    core.setOutput("value", value);
    return true;
  }

  return false;
};

export const processMultipleSettings = async () => {
  const settingsInput = core.getInput("settings");
  core.debug(`settingsInput: ${settingsInput}`);

  if (settingsInput) {
    const json = YAML.parse(settingsInput);
    core.debug(`settingsInputParsed: ${JSON.stringify(json)}`);
    const parseResult = SettingsInput.safeParse(json);

    if (parseResult.success && parseResult.data.length > 0) {
      const settings = parseResult.data;

      const output = await settings.reduce(async (accPromise, item) => {
        const acc = await accPromise;
        const { outputPath, ...rest } = item;
        const result = await getSingleSetting(
          item.component,
          item.stack,
          item.settingsPath
        );
        return { ...acc, [outputPath]: result };
      }, Promise.resolve({}));

      core.setOutput("settings", JSON.stringify(output));
      return true;
    }
  }
  return false;
};
