import {api as data} from './data/index.js';
import { parseHTML } from './helpers.js';

renderList()

function renderList() {
  const listElement =document.querySelector('.list');
  listElement.innerHTML = ""

  data.listItems().forEach(item => {
    listElement.append(`
      <div class="list-item">
        <div class="description">
          ${item.description}
        </div>
        <div class="datetime">
          ${item.datetime}
        </div>
      </div>
    `)
  })
}

function attachEventListeners() {
  document.getElementById("add-new-button")
}