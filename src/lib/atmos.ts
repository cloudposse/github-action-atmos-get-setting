import { execSync } from "node:child_process";

export const runAtmosDescribeComponent = async (component: string, stack: string, cwd?: string) => {
  const options = cwd ? { cwd } : {};

  const command = `atmos describe component ${component} -s ${stack} --format=json`;
  const atmos = execSync(command, options);
  return atmos.toString();
};
