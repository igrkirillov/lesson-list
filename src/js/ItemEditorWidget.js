import ItemDto from "./ItemDto";
import ToolTipWidget from "./ToolTipWidget";

export default class ItemEditorWidget {
  constructor(listWidget) {
    this.listWidget = listWidget;
    this.element = this.createElement();
    this.nameElement = this.element.querySelector("#name");
    this.priceElement = this.element.querySelector("#price");
    this.saveElement = this.element.querySelector(".editor-button-save");
    this.cancelElement = this.element.querySelector(".editor-button-cancel");

    this.onClickSave = this.onClickSave.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);

    this.addActionsListeners();

    this.nameTipWidget = new ToolTipWidget(this.nameElement);
    this.priceTipWidget = new ToolTipWidget(this.priceElement);
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("editor");
    element.classList.add("editor-hidden");
    element.innerHTML =
      `<form class="editor-form">
        <label for="name">Название</label>
        <input type="text" id="name" class="editor-name"/>
        <label for="price">Стоимость</label>
        <input type="number" id="price" class="price"/>
        <div class="editor-buttons">
          <input type="submit" class="editor-button-save" value="Сохранить"/>
          <input type="submit" class="editor-button-cancel" value="Отмена"/>
        </div>
      </form>`;
    document.body.appendChild(element);
    return element;
  }

  addActionsListeners() {
    this.saveElement.addEventListener("click", this.onClickSave);
    this.cancelElement.addEventListener("click", this.onClickCancel);
  }

  onClickSave(event) {
    event.preventDefault();
    this.resetTips();
    if (!this.validateFields()) {
      // прерываем процесс сохранения
      return;
    }
    this.listWidget.addItem(new ItemDto(this.nameElement.value, this.priceElement.value));
    this.close();
  }

  resetTips() {
    this.nameTipWidget.close();
    this.priceTipWidget.close();
  }

  validateFields() {
    const nameValue = this.nameElement.value;
    if (!nameValue || !nameValue.trim()) {
      this.nameTipWidget.open("Наименование товара не должно быть пустым!");
      return false;
    }
    const priceValue = this.priceElement.value;
    if (priceValue < 0) {
      this.priceElement.open("Цена не может быть меньше 0!");
      return false;
    }
    return true;
  }

  onClickCancel(event) {
    event.preventDefault();
    this.close();
  }

  open(itemDto) {
    this.nameElement.value = itemDto ? itemDto.name : null;
    this.priceElement.value = itemDto ? itemDto.price : null;
    this.element.classList.remove("editor-hidden");
    this.nameElement.focus();
  }

  close() {
    this.resetTips();
    this.element.classList.add("editor-hidden");
  }
}
