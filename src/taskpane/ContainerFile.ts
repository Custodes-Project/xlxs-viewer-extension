export class ContainerFile {
  private file: File | null = null;

  constructor(file?: File) {
    if (file) {
      this.file = file;
    }
  }

  public setFile(file: File | null) {
    this.file = file;
  }

  public getFile(): File | null {
    return this.file;
  }

  public hasFile(): boolean {
    return this.file !== null;
  }

  public clear() {
    this.file = null;
  }
}