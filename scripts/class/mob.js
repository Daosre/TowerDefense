class Mob {
  constructor(health, speed, asset) {
    this.createSlime = document.createElement("img");
    this.health = health;
    this.speed = speed;
    this.asset = asset
  }
  spawn = () => {
    let start = document.querySelector(".b1");
    this.createSlime.src = "../assets/img/mobs/slime/blueSlime.gif";
    this.createSlime.classList.add('slime')
    start.appendChild(this.createSlime);
  }
  // move = () => {
  //   setInterval(() => {
  //     if(this.createSlime){

  //     }
  //     this.createSlime.style.left = '20px'
  //   }, 500);
  // }
}

let slime = new Mob(10, 1);
// let bat = new Mob(15, 2);
// let dragon = new Mob(40, 1);
slime.spawn();
// slime.move()
