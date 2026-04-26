// TargetFile represents the file that will be actively used by the viewer.
// This may be the same as the input file initially, but allows future
// transformations (parsed data, processed output, etc.) to be stored separately.
export class TargetFile {

  // Holds the active target file, or null if none is set
  private file: File | null = null;

  // Optional constructor allows initialization with an existing file
  constructor(file?: File) {
    if (file) {
      this.file = file;
    }
  }

  // Sets the target file
  public setFile(file: File | null) {
    this.file = file;
  }

  // Returns the current target file
  public getFile(): File | null {
    return this.file;
  }

  // Indicates whether a target file has been set
  public hasFile(): boolean {
    return this.file !== null;
  }

  // Clears the stored target file
  public clear() {
    this.file = null;
  }
}