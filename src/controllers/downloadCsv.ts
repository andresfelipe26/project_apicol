import { DataRow, ColumName } from "../models/models.js";

export async function convertCsv(
  data: DataRow[],
  columNames: ColumName
): Promise<string> {
  const csvRows = [];
  /*add headers */
  csvRows.push(columNames.join(","));
  /*add data rows*/
  data.forEach((rows) => {
    const values = columNames.map((column) => rows[column] || "");
    csvRows.push(values.join(""));
  });
  return csvRows.join("\n");
}

export async function downloadCSV(csvContent: string, fileName: string) {
  /*blob */
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  /*link */
  const link = document.createElement("a");
  /*url */
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  /*add html */
  document.body.appendChild(link);
  /*trigger */
  link.click();
  /*remove from html */
  document.body.removeChild(link);
}
