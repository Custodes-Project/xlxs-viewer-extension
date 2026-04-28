/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global console, document, Excel, Office */

/// <reference types="office-js" />

// Import UI file selector component (handles HTML input element and file selection)
import { InputFile } from "./InputFile";

// Import container that stores the currently selected file for the viewer
import { ContainerFile } from "./ContainerFile";

// Import target file representation for the active viewer file
import { TargetFile } from "./TargetFile";

// Declare references that will be initialized once Office is ready
let configInputFile: InputFile;
let dataInputFile: InputFile;
let containerFile: ContainerFile;
let targetFile: TargetFile;

// Office.onReady ensures the Office add-in environment is fully loaded
Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    const sideloadMsg = document.getElementById("sideload-msg");
    const appBody = document.getElementById("app-body");
    const runButton = document.getElementById("run");

    if (sideloadMsg) {
      sideloadMsg.style.display = "none";
    }

    if (appBody) {
      appBody.style.display = "flex";
    }

    if (runButton) {
      runButton.onclick = run;
    }

    // Get configuration file UI elements from taskpane.html
    const configButton = document.getElementById("config-button") as HTMLButtonElement | null;
    const configInput = document.getElementById("config-input") as HTMLInputElement | null;
    const configDisplay = document.getElementById("file-name-display");

    // Get data file UI elements from taskpane.html
    const dataButton = document.getElementById("data-button") as HTMLButtonElement | null;
    const dataInput = document.getElementById("data-input") as HTMLInputElement | null;
    const dataDisplay = document.getElementById("data-file-name-display");

    // Stop setup if required file selection elements are missing
    if (!configButton || !configInput || !configDisplay || !dataButton || !dataInput || !dataDisplay) {
      console.error("One or more file selection elements were not found in taskpane.html");
      return;
    }

    // Initialize InputFile instances to manage file selection
    configInputFile = new InputFile(configInput);
    dataInputFile = new InputFile(dataInput);

    // Initialize ContainerFile to store selected data file state
    containerFile = new ContainerFile();

    // Initialize TargetFile to represent the active viewer file
    targetFile = new TargetFile();

    // When the visible config button is clicked, open the hidden config file input
    configButton.addEventListener("click", () => {
      configInput.click();
    });

    // When the visible data button is clicked, open the hidden data file input
    dataButton.addEventListener("click", () => {
      dataInput.click();
    });

    // Listen for configuration file selection
    configInput.addEventListener("change", () => {
      const file = configInputFile.getFile();

      if (file) {
        configDisplay.textContent = file.name;
      } else {
        configDisplay.textContent = "No file selected";
      }
    });

    // Listen for data file selection
    dataInput.addEventListener("change", () => {
      const file = dataInputFile.getFile();

      // Store the selected file in ContainerFile for later use by viewer logic
      containerFile.setFile(file);

      // Store the selected file as the active target file
      targetFile.setFile(file);

      if (file) {
        dataDisplay.textContent = file.name;
      } else {
        dataDisplay.textContent = "No file selected";
      }
    });
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