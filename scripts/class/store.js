class Store {
  constructor(tower, money) {
    this.selected = document.querySelector("#selected");
    this.towerContainer = document.createElement("article");
    this.btnBuy = document.createElement("button");
    this.storeTower = document.createElement("img");
    this.tower = tower;
    this.money = money;
  }
  selected = () => {};
}
let plop = new Store(0, 0);
// plop.selected();
