export class InputFile {
  private input: HTMLInputElement;
  private selectedFile: File | null = null;

  constructor(input: HTMLInputElement) {
    this.input = input;
    this.attachListeners();
  }

  private attachListeners() {
    this.input.addEventListener("change", () => {
      if (!this.input.files || this.input.files.length === 0) {
        this.selectedFile = null;
        return;
      }

      this.selectedFile = this.input.files[0];
    });
  }

  public getFile(): File | null {
    return this.selectedFile;
  }

  public clear() {
    this.input.value = "";
    this.selectedFile = null;
  }
}