import { findFile } from '../utils/find-file';

export async function findNxProjectPath(): Promise<string> {
  const path = findFile('./', 'nx.json');
  if (!path)
    throw new Error('Failed to find Nx Workspace, searched for "nx.json"');
  return path;
}
