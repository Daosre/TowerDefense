class Store extends Game {
  constructor() {
    super();
    this.caseSelected;
    this.money = this.money;
    this.wallet = this.wallet;
    this.buyTurretOne = document.querySelector("#buyT1");
    this.buyTurretTwo = document.querySelector("#buyT2");
    this.buyTurretThree = document.querySelector("#buyT3");
    this.articleTurretOne = document.querySelector("#articleT1");
    this.articleTurretTwo = document.querySelector("#articleT2");
    this.articleTurretThree = document.querySelector("#articleT3");
    this.assetsTower = [
      "assets/img/Tower/Arrow/TowerArrow1.png",
      "assets/img/Tower/Elec/TowerElec1.png",
      "assets/img/Tower/Mage/TowerMage1.png",
    ];
    this.caseSelected;
  }
  init = () => {
    this.buyTurretOne.addEventListener("click", () => {
      this.addTurret(0);
    });
    this.buyTurretTwo.addEventListener("click", () => {
      this.addTurret(1);
    });
    this.buyTurretThree.addEventListener("click", () => {
      this.addTurret(2);
    });
  };
  handleSelect = (caseName) => {
    this.caseSelected = caseName;
    console.log(caseName.classList);
    if (!caseName.classList.contains("turret")) {
      this.showTurretLevelOne();
    } else {
      this.hiddenTurretLevelOne();
    }
  };
  showTurretLevelOne = () => {
    this.articleTurretOne.style.display = "flex";
    this.articleTurretTwo.style.display = "flex";
    this.articleTurretThree.style.display = "flex";
  };
  hiddenTurretLevelOne = () => {
    this.articleTurretOne.style.display = "none";
    this.articleTurretTwo.style.display = "none";
    this.articleTurretThree.style.display = "none";
  };
  addTurret = (nbr) => {
    switch (nbr) {
      case 0:
        if (this.money >= 10) {
          this.caseSelected.classList.add("turret", "arrow1");
          const imgTurret = document.createElement("div");
          imgTurret.classList.add("assetArrow1");
          this.caseSelected.appendChild(imgTurret);
          this.money -= 10;
          this.wallet.innerText = this.money;
        }
        break;
      case 1:
        if (this.money >= 20) {
          this.caseSelected.classList.add("turret", "elec1");
          const imgTurret = document.createElement("div");
          imgTurret.classList.add("assetElec1");
          this.caseSelected.appendChild(imgTurret);
          this.money -= 20;
          this.wallet.innerText = this.money;
        }
        break;
      case 2:
        if (this.money >= 50) {
          this.caseSelected.classList.add("turret", "mage1");
          const imgTurret = document.createElement("div");
          imgTurret.classList.add("assetMage1");
          this.caseSelected.appendChild(imgTurret);
          this.money -= 20;
          this.wallet.innerText = this.money;
        }
        break;
      default:
        console.log("probleme de pauvre");
        break;
    }
  };
}
// plop.selected();
