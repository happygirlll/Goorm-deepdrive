const spreadSheetContainer =
    document.querySelector("#spreadsheet-container");

// 엑셀시트 export 기능 생성하기
const exportBtn = document.querySelector("#export-btn");

const ROWS = 10
const COLS = 10
const spreadsheet = []
const alphabets = [
    "A", "B", "C", "D", "E", "F", "G", 
    "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U",
    "V", "W", "X", "Y", "Z"]

// 문자열이 아닌 객체 데이터 생성하기
class Cell {
    constructor(isHeader, disabled, data, row, column,rowName, columnName, active=false){
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.rowName = rowName;
        this.column = column;
        this.columnName = columnName;
        this.active = active;
    }
}

exportBtn.onclick = function(e) {
    let csv = "";
    for (let i = 0; i <spreadsheet.length; i++) {
        if(i === 0) continue;
        csv +=
            spreadsheet[i]
                .filter(item => !item.isHeader)
                .map(item => item.data)
                .join(',') +"\r\n";
    }
    //console.log('csv: ', csv);

    //엑셀 파일 다운로드
    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    console.log("csv", csvUrl);

    const a = document.createElement("a");
    a.href = csvUrl;
    a.download = "spreadsheet File Name.csv";
    a.click();
}

initSpreadSheet();

//기본 데이터 생성하기
function initSpreadSheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadsheetRow = [];
        for(let j = 0; j < COLS; j++) {
            let cellData = "";
            let isHeader = false;
            let disabled = false;

            //모든 row 첫번째 컬럼에 숫자 넣기
            if (j===0){
                cellData = i;
                isHeader = true; // 첫번째 row는 header
                disabled = true; // header cell은 disabled
            }
            
            //모든 column에 값 넣기
            if (i === 0) {
                isHeader = true; // 첫번째 column도 header 
                cellData = alphabets[j-1];
                disabled = true; // header cell은 disabled
            }

            //cellData가 null, undefined이면 ""
            if(!cellData){
                cellData = "";
            }

            //첫번째 row의 컬럼은 "";
            if(cellData <= 0){
                cellData = "";
            }

            //rowName, columnName추가
            const rowName = i;
            const columnName = alphabets[j-1];

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName,false);
            spreadsheetRow.push(cell);
        }
        spreadsheet.push(spreadsheetRow);
    }
    drawSheet();
    //console.log(spreadsheet);
}

/* cell 생성하기 */
function createCellEl(cell) {
    const cellEl = document.createElement('input');
    cellEl.className = 'cell';
    cellEl.id = 'cell_' + cell.row + cell.column;
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;

    if (cell.isHeader){
        cellEl.classList.add('header');
    }
    cellEl.onclick = () => handleCellClick(cell);
    cellEl.onchange = (e) => handleOnChange(e.target.value, cell);

    return cellEl;
}

// 셀에 넣은 값으로 변경
function handleOnChange(data, cell){
    cell.data = data;
}

/* 셀 클릭 시 하이라이트 생기게 함 */
function handleCellClick(cell) {
    clearHeaderActiveStates();
    const columnHeader = spreadsheet[0][cell.column];
    const rowHeader = spreadsheet[cell.row][0];
    const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
    //console.log('clicked cell', columnHeaderEl, rowHeaderEl);
    columnHeaderEl.classList.add("active");
    rowHeaderEl.classList.add("active");
    document.querySelector("#cell-status").innnerHTML = cell.columnName + "" + cell.rowName;
}

function getElFromRowCol(row, col) {
    return document.querySelector("#cell_" + row + col);
}

/* 이전의 하이라이트 된 부분 지워주기 */
function clearHeaderActiveStates(){
    const headers = document.querySelectorAll(".header");

    headers.forEach(header => {
        header.classList.remove("active");
    });
}
/* cell 렌더링하기 
 10개 셀을 하나의 row div로 감싸기 */
function drawSheet() {
    for(let i=0; i<spreadsheet.length; i++) {
        const rowContainerEl = document.createElement('div');
        rowContainerEl.className = 'cell-row';

        for(let j=0; j<spreadsheet[i].length; j++) {
            const cell = spreadsheet[i][j];
            spreadSheetContainer.append(createCellEl(cell));
        }
        spreadSheetContainer.append(rowContainerEl);
    }
}


