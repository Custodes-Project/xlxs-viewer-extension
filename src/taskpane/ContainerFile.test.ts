import { ContainerFile } from "./ContainerFile";

describe("ContainerFile", () => {

  test("starts empty", () => {
    const container = new ContainerFile();

    expect(container.getFile()).toBeNull();
    expect(container.hasFile()).toBe(false);
  });

  test("stores file", () => {
    const container = new ContainerFile();
    const file = new File(["data"], "test.txt");

    container.setFile(file);

    expect(container.getFile()).toBe(file);
    expect(container.hasFile()).toBe(true);
  });

  test("clear removes file", () => {
    const container = new ContainerFile();
    const file = new File(["data"], "test.txt");

    container.setFile(file);
    container.clear();

    expect(container.getFile()).toBeNull();
    expect(container.hasFile()).toBe(false);
  });

  test("constructor sets file", () => {
    const file = new File(["data"], "test.txt");
    const container = new ContainerFile(file);

    expect(container.getFile()).toBe(file);
    expect(container.hasFile()).toBe(true);
  });
});