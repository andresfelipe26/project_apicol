import { DataTable } from "../models/models.js";

export function filterData(
  arrayTable: DataTable,
  searchTerm: string
): DataTable {
  if (!searchTerm) return arrayTable;
  const lowerCaseTerm = searchTerm.toLowerCase();
  return arrayTable.filter((row) =>
    Object.values(row).some((cell) => {
      if (cell == null) return false;
      return cell.toString().toLowerCase().includes(lowerCaseTerm);
    })
  );
}
