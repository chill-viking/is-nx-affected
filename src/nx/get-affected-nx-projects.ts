import * as core from '@actions/core';
import { exec } from 'child_process';

export async function getAffectedNxProjects(
  path: string,
  base: string,
): Promise<string[]> {
  const command = `npx -y nx show projects --affected --base="${base}"`;
  core.info(`Running command in ${path}: ${command}`);
  const projects: string[] = [];
  await new Promise((resolve, error) =>
    exec(command, { cwd: path }, (err, stdout, stderr) => {
      if (err || stderr?.startsWith('error') || stderr?.startsWith('fatal')) {
        error(
          new Error(
            `
Failed to get affected projects. Additional info:
${err?.message}
${stderr ?? ''}

Command output:
${stdout}
`,
          ),
        );
        return;
      }

      if (stderr?.startsWith('warning')) {
        core.warning(stderr);
      }

      projects.push(...stdout.split('\n').filter((p) => p));
      core.info(
        `Found ${projects.length} affected projects:\n${projects.join('\n')}`,
      );
      resolve('Completed');
    }),
  );

  return projects;
}
