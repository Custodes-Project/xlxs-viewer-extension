import { AppState } from "./AppState";
import { ContainerFile } from "./ContainerFile";
import { TargetFile } from "./TargetFile";

describe("AppState", () => {

  test("initial state is empty", () => {
    const state = new AppState();

    expect(state.getContainerFile()).toBeNull();
    expect(state.getTargetFile()).toBeNull();
    expect(state.isFileLoaded()).toBe(false);
  });

  test("setContainerFile updates state", () => {
    const state = new AppState();
    const container = new ContainerFile();

    state.setContainerFile(container);

    expect(state.getContainerFile()).toBe(container);
    expect(state.isFileLoaded()).toBe(true);
  });

  test("setTargetFile updates state", () => {
    const state = new AppState();
    const target = new TargetFile();

    state.setTargetFile(target);

    expect(state.getTargetFile()).toBe(target);
  });

  test("clear resets everything", () => {
    const state = new AppState();

    state.setContainerFile(new ContainerFile());
    state.setTargetFile(new TargetFile());

    state.clear();

    expect(state.getContainerFile()).toBeNull();
    expect(state.getTargetFile()).toBeNull();
    expect(state.isFileLoaded()).toBe(false);
  });
});