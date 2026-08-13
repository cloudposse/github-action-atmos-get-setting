import { execSync } from "node:child_process";

export const runAtmosDescribeComponent = async (component: string, stack: string, processTemplates: boolean, processFunctions: boolean, cwd?: string) => {
  // Atmos editions >= 2026-07-17 default `describe.component.filter` to "schema",
  // which drops computed sections like `atmos_cli_config` from the output.
  // Force the full view so settings-paths keep resolving; respect an explicit override.
  const env = {
    ...process.env,
    ATMOS_DESCRIBE_COMPONENT_FILTER: process.env.ATMOS_DESCRIBE_COMPONENT_FILTER ?? "full",
  };
  const options = cwd ? { cwd, env } : { env };
  let command = `atmos describe component ${component} -s ${stack} --format=json`;

  if (!processFunctions) {
    command += ` --process-functions=false`;
  }

  if (!processTemplates) {
    command += ` --process-templates=false`;
  }

  const atmos = execSync(command, options);
  return atmos.toString();
};
