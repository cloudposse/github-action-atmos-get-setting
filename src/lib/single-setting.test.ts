import { getSingleSetting } from "./single-setting";

describe("getSingleSetting", () => {
  it("should return a string", async () => {
    const settingValue = await getSingleSetting(
      "foo",
      "core-ue1-dev",
      "atmos_cli_config.components.terraform.base_path"
    );
    expect(settingValue).toEqual("components/terraform");
  });
});
