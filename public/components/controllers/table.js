export async function renderTable(arrayTable, currentPage, recordsPerPage) {
    /*indexes */
    const startIndex = (currentPage - 1) * recordsPerPage;
    const finalIndex = startIndex + recordsPerPage;
    const paginatedData = arrayTable.slice(startIndex, finalIndex);
    /*column names from the first row if are avaliable */
    const columNames = arrayTable.length > 0 ? Object.keys(arrayTable[0]) : [];
    return `
    <table class = "table table-stripped>"
    <thead>
        ${columNames
        .map((value) => `
            <th scope="col">${value}`)
        .join("")}</th>
    </thead>
    <tbody>
    ${paginatedData
        .map((row) => `
        <tr>
        ${columNames
        .map((columnName) => `
        <td>
        ${row[columnName] || ``}
        </td>`)
        .join("")}
        </tr>`)
        .join("")}
    </tbody>
    </table>`;
}
