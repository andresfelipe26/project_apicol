import { FileController } from "./models/fileController.js";
import { renderTable } from "./controllers/table.js";
import { filterData } from "./controllers/filter.js";
import { convertCsv, downloadCSV } from "./controllers/downloadCsv.js";
const csvForm = document.getElementById("csvForm");
const csvFile = document.getElementById("csvFile");
const searchInput = document.getElementById("searchInput");
const downloadButton = (document.getElementById("downloadCSV"));
const displayArea = document.getElementById("displayArea");
const paginationHTML = document.getElementById("paginationControls");
const recordsPerPage = 15;
let currentPage = 1;
let finalValues = [];
let columNames = [];
function pagination(totalRecords, currentPage, recordsPerPage) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const maxButtons = 10;
    let paginationHTML = '<ul class="pagination">';
    // Start
    if (currentPage > 1) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="1" href="#">Start</a></li>`;
    }
    // Previous
    if (currentPage > 1) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${currentPage - 1}" href="#">Previous</a></li>`;
    }
    // Buttons number
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let finalPage = Math.min(totalPages, currentPage + Math.floor(maxButtons / 2));
    for (let i = startPage; i <= finalPage; i++) {
        paginationHTML += `<li class="page-item ${i === currentPage ? "active" : ""}">
            <a class="page-link" data-page="${i}" href="#">${i}</a>
        </li>`;
    }
    // Next
    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${currentPage + 1}" href="#">Next</a></li>`;
    }
    // Final
    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${totalPages}" href="#">End</a></li>`;
    }
    paginationHTML += "</ul>";
    return paginationHTML;
}
document.addEventListener("DOMContentLoaded", () => {
    csvForm.addEventListener("submit", async (e) => {
        var _a;
        e.preventDefault();
        const csvReader = new FileReader();
        const input = csvFile.files[0];
        const fileName = input.name;
        const fileExtension = (_a = fileName.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (fileExtension !== "csv" && fileExtension) {
            alert("Please select a CSV or txt file");
            return;
        }
        csvReader.onload = async function (evt) {
            var _a;
            const text = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.result;
            const fileController = new FileController(text);
            finalValues = fileController.getData();
            columNames = fileController.getColumNames();
            await renderTableControls();
        };
        csvReader.readAsText(input);
    });
    downloadButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const filteredValues = filterData(finalValues, searchInput.value);
        const csvData = await convertCsv(filteredValues, columNames);
        await downloadCSV(csvData, "filtered_data.csv");
    });
    searchInput.addEventListener("input", async () => {
        await renderTableControls();
    });
});
async function renderTableControls() {
    const searchTerm = searchInput.value;
    const filteredValues = filterData(finalValues, searchTerm);
    const tableHTML = await renderTable(filteredValues, currentPage, recordsPerPage);
    displayArea.innerHTML = tableHTML;
    const paginationControls = pagination(filteredValues.length, currentPage, recordsPerPage);
    paginationHTML.innerHTML = paginationControls;
    document.querySelectorAll(".page-link").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const targetPage = Number(e.target.dataset.page);
            if (targetPage) {
                currentPage = targetPage;
                renderTableControls();
            }
        });
    });
}
