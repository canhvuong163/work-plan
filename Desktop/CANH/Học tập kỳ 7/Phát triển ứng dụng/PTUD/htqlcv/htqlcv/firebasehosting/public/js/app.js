// init draggable
var droppable = new Draggable.Droppable(document.querySelectorAll('.container'), {
  draggable: '.draggable',
  dropzone: '.dropzone',
  mirror: { constrainDimensions: true },
});

var mouseDown = false;
var clickInterval = null;
var isDragging = false;

droppable.on('droppable:start', () => {
  isDragging = true;

  if (!mouseDown) {
    mouseDown = true;

    clickInterval = setInterval(() => {
      mouseDown = false;
      clearInterval(clickInterval);
    }, 250);
  }
});

// hide all modal
function hideAllModal() {
  let listModal = document.querySelectorAll('.modal__container');

  listModal.forEach(modal => {
    modal.style.display = "none";
  });
}

droppable.on('droppable:stop', (e) => {
  setTimeout(() => {
    window.writeDB(window.projectId, allTable2Data());
  }, 500);
  isDragging = false;

  if (mouseDown) {
    // setTimeout(() => {
    mouseDown = false;
    // }, 50);
    clearInterval(clickInterval);
  }

  if (isAdding) {
    refreshToolbar();
    isAdding = false;
  }
});

// show table item options
var selectedTData = null;

function showItemOptions(event) {
  selectedTData = event;

  if (!event.querySelector('.table__item')) return;
  let options = selectedTData.querySelector('.dropdown__body');
  options.style.display = options.style.display == "none" ? "block" : "none";
}

// add a table
var tableNumber = 1;

function addTable(tableName = 'Nội dung kế hoạch công việc') {
  tableNumber++;

  let listTable = document.querySelector('section.container');
  listTable.innerHTML += `
  <!-- table -->
  <div class="table" id="table-${tableNumber}">
    <!-- table title + button menu -->
    <div class="table__title">
      <h3>${tableName}</h3>
    </div>

    <!-- table row -->
    <div class="table__row">
      <!-- column -->
      <div class="table__data table__data--head" style="order: 0">
        <div class="table__item" style="background-color: var(--info-color);">
          <div class="table__item__icon">
            <img src="./images/b-noi-dung-cong-viec.svg" alt="noi-dung-cong-viec">
          </div>
          <div class="table__item__description">
            <h3>Nội dung <br> công việc</h3>
            <h6></h6>
          </div>
        </div>
      </div>

      <div class="table__data dropzone" style="order:1">
      </div>

      <!-- column -->
      <div class="table__data table__data--head" style="order: 0">
        <div class="table__item" style="background-color: var(--info-color);">
          <div class="table__item__icon">
            <img src="./images/b-con-nguoi-thuc-hien.svg" alt="nguoi-thuc-hien">
          </div>
          <div class="table__item__description">
            <h3>Người <br> thực hiện</h3>
            <h6></h6>
          </div>
        </div>
      </div>

      <div class="table__data dropzone" style="order:1"></div>

      <!-- column -->
      <div class="table__data table__data--head" style="order: 0">
        <div class="table__item" style="background-color: var(--success-color);">
          <div class="table__item__icon">
            <img src="./images/b-thoi-gian-thuc-hien.svg" alt="thoi-gian-hoan-thanh">
          </div>
          <div class="table__item__description">
            <h3>Thời gian<br>thực hiện</h3>
            <h6></h6>
          </div>
        </div>
      </div>

      <div class="table__data dropzone" style="order:1"></div>

      <!-- column -->
      <div class="table__data table__data--head" style="order: 0">
        <div class="table__item" style="background-color: var(--success-color);">
          <div class="table__item__icon">
            <img src="./images/b-tien-do-cong-viec.svg" alt="tien-do-cong-viec">
          </div>
          <div class="table__item__description">
            <h3>Tiến độ <br> công việc</h3>
            <h6></h6>
          </div>
        </div>
      </div>

      <div class="table__data dropzone" style="order:1"></div>
    </div>

    <div class="table__data table__data--button" onclick="selectedTableId = 'table-${tableNumber}'; addRow();">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
      </svg>
    </div>
  </div>`;

  selectedTableId = `table-${tableNumber}`;

  window.writeDB(window.projectId, allTable2Data());
}

