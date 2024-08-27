import { ZodError } from "zod";
import { SettingsInput, getSetting } from "./settings";

describe("settings-dto", () => {
  it("throws with invalid object", async () => {
    const t = () => {
      const input = [{}];
      SettingsInput.parse(input);
    };
    expect(t).toThrow(ZodError);
  });

  it("parses a valid object", () => {
    const input = [
      {
        component: "component",
        stack: "stack",
        settingsPath: "settingsPath",
        outputPath: "outputPath"
      }
    ];
    const result = SettingsInput.parse(input);
    expect(result).toEqual(input);
  });
});

describe("getSingleSetting", () => {
  it("should return a string", async () => {
    const settingValue = await getSetting(
      "foo",
      "core-ue1-dev",
      "atmos_cli_config.components.terraform.base_path",
      true);
    expect(settingValue).toEqual("components/terraform");
  });
});
