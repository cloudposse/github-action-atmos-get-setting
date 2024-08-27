import * as core from "@actions/core";
import { processMultipleSettings, processSingleSetting } from "@useCase";

(async () => {
  try {
    let processTemplates = core.getBooleanInput("process-templates");
    const singleResult = await processSingleSetting(processTemplates);
    const multipleResult = await processMultipleSettings(processTemplates);

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
