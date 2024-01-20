import * as core from "@actions/core";
import { processMultipleSettings, processSingleSetting } from "@lib";

(async () => {
  try {
    const singleResult = await processSingleSetting();
    const multipleResult = await processMultipleSettings();

    if (singleResult || multipleResult) {
      core.info("Result returned successfully");
    } else {
      core.error("Invalid input");
    }
  } catch (error) {
    const err = error as Error;
    core.setFailed(err);
    core.error(err.stack || "");
  }
})();
