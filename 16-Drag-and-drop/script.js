const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;


// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];  // going to be an arr of all the arrays above it

// Drag Functionality
let draggedItem;
let currentColumn;
let dragging = false;


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }  
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`,JSON.stringify(listArrays[index]));
  });
}

// Filter arrays to remove empty/null items
function filterArray(array) {
  const filteredArray = array.filter(item => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log('columnEl:', columnEl);
  // console.log('column:', column);
  // console.log('item:', item);
  // console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true; // to make the item draggable
  listEl.setAttribute('ondragstart', 'drag(event)');  // specifies what should happen when the element is dragged
  listEl.contentEditable = true; // to be able to edit the item names
  listEl.id = index;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  // Append
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {   // run getSavedColumns() only once when we load the page
    getSavedColumns();
  }

  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index);
  });
  backlogListArray = filterArray(backlogListArray);

  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  });
  progressListArray = filterArray(progressListArray);

  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index);
  });
  completeListArray = filterArray(completeListArray);

  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index);
  });
  onHoldListArray = filterArray(onHoldListArray);

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

// Update Item - delete if necessary, or update array value
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  console.log(listArrays, selectedArray);
  const selectedColumnEl = listColumns[column].children;
  // we are only allowed to edit items when we are not dragging them
  if (!dragging) {
    if (!selectedColumnEl[id].textContent) {
      delete selectedArray[id];    // but the deleted items are still going to take up space as null so use .filter
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }  
    updateDOM();
  }
}

// Show Add Item Input box
function showInputBox(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

// Add to column list, reset textbox
function addToColumn(column) {
  const itemText = addItems[column].textContent;
  if (itemText) {
    const selectedArray = listArrays[column];
    selectedArray.push(itemText);
    addItems[column].textContent = '';
    updateDOM();
  }
}

// Hide Item Input box
function hideInputBox(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

// Rebuild arrays
function rebuildArrays() {
  // console.log(backlogList.children);
  // console.log(progressList.children);
  backlogListArray = [];
  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent);
  }
  progressListArray = [];
  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  }
  completeListArray = [];
  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }
  onHoldListArray= [];
  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent);
  }
  updateDOM();
}

// When item starts dragging
function drag(e) {    // triggered by ondragstart
  draggedItem = e.target;
  // console.log('draggedItem:', draggedItem);
  dragging = true;
}

// Column allows for item to drop
function allowDrop(e) {  // triggered by ondragover
  // by default, data/elements can't be dropped in other elements. To allow a drop, we must prevent the default handling of the element by using event.preventDefault()
  e.preventDefault(); 
}

// When item enters column area
function dragEnter(column) {   // triggered by ondragenter
  // console.log(listColumns[column]);
  listColumns[column].classList.add('over');
  currentColumn = column;
}

// Dropping item in column
function drop(e) {   // triggered by ondrop
  e.preventDefault();
  // Remove background color & padding
  listColumns.forEach((column) => {
    column.classList.remove('over');
  });
  // Add item to column
  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);
  // Dragging complete
  dragging = false;
  rebuildArrays();
}

updateDOM();

// ondragstart = specifies what should happen when the element is dragged
// ondragover (see in html) = specifies where the dragged data can be dropped
// ondrop (see in html) = when the dragged data is dropped, a drop event occurs
// ondragenter (see in html) = this attribute fires when a draggable element or text selection enters a valid drop target