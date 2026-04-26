/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global console, document, Excel, Office */

/// <reference types="office-js" />

Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
  }
});

export async function run() {
  try {
    await Excel.run(async (context) => {
      /**
       * Insert your Excel code here
       */
      const range = context.workbook.getSelectedRange();

      // Read the range address
      range.load("address");

      // Update the fill color
      range.format.fill.color = "yellow";

      await context.sync();
      console.log(`The range address was ${range.address}.`);
    });
  } catch (error) {
    console.error(error);
  }
}

// Import UI file selector component (handles HTML input element and file selection)
import { InputFile } from "./InputFile";

// Import container that stores the currently selected file for the viewer
import { ContainerFile } from "./ContainerFile";

import {TargetFile } from "./TargetFile"

// Declare references that will be initialized once Office is ready
let inputFile: InputFile;
let containerFile: ContainerFile;
let targetFile: TargetFile;

// Office.onReady ensures the Office add-in environment is fully loaded
Office.onReady(() => {

  // Get the file input element from the taskpane HTML
  const inputElement = document.getElementById("file-input") as HTMLInputElement;

  // Initialize InputFile to manage user file selection
  inputFile = new InputFile(inputElement);

  // Initialize ContainerFile to store selected file state
  containerFile = new ContainerFile();

  // Initialize TargetFile to represent active files
  targetFile = new TargetFile();

  // Listen for changes to the file input (user selects a file)
  inputElement.addEventListener("change", () => {

    // Retrieve the selected file from InputFile component
    const file = inputFile.getFile();

    // Store the selected file in ContainerFile for later use by viewer logic
    containerFile.setFile(file);
  });
});