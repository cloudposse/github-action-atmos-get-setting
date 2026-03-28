import { execSync } from "node:child_process";
import * as core from "@actions/core";

export const runAtmosDescribeComponent = async (component: string, stack: string, processTemplates: boolean, processFunctions: boolean, atmosProfile?: string, cwd?: string) => {
  const env = atmosProfile ? { ...process.env, ATMOS_PROFILE: atmosProfile } : process.env;
  const options = cwd ? { cwd, env } : { env };
  let command = `atmos describe component ${component} -s ${stack} --format=json`;

  if (!processFunctions) {
    command += ` --process-functions=false`;
  }

  if (!processTemplates) {
    command += ` --process-templates=false`;
  }

  // core.info(`Running command: ${command}`);
  const atmos = execSync(command, options);
  const rawOutput = atmos.toString();
  // core.info(`Command output: ${rawOutput}`);
  const jsonStart = rawOutput.indexOf('{');
  if (jsonStart === -1) {
    throw new Error('No JSON object found in atmos output');
  }
  const output = rawOutput.substring(jsonStart);
  return output;
};
