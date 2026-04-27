// InputFile is responsible for handling a file input element
// and tracking the currently selected file from the UI
export class InputFile {
  // Reference to the HTML file input element
  private input: HTMLInputElement;

  // Stores the currently selected file, or null if none selected
  private selectedFile: File | null = null;

  // Constructor accepts the file input element and sets up listeners
  constructor(input: HTMLInputElement) {
    this.input = input;

    // Attach change event listener to track file selection
    this.attachListeners();
  }

  // Adds event listeners to the input element
  private attachListeners() {
    // Listen for user selecting a file
    this.input.addEventListener("change", () => {

      // If no files are selected, clear the stored file
      if (!this.input.files || this.input.files.length === 0) {
        this.selectedFile = null;
        return;
      }

      // Store the first selected file
      this.selectedFile = this.input.files[0];
    });
  }

  // Returns the currently selected file (or null if none)
  public getFile(): File | null {
    return this.selectedFile;
  }

  // Clears the input element and resets stored file state
  public clear() {
    // Reset the HTML input value
    this.input.value = "";

    // Clear the stored file reference
    this.selectedFile = null;
  }
}