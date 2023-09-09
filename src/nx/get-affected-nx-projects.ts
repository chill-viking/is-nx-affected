import * as core from '@actions/core';
import { exec } from 'child_process';

export async function getAffectedNxProjects(
  path: string,
  base: string,
): Promise<string[]> {
  core.debug(
    `Running command in ${path}: npx nx print-affected --base ${base} --select projects --plain`,
  );
  const command = `npx nx show projects --affected --base ${base}`;
  let projects: string[] = [];
  await new Promise((resolve, error) =>
    exec(command, { cwd: path }, (err, stdout, stderr) => {
      if (err) {
        error(err);
        return;
      }

      if (stderr) {
        error(stderr);
        return;
      }

      projects.push(...stdout.split('\n'));
      core.info(`Found ${projects.length} affected projects`);
      resolve('Completed');
    }),
  );

  return projects;
}
