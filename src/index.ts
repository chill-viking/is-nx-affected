import * as core from '@actions/core';
import * as nxUtils from './nx';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const project: string = core.getInput('project');
    const base: string = core.getInput('base') ?? 'origin/main';

    core.startGroup('Input parameters');
    core.info(`Project: '${project}'`);
    core.info(`Base:    '${base}'`);
    core.endGroup();

    core.startGroup('Getting Nx project info');
    const path = await nxUtils.findNxProjectPath();
    core.info(`Project path: ${path}`);
    core.endGroup();

    core.startGroup('Getting affected projects');
    const affectedProjects = await nxUtils.getAffectedNxProjects(path, base);
    core.endGroup();

    const isAffected = affectedProjects.includes(project);
    const message = isAffected
      ? `Project ${project} is affected`
      : `Project ${project} is not affected`;
    core.info(message);

    core.startGroup('Setting output variables');
    core.info(`is-affected:       '${isAffected}'`);
    core.info(`affected-projects: '${affectedProjects.join(',')}'`);
    core.setOutput('is-affected', isAffected);
    core.setOutput('affected-projects', affectedProjects.join(','));
    core.endGroup();
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.endGroup();
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();
