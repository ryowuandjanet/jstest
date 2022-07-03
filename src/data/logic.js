import db from './db.js';

(function loadTestData() {[
  {
    description: 'Janet',
    datetime: '29 Apr 2022 16:00'
  },
  {
    description: 'Ryowu',
    datetime: '29 Apr 2022 16:00'
  },
  {
    description: 'Rita',
    datetime: '29 Apr 2022 16:00'
  },
  {
    description: 'Lawrence',
    datetime: '29 Apr 2022 16:00'
  }
].forEach(createItem)
})()

function isObject(variable){
  return typeof variable === 'object'
}

var uniqueId = 1
function generateId() {
  if (!uniqueId) uniqueId=1
  return uniqueId++
}

function deref(variable){
  return JSON.parse(JSON.stringify(variable)) 
}

function listItems() {
  return deref(db)
}

function createItem(item) {
  if (!isObject(item) || !item?.description ){
    throw new Error("Item is invalid")
  }
  item.id=generateId()
  db.push(item)
  return item
}

function readItem(id) {
  return deref(db.find(item => item.id == id))
}

function updateItem (id) {
  return {}
}

function deleteItem() {
  return {}
}

export const logic = {
  listItems,
  createItem,
  readItem,
  updateItem,
  deleteItem
}