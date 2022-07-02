// import db from './db.js';

function isObject(varirable){
  return typeof varirable === 'object'
}

var id = 0
function generateId() {
  return ++id
}

function listItems() {
  return JSON.parse(JSON.stringify(db))
}

function createItem(item) {
  if (!isObject(item) || !item?.description || !item?.datetime ){
    throw new Error("Item is invalid")
  }
  item.id=generateId()
  db.push(item)
  return item
}

function readItem() {
  return {}
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