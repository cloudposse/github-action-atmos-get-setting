import { processSingleSetting } from "./process-single-setting";
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
      "settings-path": "atmos_cli_config.components.terraform.base_path",
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
    const result = await processSingleSetting(true);
    expect(outputs["value"]).toEqual("components/terraform");
  });
});

describe("singleSettingWithTemplatesEnabled", () => {
  let outputs: any = {};

  beforeEach(() => {
    outputs = {};
    const mockValues: any = {
      component: "hello",
      stack: "core-ue1-dev",
      "settings-path": "settings.level1.example",
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

  it("should return a templated value", async () => {
    const result = await processSingleSetting(true);
    expect(outputs["value"]).toEqual(
      "core-ue1-dev"
    );
  });
});

describe("singleSettingWithTemplatesDisabled", () => {
  let outputs: any = {};

  beforeEach(() => {
    outputs = {};
    const mockValues: any = {
      component: "hello",
      stack: "core-ue1-dev",
      "settings-path": "settings.level1.example"
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

  it("should return a template placeholder", async () => {
    const result = await processSingleSetting(false);
    expect(outputs["value"]).toEqual(
      "{{ (printf \"%s-%s-%s\" .vars.tenant .vars.environment .vars.stage) }}"
    );
  });
});
