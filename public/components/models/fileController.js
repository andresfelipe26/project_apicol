export class FileController {
    constructor(fileContent) {
        this.fileContent = fileContent;
        this.data = [];
        this.columNames = [];
        this.processFile();
    }
    processFile() {
        const lines = this.fileContent
            .split(/[\r\n]+/)
            .filter((line) => line.trim() !== "");
        if (lines.length > 0) {
            this.columNames = lines[0].split(",");
            this.data = lines.slice(1).map((lines) => {
                const values = lines.split(",");
                const row = {};
                this.columNames.forEach((colName, index) => {
                    row[colName] = values[index] || "";
                });
                return row;
            });
        }
    }
    getData() {
        return this.data;
    }
    getColumNames() {
        return this.columNames;
    }
}
