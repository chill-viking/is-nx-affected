import * as fs from 'fs';
import * as path from 'path';
import { findFile } from '../../src/utils/find-file';

jest.mock('fs');
jest.mock('path');

describe('findFile', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('when file is found', () => {
    it('should return the folder', () => {
      const readdirSyncMock = jest
        .mocked(fs.readdirSync)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(['package.json'] as any);
      const statSyncMock = jest
        .mocked(fs.statSync)
        .mockReturnValue({ isDirectory: () => false } as fs.Stats);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const joinMock = jest.mocked(path.join).mockReturnValue('./package.json');

      const result = findFile('./', 'package.json');

      expect(readdirSyncMock).toHaveReturned();
      expect(statSyncMock).toHaveReturned();
      expect(joinMock).toHaveReturned();
      expect(result).toEqual('./');
    });
  });

  describe('when file is not found', () => {
    it('should return undefined', () => {
      const readdirSyncMock = jest
        .mocked(fs.readdirSync)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue([] as any);

      const result = findFile('./', 'package.json');

      expect(readdirSyncMock).toHaveReturned();
      expect(result).toEqual(undefined);
    });
  });
});
