// AppState acts as the central store for the application's state.
// It keeps track of both the raw input file (ContainerFile)
// and the active/target file (TargetFile).
import { ContainerFile } from "./ContainerFile";
import { TargetFile } from "./TargetFile";

export class AppState {

  // Holds the container for the raw input file (encrypted SDC file)
  private containerFile: ContainerFile | null = null;

  // Holds the active/target file (may later represent processed/decrypted data)
  private targetFile: TargetFile | null = null;

  // Indicates whether a file has been loaded into the application
  private hasFile: boolean = false;

  // Sets the container file and updates loaded state
  public setContainerFile(container: ContainerFile | null) {
    this.containerFile = container;
    this.hasFile = container !== null;
  }

  // Returns the container file
  public getContainerFile(): ContainerFile | null {
    return this.containerFile;
  }

  // Sets the target file
  public setTargetFile(target: TargetFile | null) {
    this.targetFile = target;
  }

  // Returns the target file
  public getTargetFile(): TargetFile | null {
    return this.targetFile;
  }

  // Returns whether a file is currently loaded
  public isFileLoaded(): boolean {
    return this.hasFile;
  }

  // Clears all stored state
  public clear() {
    this.containerFile = null;
    this.targetFile = null;
    this.hasFile = false;
  }
}