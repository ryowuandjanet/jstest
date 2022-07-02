import {api as data} from './data/index.js';
import { parseHTML } from './helpers.js';

renderList()
attachEventListeners()

function renderList() {
  const listElement =document.querySelector('.list');
  listElement.innerHTML = ""

  data.listItems().forEach(item => {
    listElement.append(parseHTML(`
      <div class="list-item">
        <div class="description">
          ${item.description}
        </div>
        <div class="datetime">
          ${item.datetime}
        </div>
      </div>
    `))
  })
}

function attachEventListeners() {
  document.getElementById("add-new-button").onclick = function() {
    document.getElementById("create-item-dialog").show()
  }

  document.addEventListener('click',function(e){
    if(e.target.classList.contains('dialog-close')){
      e.preventDefault()
      e.target.closest('dialog').close()
      return false
    }
  })

  document.getElementById("create-item").onclick = function(){
    var item = {
      description: document.getElementById('description').value,
      datetime: document.getElementById("datetime").value
    }

    try {
      data.createItem(item)
    } catch (error) {
      alert(error)
    }

    renderList()
    document.getElementById('create-item-dialog').close()
  }
}