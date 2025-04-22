class Game {
  constructor() {
    this.life;
    this.isPlayed = false;
    this.hearth = document.querySelector("#heartNbr");
    this.money = 100;
    this.moneyByLevel = [100, 150, 200];
    this.wallet = document.querySelector("#wallet");
    this.screenTitle = document.querySelector("#screenTitle");
    this.easyButton = document.querySelector("#easy");
    this.normalButton = document.querySelector("#normal");
    this.hardButton = document.querySelector("#hard");
    this.level = 0;
    this.waveNbr = 0;
    this.assetMonsters = [
      [
        "assets/img/mobs/slime/bruno.gif",
        "assets/img/mobs/slime/redSlime.gif",
        "assets/img/mobs/slime/yellowSlime.gif",
      ],
      ["assets/img/mobs/bat/bruceDown.gif"],
      ["assets/img/mobs/dragon/moderLeft.gif"],
      ["assets/img/mobs/slime/pouleto.gif"],
    ];
    this.assetProjectiles = [
      ["assets/img/projectile/projectileArrow.png"],
      ["assets/img/projectile/projectileElec.png"],
      ["assets/img/projectile/projectileMage.png"],
    ];
    this.nameSlime = "slime";
    this.nameBat = "bat";
    this.nameDrake = "drake";
    this.mappingLevel = [mappingLevelOne, mappingLevelTwo];
    this.roadMapMob = [roadMapMobLevelOne, roadMapMobLevelTwo, roadMapMobLevelThree];
    this.spawnLevel = ["b1", "a4", "c17"];
    this.mobExist = [];
    this.store;
    this.nbrDeathMob = 0;
    this.delayDisplay = document.querySelector("#delay");
  }
  init = () => {
    const initGame = (nbr) => {
      if (!this.isPlayed) {
        this.store = new Store();
        this.store.init();
        console.log(this.wallet);
        this.isPlayed = true;
        multiPage.classList.add("transition_Page");
        setTimeout(() => {
          multiPage.style.zIndex = "-2";
        }, 2000);
        titleStore.style.display = "flex";
        this.life = nbr;
        this.hearth.innerText = nbr;
        this.start();
      }
    };
    this.easyButton.addEventListener("click", () => {
      initGame(5);
    });
    this.normalButton.addEventListener("click", () => {
      initGame(3);
    });
    this.hardButton.addEventListener("click", () => {
      initGame(1);
    });
  };
  start = () => {
    const terrain = new Ground(this.level, this.store);
    terrain.init();
    terrain.createGround(this.mappingLevel[this.level]);
    this.delay();
  };
  nextLevel() {
    this.level++;
    this.mobExist.map((mob) => {
      mob.death();
    });
    this.mobExist = [];
    this.start();
  }
  loseLife = () => {
    this.life--;
    if (this.life < 0) {
      this.gameOver();
    } else {
      this.hearth.innerText = this.life;
    }
  };
  gameOver = () => {
    console.log("perdu");
  };
  spawnWave = () => {
    let assetMonster = this.assetMonsters[this.level][this.waveNbr];
    this.mobExist = [];
    for (let i = 1; i < 21; i++) {
      setTimeout(() => {
        const bruno = new Mob(
          statsMonster[this.level][this.waveNbr].life,
          statsMonster[this.level][this.waveNbr].gold,
          assetMonster[this.level][this.waveNbr],
          this.spawnLevel[this.level],
          nameMonster[this.level],
          i,
          this.pathMob()
        );
        this.mobExist.push(bruno);
        bruno.spawn();
      }, 2000 * i);
    }
  };
  pathMob = () => {
    const arrayMob = [];
    this.roadMapMob[this.level].map((element) => {
      arrayMob.push({
        element: document.querySelector(`.${element.case}`).getBoundingClientRect(),
        direction: element.direction,
      });
    });
    return arrayMob;
  };
  damageMob = (index, damage) => {
    this.mobExist[index].receiveDamage(damage);
  };
  earnMoney = (nbr) => {
    this.money += nbr;
    this.wallet = this.money;
    this.store.changeWallet(nbr);
  };
  deathMobs = () => {
    if (this.nbrDeathMob === 20) {
      this.nbrDeathMob = 0;
      if (this.waveNbr === 2) {
        this.waveNbr = 0;
        this.level++;
      }
    }
  };
  delay = () => {
    let delay10 = 10;
    this.delayDisplay.classList.add("delay");
    const delayNextWave = setInterval(() => {
      delay10--;
      this.delayDisplay.innerText = delay10;
      if (delay10 === 0) {
        clearInterval(delayNextWave);
        this.spawnWave();
        this.delayDisplay.classList.remove("delay");
      }
    }, 1000);
  };
}

const startGame = new Game(1);

startGame.init();
