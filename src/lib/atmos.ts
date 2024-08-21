import { execSync } from "node:child_process";

export const runAtmosDescribeComponent = async (component: string, stack: string, cwd?: string) => {
  const options = cwd ? { cwd } : {};

  // We do not process templates in the following command, as some template functions such as 'atmos.Component'
  // require authentication to remote state backends.
  const command = `atmos describe component ${component} -s ${stack} --format=json --process-templates=false`;
  const atmos = execSync(command, options);
  return atmos.toString();
};
