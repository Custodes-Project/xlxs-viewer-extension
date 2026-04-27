import { TargetFile } from "./TargetFile";

describe("TargetFile", () => {

  test("starts empty", () => {
    const target = new TargetFile();

    expect(target.getFile()).toBeNull();
    expect(target.hasFile()).toBe(false);
  });

  test("stores file", () => {
    const target = new TargetFile();
    const file = new File(["data"], "test.txt");

    target.setFile(file);

    expect(target.getFile()).toBe(file);
    expect(target.hasFile()).toBe(true);
  });

  test("clear removes file", () => {
    const target = new TargetFile();
    const file = new File(["data"], "test.txt");

    target.setFile(file);
    target.clear();

    expect(target.getFile()).toBeNull();
    expect(target.hasFile()).toBe(false);
  });

  test("constructor sets file", () => {
    const file = new File(["data"], "test.txt");
    const target = new TargetFile(file);

    expect(target.getFile()).toBe(file);
  });
});