// update table name
var selectedTableId = '';

function showUpdateTableTitle(tableId) {
  let tableHead = document.querySelector(`#${selectedTableId} .table__title h3`);
  document.getElementById('new-table-name').value = tableHead.innerHTML;

  showModal('modal-update-table-title');
}

function updateTableTitle() {
  let queryPath = `#${selectedTableId} .table__title h3`;
  let tableHead = document.querySelector(queryPath);
  tableHead.innerHTML = document.getElementById('new-table-name').value;
  hideModal('modal-update-table-title');
  window.writeDB(window.projectId, allTable2Data());
}

// show modal
function showModal(elementId) {
  let modal = document.getElementById(elementId);
  modal.style.display = "flex";
}

// hide modal
function hideModal(elementId) {
  let modal = document.getElementById(elementId);
  modal.style.display = "none";
}

// delete table
function removeTable(tableId) {
  document.getElementById(selectedTableId).remove();
  window.writeDB(window.projectId, allTable2Data());
}

// append a row
function addRow() {
  document.querySelector(`#${selectedTableId} .table__data--button`).remove(); // remove button first

  let queryPath = `#${selectedTableId} .table__data--head`;

  let tableHead = document.querySelectorAll(queryPath);
  let totalRow = document.querySelectorAll(`#${selectedTableId} .table__data`).length / 4;

  let newCell = `<div class="table__data dropzone" style="order: ${totalRow}"></div>`;

  tableHead.forEach((element, i) => {
    if (i > 0) {
      element.insertAdjacentHTML('beforeBegin', newCell);
    }
  });

  let tableData = document.querySelectorAll(`#${selectedTableId} .table__data`);
  tableData[tableData.length - 1].insertAdjacentHTML('afterEnd', newCell);

  // restore add row
  document.getElementById(selectedTableId).innerHTML += `
  <div class="table__data table__data--button" onclick="selectedTableId = '${selectedTableId}'; addRow();">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
    </svg>
  </div>`;

  window.writeDB(window.projectId, allTable2Data());
}

// pop a row
function removeLastRow() {
  document.querySelector(`#${selectedTableId} .table__data--button`).remove(); // remove button first

  let tableData = document.querySelectorAll(`#${selectedTableId} .table__data`);

  if (tableData.length < 9) return;

  tableData[tableData.length - 1].remove();

  let queryPath = `#${selectedTableId} .table__data--head`;
  let tableHead = document.querySelectorAll(queryPath);

  tableHead.forEach((element, i) => {
    if (i > 0) {
      element.previousElementSibling.remove();
    }
  });

  // restore add row
  document.getElementById(selectedTableId).innerHTML += `
  <div class="table__data table__data--button" onclick="selectedTableId = '${selectedTableId}'; addRow();">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
    </svg>
  </div>`;

  window.writeDB(window.projectId, allTable2Data());
}

// update table item description
function showModalUpdateDescription() {
  document.querySelector('#new-description').value = selectedTData.querySelector('.table__item__description').innerHTML;
  showModal('modal-update-description');
}
//Update Nguoi Thuc Hien--------------------------------------
function showModalUpdateInformation() {
  document.querySelector('#new-description1').value = selectedTData.querySelector('.table__item__description').innerHTML;
  showModal('modal-update-information');
}
//Update Thoi Gian Thuc Hien-------------------------------------
function showModalUpdateTime() {
  document.querySelector('#new-description2').value = selectedTData.querySelector('.table__item__description').innerHTML;
  showModal('modal-update-time');
}

