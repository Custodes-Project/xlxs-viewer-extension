import * as XLSX from "xlsx";

export type UserRole = "administrator" | "privileged user" | "user" | "guest";

const accessMatrix: Record<UserRole, string[]> = {
  administrator: ["Sheet1", "Sheet2", "Sheet3", "Sheet4", "Sheet5"],
  "privileged user": ["Sheet1", "Sheet2", "Sheet3"],
  user: ["Sheet1", "Sheet2"],
  guest: ["Sheet1"]
};

// Handles reading a file and writing only authorized sheets into Excel
export async function openSelectedFileInExcel(file: File, role: UserRole) {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer, { type: "array" });

  const allowedSheets = accessMatrix[role];

  await Excel.run(async (context) => {
    for (const sheetName of workbook.SheetNames) {
      if (!allowedSheets.includes(sheetName)) {
        console.log(`Skipping unauthorized sheet: ${sheetName}`);
        continue;
      }

      const sourceSheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json(sourceSheet, {
        header: 1,
      }) as unknown[][];

      if (rows.length === 0) continue;

      const worksheet = context.workbook.worksheets.add(sheetName);

      const rowCount = rows.length;
      const colCount = Math.max(...rows.map((row) => row.length));

      const normalizedRows = rows.map((row) => {
        while (row.length < colCount) row.push("");
        return row;
      });

      const range = worksheet.getRangeByIndexes(0, 0, rowCount, colCount);
      range.values = normalizedRows;
    }

    await context.sync();
  });
}