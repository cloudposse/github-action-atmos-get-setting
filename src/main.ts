import * as core from "@actions/core";
import { processMultipleSettings, processSingleSetting } from "@useCase";

(async () => {
  try {
    const processTemplates = core.getBooleanInput("process-templates");
    const processFunctions = core.getBooleanInput("process-functions");
    const singleResult = await processSingleSetting(processTemplates, processFunctions);
    const multipleResult = await processMultipleSettings(processTemplates, processFunctions);

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
