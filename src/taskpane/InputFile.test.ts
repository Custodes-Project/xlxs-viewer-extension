import { InputFile } from "./InputFile";

describe("InputFile", () => {

  test("starts with no file selected", () => {
    const input = document.createElement("input");
    input.type = "file";

    const inputFile = new InputFile(input);

    expect(inputFile.getFile()).toBeNull();
  });

  test("updates when file is selected", () => {
    const input = document.createElement("input");
    input.type = "file";

    const inputFile = new InputFile(input);

    const file = new File(["data"], "test.txt");

    // Mock the files property (read-only normally)
    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });

    // Trigger change event
    input.dispatchEvent(new Event("change"));

    expect(inputFile.getFile()).toBe(file);
  });

  test("clear resets file", () => {
    const input = document.createElement("input");
    input.type = "file";

    const inputFile = new InputFile(input);

    const file = new File(["data"], "test.txt");

    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });

    input.dispatchEvent(new Event("change"));

    inputFile.clear();

    expect(inputFile.getFile()).toBeNull();
  });
});