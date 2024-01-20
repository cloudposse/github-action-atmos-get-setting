import * as core from "@actions/core";
import { runAtmosDescribeComponent } from "./atmos";
import { getNestedValue } from "./settings";

export const getSingleSetting = async (
  component: string,
  stack: string,
  settingsPath: string
) => {
  const cmdOutput = await runAtmosDescribeComponent(component, stack);
  core.debug(`cmdOutput: ${cmdOutput}`);

  const json = JSON.parse(cmdOutput);

  return getNestedValue(json, settingsPath);
};
