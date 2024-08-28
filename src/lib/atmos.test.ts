import { runAtmosDescribeComponent } from "./atmos";

describe("runAtmosDescribeComponent", () => {
  it("should return a string", async () => {
    const result = JSON.parse(await runAtmosDescribeComponent("foo", "core-ue1-dev"));
    expect(result.atmos_component).toEqual("foo");
    expect(result.atmos_stack).toEqual("core-ue1-dev");
  });
});
