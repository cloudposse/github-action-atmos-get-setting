import { processMultipleSettings, processSingleSetting } from "./main";
import * as core from "@actions/core";
import { expect, jest, it, describe } from "@jest/globals";

jest.mock("@actions/core");

describe("singleSetting", () => {
  let outputs: any = {};

  beforeEach(() => {
    outputs = {};
    const mockValues: any = {
      component: "foo",
      stack: "core-ue1-dev",
      settingsPath: "atmos_cli_config.components.terraform.base_path"
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

  it("should return a value", async () => {
    const result = await processSingleSetting();
    expect(outputs["value"]).toEqual("components/terraform");
  });
});

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
    const result = await processMultipleSettings();
    expect(outputs["settings"]).toEqual({
      prop1: "components/terraform",
      secretArn:
        "arn:aws:secretsmanager:us-east-1:000000000000:secret:MySecret-PlMes3"
    });
  });
});