function updateDescription() {
  const text = document.querySelector('#new-description').value
  selectedTData.querySelector('.table__item__description').innerHTML = text;
  hideModal('modal-update-description');
  window.writeDB(window.projectId, allTable2Data());
}
//TEST-----------------------------------------
function updateinformation() {
  const text = document.querySelector('#new-description1').value
  selectedTData.querySelector('.table__item__description').innerHTML = text;
  hideModal('modal-update-information');
  window.writeDB(window.projectId, allTable2Data());
}
//TEST2----------------------------------------
var today = new Date();
function updateTime() { 
  if(document.querySelector('.datepicker').value == "" || document.querySelector('.datepicker1').value == "")
  {
    alert("Ngày bắt đầu và ngày kết thúc không được để trống!!!");
  }
  else
  {
    
    const text = 'Ngày bắt đầu: ' + document.querySelector('.datepicker').value + '\n' +'Ngày kết thúc: '+ document.querySelector('.datepicker1').value;
    selectedTData.querySelector('.table__item__description').innerHTML = text;
  // selectedTData.querySelector('.table__item__description').innerHTML = document.querySelector('#datepicker').value;
  // selectedTData.querySelector('.table__item__description').innerHTML = document.querySelector('#datepicker1').value;
    hideModal('modal-update-time');
    window.writeDB(window.projectId, allTable2Data());
  }
  
}
// delete a table item
function deleteItem() {
  selectedTData.parentElement.classList.remove('draggable-dropzone--occupied');
  selectedTData.remove();
  selectedTData = null;
  window.writeDB(window.projectId, allTable2Data()); //
}

