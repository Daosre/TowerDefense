const buyTower = document.querySelector(".price");
class Tower {
  constructor(damage, price, range, asset) {
    this.newTower = document.createElement("img");
    (this.damage = damage),
      (this.price = price),
      (this.range = range),
      (this.asset = asset);
  }
  spawnTower = () => {
    buyTower.addEventListener("click", () => {
      this.newTower.src = "../assets/img/Tower/Mage/TowerMage1.png";
      console.log(buyTower);
    });
  };
}

let towerMage = new Tower(10, 20, 2);
towerMage.spawnTower();
