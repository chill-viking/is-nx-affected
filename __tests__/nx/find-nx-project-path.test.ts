import * as fut from "../../src/nx/find-nx-project-path";

const findNxProjectPathMock = jest.spyOn(fut, 'findNxProjectPath');

describe('findNxProjectPath', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the path', async () => {
    const result = await fut.findNxProjectPath();

    expect(findNxProjectPathMock).toHaveReturned();
    expect(result).toEqual('./');
  });
});
