import * as core from '@actions/core';
import * as nxUtils from './nx';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const project: string = core.getInput('project');
    const base: string = core.getInput('base');

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Project: ${project}`);
    core.debug(`Base:    ${base}`);

    // Run the command
    const path = await nxUtils.findNxProjectPath();
    const affectedProjects = await nxUtils.getAffectedNxProjects(path, base);
    const isAffected = affectedProjects.includes(project);

    // Set outputs for other workflow steps to use
    core.setOutput('is-affected', isAffected);
    core.setOutput('affected-projects', affectedProjects.join(','));
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();
