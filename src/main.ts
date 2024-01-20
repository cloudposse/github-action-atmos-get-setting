import * as core from "@actions/core";
import { processMultipleSettings, processSingleSetting } from "@lib";

(async () => {
  const singleResult = await processSingleSetting();
  const multipleResult = await processMultipleSettings();

  if (singleResult || multipleResult) {
    core.info("Result returned successfully");
  } else {
    core.error("Invalid input");
  }
})();
