// ContainerFile stores the selected file independently of the UI.
// This allows viewer logic to access file state without depending on DOM elements.
export class ContainerFile {

  // Holds the currently loaded file, or null if none
  private file: File | null = null;

  // Optional constructor allowing initialization with a file
  constructor(file?: File) {
    if (file) {
      this.file = file;
    }
  }

  // Sets or replaces the stored file
  public setFile(file: File | null) {
    this.file = file;
  }

  // Returns the stored file
  public getFile(): File | null {
    return this.file;
  }

  // Indicates whether a file is currently stored
  public hasFile(): boolean {
    return this.file !== null;
  }

  // Clears the stored file
  public clear() {
    this.file = null;
  }
}