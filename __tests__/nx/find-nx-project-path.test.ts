import * as fut from '../../src/nx/find-nx-project-path';
import { findFile } from '../../src/utils/find-file';

jest.mock('../../src/utils/find-file');
const findFileMock = jest.mocked(findFile);
const findNxProjectPathMock = jest.spyOn(fut, 'findNxProjectPath');

describe('findNxProjectPath', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when findFile returns a path', () => {
    it('should return the path', async () => {
      findFileMock.mockReturnValue('./');

      const result = await fut.findNxProjectPath();

      expect(findNxProjectPathMock).toHaveReturned();
      expect(result).toEqual('./');
    });
  });

  describe('when findFile returns undefined', () => {
    it('should throw error', async () => {
      findFileMock.mockReturnValue(undefined);

      await expect(fut.findNxProjectPath()).rejects.toThrow();
    });
  });
});
