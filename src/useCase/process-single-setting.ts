import * as core from "@actions/core";
import { getSetting, SingleSettingInput } from "@lib";
import * as YAML from "yaml";

export const processSingleSetting = async (processTemplates: boolean) => {
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
    const value = await getSetting(
      parseResult.data.component,
      parseResult.data.stack,
      parseResult.data["settings-path"],
      processTemplates);
    core.setOutput("value", value);
    return true;
  }

  return false;
};
