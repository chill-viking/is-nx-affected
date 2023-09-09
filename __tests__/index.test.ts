/**
 * Unit tests for the action's entrypoint, src/index.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */
import mocked = jest.mocked;

import * as core from '@actions/core';
import * as index from '../src/index';
import { findNxProjectPath, getAffectedNxProjects } from '../src/nx';

// Mock the GitHub Actions core library
const getInputMock = jest.spyOn(core, 'getInput');
const setFailedMock = jest.spyOn(core, 'setFailed');
const setOutputMock = jest.spyOn(core, 'setOutput');

// Mock the action's entrypoint
const runMock = jest.spyOn(index, 'run');

// Mock the action's internal functions
jest.mock('../src/nx/find-nx-project-path');
jest.mock('../src/nx/get-affected-nx-projects');

const findNxProjectPathMock = mocked(findNxProjectPath);
const getAffectedProjectsMock = mocked(getAffectedNxProjects);

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when nx project path is found', () => {
    beforeEach(() => {
      // Set the action's inputs as return values from core.getInput()
      getInputMock.mockImplementation((name: string): string => {
        switch (name) {
          case 'project':
            return 'project-name';
          case 'base':
            return 'main';
          default:
            return '';
        }
      });
      findNxProjectPathMock.mockResolvedValue('./');
    });

    it('should execute as expected', async () => {
      getAffectedProjectsMock.mockResolvedValue(['project-name', 'lib-name']);

      await index.run();

      expect(runMock).toHaveReturned();
      expect(findNxProjectPathMock).toHaveReturned();
      expect(getAffectedProjectsMock).toHaveBeenCalledWith('./', 'main');
      expect(setOutputMock).toHaveBeenCalledWith('is-affected', true);
      expect(setOutputMock).toHaveBeenCalledWith(
        'affected-projects',
        'project-name,lib-name',
      );
    });

    describe('when project is not affected', () => {
      it('should set isAffected to false', async () => {
        getAffectedProjectsMock.mockResolvedValue(['lib-name']);

        await index.run();

        expect(setOutputMock).toHaveBeenCalledWith('is-affected', false);
        expect(setOutputMock).toHaveBeenCalledWith(
          'affected-projects',
          'lib-name',
        );
      });
    });

    describe('when getAffectedNxProjects fails', () => {
      it('should set a failed status', async () => {
        getAffectedProjectsMock.mockRejectedValue(
          new Error('Failed to get affected projects'),
        );

        await index.run();

        expect(runMock).toHaveReturned();
        expect(findNxProjectPathMock).toHaveReturned();
        expect(setFailedMock).toHaveBeenCalledWith(
          'Failed to get affected projects',
        );
      });
    });
  });

  describe('when nx project path is not found', () => {
    beforeEach(() => {
      // Set the action's inputs as return values from core.getInput()
      getInputMock.mockImplementation((name: string): string => {
        switch (name) {
          case 'project':
            return 'project-name';
          case 'base':
            return 'main';
          default:
            return '';
        }
      });
      findNxProjectPathMock.mockRejectedValue(new Error('Failed to find Nx'));
    });

    it('should set a failed status', async () => {
      await index.run();

      expect(runMock).toHaveReturned();
      expect(findNxProjectPathMock).toHaveReturned();
      expect(setFailedMock).toHaveBeenCalledWith('Failed to find Nx');
    });
  });

  it('sets a failed status', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((): string => {
      throw new Error('Failed');
    });

    await index.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(1, 'Failed');
  });
});
