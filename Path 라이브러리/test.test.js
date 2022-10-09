const Path = require("./main");

const path = new Path("/home/user/boost/camp/challenge/day11/problem.md");
const path1 = new Path("/first/second/last/param");
describe("path", () => {
  test("Append Component", () => {
    expect(path.appendComponent("base")).toBe("/home/user/boost/camp/challenge/day11/base/problem.md");
    expect(path.appendComponent("camp")).toBe("/home/user/boost/camp/challenge/day11/base/camp/problem.md");
    expect(path.appendComponent("왕승재")).toBe("/home/user/boost/camp/challenge/day11/base/camp/왕승재/problem.md");
  });
  test("Delete Component", () => {
    expect(path.deleteLastComponent()).toBe("/home/user/boost/camp/challenge/day11/base/camp/problem.md");
    expect(path.deleteLastComponent()).toBe("/home/user/boost/camp/challenge/day11/base/problem.md");
    expect(path.deleteLastComponent()).toBe("/home/user/boost/camp/challenge/day11/problem.md");
  });
  test("Relative", () => {
    expect(path1.relative("/first/second/most/jk")).toBe("../../most/jk");
    expect(path1.relative("/second/most/jk")).toBe("../../../../second/most/jk");
    expect(path1.relative("/first/thrid/most/jk")).toBe("../../../thrid/most/jk");
    expect(path1.relative("/first/second/last/jk")).toBe("../jk");
  });
});
