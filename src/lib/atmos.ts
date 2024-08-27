import { execSync } from "node:child_process";

export const runAtmosDescribeComponent = async (component: string, stack: string, processTemplates: boolean, cwd?: string) => {
  const options = cwd ? { cwd } : {};
  console.log(`atmos describe component ${component} -s ${stack} --format=json --process-templates=${processTemplates as unknown as string}`);

  const command = `atmos describe component ${component} -s ${stack} --format=json --process-templates=${processTemplates as unknown as string}`;
  const atmos = execSync(command, options);
  return atmos.toString();
};
