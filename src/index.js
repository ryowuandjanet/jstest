import {api as data} from './data/index.js';
import { parseHTML } from './helpers.js';

renderList()
attachEventListeners()

function renderList() {
  const listElement =document.querySelector('.list');
  listElement.innerHTML = ""

  data.listItems().forEach(item => {
    listElement.append(parseHTML(`
      <div class="list-item" data-item-id="${item.id}">
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

    if(e.target.closest('.list-item')){
      e.preventDefault()
      var dialog =document.getElementById("read-item-dialog")
      dialog.show()

      var itemId = e.target.closest('.list-item').dataset["item-id"]
      var itemData = data.readItem(itemId)
      
      console.log({itemData})
      dialog.querySelector('.description').innerHTML=itemData.description
      dialog.querySelector('.datetime').innerHTML=itemData.datetime
      
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