import Player from './Player.js';
import Bow from './Bow.js';

// Класс Archer (лучник)
export default class Archer extends Player {
  constructor(name) {
    super(name);
    this.life = 80;
    this.magic = 30;
    this.speed = 15;
    this.attack = 12;
    this.agility = 18;
    this.luck = 15;
    this.description = 'Лучник - мастер дальнего боя';
    this.weapon = new Bow();
  }

  getDamage() {
    let damage = super.getDamage();
    
    // Лучник наносит больше урона на большем расстоянии
    const distance = Math.abs(this.position.x);
    if (distance >= 3) {
      damage = Math.floor(damage * 1.3);
    }
    
    return damage;
  }

  isAttackBlocked() {
    return Math.random() < 0.3;
  }

  dodged() {
    return Math.random() < 0.25;
  }
}