// export all table to pdf
function exportPDF() {
  let width = document.querySelector('section.container').clientWidth;
  let height = 1.41428571429 * width; // a4 ratio

  let element = document.querySelector('section.container');
  element.style.width = `${width}px`;

  let counter = 0;
  let lastHeight = 0;
  let tables = element.querySelectorAll('.table');

  tables.forEach((table, i) => {
    counter++;

    table.style.height = table.clientHeight;

    if (counter > 1 && i < tables.length - 1) {
      let spacer = document.createElement('div');
      spacer.classList.add('table-separator');
      spacer.style.width = `${width}px`;
      spacer.style.height = `calc(${height - table.clientHeight - lastHeight}px - 1em - 2.25em)`;

      table.insertAdjacentElement('afterend', spacer);

      counter = 0;
    }
    else {
      lastHeight = table.clientHeight;
    }
  });

  html2pdf().from(element).set({
    filename: 'lee-schedule-toolkit',
    image: { type: 'jpeg', quality: 1 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    html2canvas: {
      dpi: 200,
      scale: 1,
      width: width,
    },
  }).toPdf().get('pdf').then(pdf => {
    let tableSeparator = document.querySelectorAll('.table-separator');
    tableSeparator.forEach(element => {
      element.remove();
    });

    window.open(pdf.output('bloburl'), '_blank');
  });
}

// add items into toolbar
function refreshToolbar() {
  document.getElementById('toolbar').innerHTML = `
  <div class="dropzone">
    <div class="table__item draggable">
      <div class="table__item__icon">
        <img src="./images/a-trung-binh.svg" alt="a-trung-binh">
      </div>
      <div class="table__item__description"></div>
    </div>
  </div>

  <div class="dropzone">
    <div class="table__item draggable">
      <div class="table__item__icon">
        <img src="./images/a-khan-cap.svg" alt="a-khan-cap">
      </div>
      <div class="table__item__description"></div>
    </div>
  </div>

  <div class="dropzone">
    <div class="table__item draggable">
      <div class="table__item__icon">
        <img src="./images/a-quan-trong.svg" alt="a-quan-trong">
      </div>
      <div class="table__item__description"></div>
    </div>
  </div>

  <br>

  <div class="dropzone">
    <div class="table__item draggable">
      <div class="table__item__icon">
        <img src="./images/a-tre-hen.svg" alt="a-tre-hen">
      </div>
      <div class="table__item__description"></div>
    </div>
  </div>

  <div class="dropzone">
    <div class="table__item draggable">
      <div class="table__item__icon">
        <img src="./images/a-chua-bat-dau.svg" alt="a-chua-bat-dau">
      </div>
      <div class="table__item__description"></div>
    </div>
  </div>

  <div class="dropzone">
    <div class="table__item draggable">
      <div class="table__item__icon">
        <img src="./images/a-dang-thuc-hien.svg" alt="a-dang-thuc-hien">
      </div>
      <div class="table__item__description"></div>
    </div>
  </div>

  <div class="dropzone">
    <div class="table__item draggable">
      <div class="table__item__icon">
        <img src="./images/a-hoan-thanh.svg" alt="a-hoan-thanh">
      </div>
      <div class="table__item__description"></div>
    </div>
    </div>`;

  
}

isAdding = false;
// set flag to refresh toolbar items
document.getElementById('toolbar').addEventListener('mousedown', function (e) {
  isAdding = true;
});

document.getElementById('toolbar').addEventListener('touchstart', function (e) {
  isAdding = true;
});



//handle context menu with right click
var contextMenuItem = document.getElementById('context-menu--item');
var InputMenuItem = document.getElementById('input-menu--item')
var contextMenuTable = document.getElementById('context-menu--table');
var contextMenuTime = document.getElementById('input-menu--time');
var x = 0;
var y = 0;

document.addEventListener('mousedown', function (e) {
  if (e.target.id != 'project-shareable') console.log('err');
  if (e.target.classList.value != 'header__item dropdown__item') { e.target.click(); }
  
  if (e.button != 2) {
    contextMenuItem.style.display = 'none';
    contextMenuTable.style.display = 'none';
    InputMenuItem.style.display = 'none';
    contextMenuTime.style.display = 'none';
    return;
  }

  x = e.clientX;
  y = e.clientY;
  handleContextMenu(e);
});

function handleContextMenu(e) {
  if (e.target.classList.value == 'table__title' || e.target.classList.value.search(/table__data--head/) != -1) {
    setTimeout(() => {
      selectedTableId = e.target.parentElement.id == '' ? e.target.parentElement.parentElement.id : e.target.parentElement.id;

      if (contextMenuTable.style.display == 'none') {
        contextMenuTable.style.left = `${x}px`;
        contextMenuTable.style.top = `${y}px`;
        contextMenuTable.style.display = 'block';
      }
      else {
        contextMenuTable.style.display = 'none';
      }

      return;
    }, 50);
  }

  if (e.target.classList.value.search(/table__item draggable/) != -1) {
    selectedTData = e.target;

    if (contextMenuItem.style.display == 'none') {
      contextMenuItem.style.left = `${x}px`;
      contextMenuItem.style.top = `${y}px`;
      contextMenuItem.style.display = 'block';
    }
    else {
      contextMenuItem.style.display = 'none';
    }

    return;
  }
  //--------------------------------TEST
  if (e.target.classList.value.search(/table__item1 draggable/) != -1) {
    selectedTData = e.target;

    if (InputMenuItem.style.display == 'none') {
      InputMenuItem.style.left = `${x}px`;
      InputMenuItem.style.top = `${y}px`;
      InputMenuItem.style.display = 'block';
    }
    else {
      InputMenuItem.style.display = 'none';
    }

    return;
  }

  //--------------------------------TEST2
  if (e.target.classList.value.search(/table__item2 draggable2/) != -1) {
    selectedTData = e.target;

    if (contextMenuTime.style.display == 'none') {
      contextMenuTime.style.left = `${x}px`;
      contextMenuTime.style.top = `${y}px`;
      contextMenuTime.style.display = 'block';
    }
    else {
      contextMenuTime.style.display = 'none';
    }

    return;
  }
  //--------------------------------
}

// handle context menu on mobile
var touchTimer = null;
var touched = false;

document.addEventListener('touchstart', function (e) {

  x = e.touches[0].clientX;
  y = e.touches[0].clientY + 10;

  touchTimer = setTimeout(() => handleContextMenu(e), 500);
});

document.addEventListener('touchend', function (e) {
  if (touchTimer) clearTimeout(touchTimer);
});

document.addEventListener('touchmove', function (e) {
  if (touchTimer) clearTimeout(touchTimer);
});

// remove default context menu on right-click
window.oncontextmenu = function (e) {
  return false;
}

// convert table to data
function table2Data(tableId) {
  columns = [];
  column = [];

  table = document.getElementById(tableId);
  cells = table.querySelectorAll('.table__data');

  for (let i = 0; i < cells.length; i++) {
    cell = cells[i];

    if (cell.classList.value == 'table__data table__data--head') {
      columns.push(column);
      column = [];
    } else {
      if (cell.childElementCount < 1) {
        column.push({ 'type': '', 'description': '' });
      } else {
        column.push({
          'type': cell.querySelector('.table__item__icon img').alt,
          'description': cell.querySelector('.table__item__description').innerHTML
        });
      }
    }
  }

  columns.push(column);
  columns = columns.splice(1);

  return {
    name: table.querySelector('.table__title h3').innerHTML,
    noiDungCongViec: columns[0],
    nguoiThucHien: columns[1],
    thoiGianThucHien: columns[2],
    tienDoCongViec: columns[3]
  }
}

function allTable2Data() {
  tables = document.querySelectorAll('.table');
  result = [];

  for (let i = 0; i < tables.length; i++) {
    tables[i].querySelector(`.table__data--button`).remove(); // remove button first
    result.push(table2Data(tables[i].id));

    // restore add row
    document.getElementById(tables[i].id).innerHTML += `
    <div class="table__data table__data--button" onclick="selectedTableId = '${tables[i].id}'; addRow();">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
      </svg>
    </div>`;
  }

  // window.writeDB(window.projectId, result);
  return result;
}

// render tables from data
function data2Table(data) {
  clearTable();
  reSet();

  // handle data of a table
  for (let i = 0; i < data.length; i++) {
    tableData = data[i];
    addTable(tableData.name);
    addChart(tableData.tienDoCongViec);

    // handle data of column
    columnHTML = `
    <!-- column -->
    <div class="table__data table__data--head" style="order: 0">
      <div class="table__item" style="background-color: var(--info-color);">
        <div class="table__item__icon">
          <img src="./images/b-noi-dung-cong-viec.svg" alt="b-noi-dung-cong-viec">
        </div>
        <div class="table__item__description">
          <h3>Nội dung <br> công việc</h3>
          <h6></h6>
        </div>
      </div>
    </div>`
    columnHTML += handleColumnData2Table(tableData.noiDungCongViec);

    columnHTML += `
    <!-- column -->
    <div class="table__data table__data--head" style="order: 0">
      <div class="table__item" style="background-color: var(--info-color);">
        <div class="table__item__icon">
          <img src="./images/b-con-nguoi-thuc-hien.svg" alt="con-nguoi-thuc-hien">
        </div>
        <div class="table__item__description">
          <h3>Người <br> thực hiện</h3>
          <h6></h6>
        </div>
      </div>
    </div>`;
    columnHTML += handleColumnData2Table1(tableData.nguoiThucHien);

    columnHTML += `
    <!-- column -->
    <div class="table__data table__data--head" style="order: 0">
      <div class="table__item" style="background-color: var(--success-color);">
        <div class="table__item__icon">
          <img src="./images/b-thoi-gian-thuc-hien.svg" alt="thoi-gian-hoan-thanh">
        </div>
        <div class="table__item__description">
          <h3>Thời gian<br>thực hiện</h3>
          <h6></h6>
        </div>
      </div>
    </div>`;
    columnHTML += handleColumnData2Table2(tableData.thoiGianThucHien);

    columnHTML += `
    <!-- column -->
    <div class="table__data table__data--head" style="order: 0">
      <div class="table__item" style="background-color: var(--success-color);">
        <div class="table__item__icon">
          <img src="./images/b-tien-do-cong-viec.svg" alt="b-tien-do-cong-viec">
        </div>
        <div class="table__item__description">
          <h3>Tiến độ <br> công việc</h3>
          <h6></h6>
        </div>
      </div>
    </div>`;
    columnHTML += handleColumnData2Table3(tableData.tienDoCongViec);

    document.getElementById(selectedTableId).querySelector('.table__row').innerHTML = columnHTML;
  }

  window.isRender = false;
}

function clearTable() {
  tables = document.querySelectorAll('.table');

  for (let i = 0; i < tables.length; i++) {
    tables[i].remove();
  }
}

//

//
function handleColumnData2Table(column) {
  columnHTML = '';
  for (let j = 0; j < column.length; j++) {
    cell = column[j];
    if (cell.type == '') {
      columnHTML += `<div class="table__data dropzone" style="order:${j + 1}"></div>`;
    } else {
      columnHTML += `
      <div class="table__data dropzone" style="order:${j + 1}">
        <div class="table__item draggable">
          <div class="table__item__icon">
            <img src="./images/${cell.type}.svg" alt="${cell.type}">
          </div>
          <div class="table__item__description">${cell.description}</div>
        </div>
      </div>`;
    }
  }
  return columnHTML;
}

//-----------------------TEST
function handleColumnData2Table1(column) {
  columnHTML = '';
  for (let j = 0; j < column.length; j++) {
    cell = column[j];
    
      columnHTML += `
      <div class="table__data dropzone" style="order:${j + 1}">
        <div class="table__item1 draggable" >
          <div class="table__item__icon">
            <img src="./images/${cell.type}.svg" alt="${cell.type}">
          </div>
          <div class="table__item__description">${cell.description}</div>
        </div>
      </div>`;
  }

  return columnHTML;
}

//-----------------------TEST2
function handleColumnData2Table2(column) {
  columnHTML = '';

  for (let j = 0; j < column.length; j++) {
    cell = column[j];
      
      columnHTML += `
      <div class="table__data dropzone" style="order:${j + 1}">
        <div class="table__item2 draggable2" >
          <div class="table__item__icon">
            <img src="./images/${cell.type}.svg" alt="${cell.type}">
          </div>
          <div class="table__item__description">${cell.description}</div>
        </div>
      </div>`;
  }

  return columnHTML;
}
//
function handleColumnData2Table3(column) {
  columnHTML = '';
  for (let j = 0; j < column.length; j++) {
    cell = column[j];
    if (cell.type == '') {
      columnHTML += `<div class="table__data dropzone" style="order:${j + 1}"></div>`;
    } else {
      columnHTML += `
      <div class="table__data dropzone" style="order:${j + 1}">
        <div class="table__item draggable">
          <div class="table__item__icon">
            <img src="./images/${cell.type}.svg" alt="${cell.type}">
          </div>
          <a href="${cell.description}" target="_blank">
            <div class="table__item__description">${cell.description}</div>
          </a>
        </div>
      </div>`;
    }
  }
  return columnHTML;
}
//
function save() {
  alert('Kế hoạch đã được lưu thành công!!!');
  window.location.reload();
}

// open a file
var fileInput;
function openFile() {
  fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style.display = 'none';
  fileInput.setAttribute('onchange', 'loadFile(this.files[0])');
  document.body.appendChild(fileInput);
  fileInput.click();
}

async function loadFile(file) {
  let text = await file.text();
  data2Table(JSON.parse(text));
  document.body.removeChild(fileInput);
}

// save a file
var anchor;
function saveFile(filename = 'lee-schedule-toolkit') {
  let blob = new Blob([JSON.stringify(allTable2Data())]);

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  }
  else {
    anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = filename + '.json';
    document.body.appendChild(anchor);
    anchor.innerHTML = 'download';
    anchor.style.display = 'none';
    anchor.click();
    document.body.removeChild(anchor);
  }
}

