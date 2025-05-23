import { processMultipleSettings } from "./process-multiple-settings";
import * as core from "@actions/core";
import { expect, jest, it, describe, afterEach } from "@jest/globals";

jest.mock("@actions/core");

describe("multipleSettings", () => {
  let outputs: any = {};

  beforeEach(() => {
    outputs = {};
    const mockValues: any = {
      settings: JSON.stringify([
        {
          component: "foo",
          stack: "core-ue1-dev",
          settingsPath: "atmos_cli_config.components.terraform.base_path",
          outputPath: "prop1"
        },
        {
          component: "foo",
          stack: "core-ue1-dev",
          settingsPath: "settings.level1.level2.level3.secrets-arn",
          outputPath: "secretArn"
        }
      ])
    };

    jest
      .spyOn(core, "getInput")
      .mockImplementation(
        (name: string, options?: core.InputOptions | undefined) => {
          return mockValues[name];
        }
      );

    jest
      .spyOn(core, "setOutput")
      .mockImplementation((name: string, value: any) => {
        outputs[name] = value;
      });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return an object", async () => {
    const result = await processMultipleSettings(true, true);
    expect(outputs["settings"]).toEqual(
      '{"prop1":"components/terraform","secretArn":"arn:aws:secretsmanager:us-east-1:000000000000:secret:MySecret-PlMes3"}'
    );
  });
});
