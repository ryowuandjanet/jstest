import {logic} from './logic.js';

function listItems() {
  return logic.listItems()
}

function createItem(item) {
  return logic.createItem(item) 
}

function readItem(id) {
  return logic.readItem(id)
}

function updateItem(id, item) {
  return false
}

function deleteItem(id) {
  return false
}

export const api = {
  listItems,
  createItem,
  readItem,
  updateItem,
  deleteItem
}