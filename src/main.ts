import * as core from "@actions/core";
import { processMultipleSettings, processSingleSetting } from "@useCase";

(async () => {
  try {
    const processTemplates = core.getBooleanInput("process-templates");
    const processFunctions = core.getBooleanInput("process-functions");
    const atmosProfile = core.getInput("atmos-profile") || undefined;
    const singleResult = await processSingleSetting(processTemplates, processFunctions, atmosProfile);
    const multipleResult = await processMultipleSettings(processTemplates, processFunctions, atmosProfile);

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
