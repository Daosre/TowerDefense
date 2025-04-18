// const buyTower = document.querySelector(".price");
class Tower {
  constructor(damage, price, asset, caseName) {
    this.damage = damage;
    this.price = price;
    this.asset = asset;
    this.caseName = caseName;
  }
  spawnTower = () => {
    buyTower.addEventListener("click", () => {
      this.newTower.src = "../assets/img/Tower/Mage/TowerMage1.png";
    });
  };
  create = () => {
    this.caseName.classList.add("turret", "arrow1");
    const imgTurret = document.createElement("div");
    imgTurret.classList.add(this.asset);
    this.caseName.appendChild(imgTurret);
  };
}

// let towerMage = new Tower(10, 20, 2);
// towerMage.spawnTower();
