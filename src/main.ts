import * as core from "@actions/core";
import { processMultipleSettings, processSingleSetting } from "@useCase";

(async () => {
  try {
    const singleResult = await processSingleSetting();
    const multipleResult = await processMultipleSettings();

    if (singleResult || multipleResult) {
      core.info("result returned successfully");
    } else {
      core.error("invalid input");
    }
  } catch (error) {
    const err = error as Error;
    core.setFailed(err);
    core.error(err.stack || "");
  }
})();
