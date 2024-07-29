import { DataRow, DataTable, ColumName } from "./models.js"; // importar models

export class FileController {
  private data: DataTable = [];
  private columNames: ColumName = [];

  constructor(private fileContent: string) {
    this.processFile();
  }

  private processFile() {
    const lines = this.fileContent
      .split(/[\r\n]+/)
      .filter((line) => line.trim() !== "");
    if (lines.length > 0) {
      this.columNames = lines[0].split(",");
      this.data = lines.slice(1).map((lines) => {
        const values = lines.split(",");
        const row: DataRow = {};
        this.columNames.forEach((colName, index) => {
          row[colName] = values[index] || "";
        });
        return row;
      });
    }
  }
  getData(): DataTable {
    return this.data;
  }
  getColumNames(): ColumName {
    return this.columNames;
  }
}
