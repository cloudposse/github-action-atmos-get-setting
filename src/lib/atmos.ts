import { execSync } from "node:child_process";

export const runAtmosDescribeComponent = async (component: string, stack: string, processTemplates: boolean, cwd?: string) => {
  const options = cwd ? { cwd, env: {ATMOS_LOGS_LEVEL: "Info"} } : {env: {ATMOS_LOGS_LEVEL: "Info"}};
  const command = `atmos describe component ${component} -s ${stack} --format=json --process-templates=${String(processTemplates)}`;
  const atmos = execSync(command, options);
  return atmos.toString();
};
