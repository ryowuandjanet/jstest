import {logic} from './logic.js';

function listItems() {
  return logic.listItems()
}

function createItem(item) {
  return {}
}

function readItem(id) {
  return {}
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