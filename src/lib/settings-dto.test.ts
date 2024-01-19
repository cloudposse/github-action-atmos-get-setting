import { ZodError } from "zod";
import { SettingsInput } from "./settings-dto";

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
