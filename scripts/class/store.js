class Store extends Game {
  constructor(money) {
    super(money);
    this.caseSelected;
    this.towerContainer = document.createElement("article");
    this.storeTower = document.createElement("img");
    this.money = 100;
    this.turretOneBtn = document.querySelector("#t1");
    this.turretTwoBtn = document.querySelector("#t2");
    this.turretThreeBtn = document.querySelector("#t3");
  }
  caseSelected = () => {
    console.log("tu as cliqué sur une casse");
  };
}
// plop.selected();
