class Mob {
  constructor(health, speed) {
    this.health = health;
    this.speed = speed;
    this.spawnLevel = ["b1", "a4", "c17"];
    this.roadMapMobLevel = [roadMapMobLevelOne, roadMapMobLevelTwo, roadMapMobLevelThree];
  }
}

let slime = new Mob(10, 1);
let bat = new Mob(15, 2);
let dragon = new Mob(40, 1);
