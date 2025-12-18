import Arm from './Arm.js';
import Knife from './Knife.js';

// Базовый класс Player
export default class Player {
  constructor(name) {
    this.name = name;
    this.life = 100;
    this.magic = 50;
    this.speed = 10;
    this.attack = 10;
    this.agility = 10;
    this.luck = 10;
    this.description = 'Базовый персонаж';
    this.weapon = new Arm();
    this.position = { x: 0, y: 0 };
  }

  getDamage() {
    if (this.isDead()) {
      return 0;
    }
    
    const weaponDamage = this.weapon.getDamage();
    const luckMultiplier = 1 + (this.luck / 100);
    return Math.floor(weaponDamage * luckMultiplier);
  }

  takeDamage(damage) {
    if (this.isDead()) {
      return;
    }
    
    this.life = Math.max(0, this.life - damage);
  }

  isDead() {
    return this.life <= 0;
  }

  moveLeft() {
    this.position.x -= 1;
  }

  moveRight() {
    this.position.x += 1;
  }

  move(direction) {
    if (direction === 'left') {
      this.moveLeft();
    } else if (direction === 'right') {
      this.moveRight();
    }
  }
}