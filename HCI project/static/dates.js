// Function to convert table data to Excel worksheet
function tableToExcel(table) {
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'CompetitionDetails');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'CompetitionDetails.xlsx');
}

// Add event listener to the download button once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('downloadButton');
    downloadBtn.addEventListener('click', () => {
        const table = document.querySelector('table');
        tableToExcel(table);
    });
});
