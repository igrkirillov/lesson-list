import addIcon from '../icons/add.png';
import removeIcon from '../icons/remove.png';
import editIcon from '../icons/edit.png';
import ItemEditorWidget from "./ItemEditorWidget";
import ItemDto from "./ItemDto";

export default class ListWidget {
  constructor(ownerElement) {
    this.element = this.createElement(ownerElement);
    this.addElement = this.element.querySelector(".list-action-add");
    this.itemEditorWidget = new ItemEditorWidget(this);
    this.itemDtoList = [];

    this.onAddClick = this.onAddClick.bind(this);

    this.addActionsListeners();
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("list");
    element.innerHTML =
      `<div class="list-header">
        <span class="list-title">Товары</span>
        <div class="list-actions">
          <a href="#" class="list-action list-action-add"><img src="${addIcon}" alt="add"></a>
        </div>
       </div>
       <div class="list-items">
        
       </div>`;
    ownerElement.appendChild(element);
    return element;
  }

  addActionsListeners() {
    this.addElement.addEventListener("click", this.onAddClick);
  }

  onAddClick(event) {
    event.preventDefault();
    this.itemEditorWidget.open(new ItemDto(null, null));
  }

  addItem(itemDto) {
    this.itemDtoList.push(itemDto);
    const itemsElement = this.element.querySelector(".list-items");
    const itemElement = document.createElement("div");
    itemElement.classList.add("list-item");
    itemElement.innerHTML =
      `<div class="list-item-cell">
        ${itemDto.name}
       </div>
       <div class="list-item-cell">
        ${itemDto.price}
       </div>
       <div class="list-item-cell">
        <a href="#" class="item-action item-action-remove"><img src="${removeIcon}" alt="remove"></a>
        <a href="#" class="item-action item-action-edit"><img src="${editIcon}" alt="edit"></a>
       </div>`;
    itemsElement.appendChild(itemElement);
  }
}