// startup actions
window.onload = function (e) {
  refreshToolbar();
}


//report information---------------------------------
var cbd = 0, dth = 0, ht = 0, th = 0;
function rePort(elementId){
  let modal = document.getElementById(elementId);
  modal.style.display = "flex";
  cbd=0,dth=0,ht=0,th=0;
}
//
let chart__report = null;
function addChart(column) {
  for (let j = 0; j < column.length; j++) {
    cell = column[j];
    if(cell.type == 'a-chua-bat-dau') {
      cbd++;
    }
    if(cell.type == 'a-dang-thuc-hien') {
      dth++;
    }
    if(cell.type == 'a-hoan-thanh') {
      ht++;
    }
    if(cell.type == 'a-tre-hen') {
      th++;
    }
  }
  //
  if(cbd > 0 || dth > 0 || ht > 0 || th > 0) {
    var CHART = document.getElementById('chart__report').getContext('2d');
    if(chart__report != null)
    {
      chart__report.destroy();
    }
    chart__report = new Chart(CHART, {
      type: 'doughnut',
      data:{
        labels: [
          'Chưa bắt đầu',
          'Đang thực hiện',
          'Hoàn thành',
          'Trễ hẹn'
        ],
        datasets: [{
        label: 'My First Dataset',
        data: [cbd, dth, ht, th],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(0,255,0)',
          'rgb(255, 99, 132)'
        ],
        hoverOffset: 4
      }]
      }
    })
  }
  document.getElementById('thongKe').innerHTML = `
    <p>Số công việc chưa bắt đầu: <span style="color: rgb(54, 162, 235)">${cbd}</span></p>
    <p>Số công việc đang thực hiện: <span style="color: rgb(255, 205, 86)">${dth}</span></p>
    <p>Số công việc đã hoàn thành: <span style="color: rgb(0,255,0)">${ht}</span></p>
    <p>Số công việc trễ hẹn: <span style="color: rgb(255, 99, 132)">${th}</span></p>
  `;
  
}
//
function reSet()
{
  cbd=0,dth=0,ht=0,th=0;
}
//