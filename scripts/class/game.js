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
    this.waveNbr = 1;
    this.assetMonsters = [
      [
        "assets/img/mobs/slime/bruno.gif",
        "assets/img/mobs/slime/redSlime.gif",
        "assets/img/mobs/slime/yellowSlime.gif",
      ],
      ["assets/img/mobs/bat/bruceDown.gif"],
      [
        "assets/img/mobs/dragon/moderDown.gif",
        "assets/img/mobs/dragon/moderLeft.gif",
        "assets/img/mobs/dragon/moderUp.gif",
      ],
      ["assets/img/mobs/slime/pouleto.gif"],
    ];
    this.nameSlime = "slime";
    this.nameBat = "bat";
    this.nameDrake = "drake";
    this.mappingLevel = [mappingLevelOne, mappingLevelTwo];
    this.roadMapMob = [roadMapMobLevelOne, roadMapMobLevelTwo, roadMapMobLevelThree];
    this.spawnLevel = ["b1", "a4", "c17"];
    this.mobExist = [];
    this.store;
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
    console.log(terrain);
    this.spawnWave();
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
    let assetMonster = this.assetMonsters[this.level][0];
    this.mobExist = [];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const bruno = new Mob(
          10,
          1,
          1,
          assetMonster,
          this.spawnLevel[this.level],
          this.nameSlime,
          i + 1,
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
}

const startGame = new Game(1);

startGame.init();
