import Player from './Player.js';
import Sword from './Sword.js';

// Класс Warrior (воин)
export default class Warrior extends Player {
  constructor(name) {
    super(name);
    this.life = 120;
    this.magic = 20;
    this.speed = 8;
    this.attack = 15;
    this.agility = 8;
    this.luck = 5;
    this.description = 'Воин - сильный боец ближнего боя';
    this.weapon = new Sword();
  }

  getDamage() {
    let damage = super.getDamage();
    
    // Воин наносит дополнительный урон при низком здоровье
    if (this.life < 30) {
      damage = Math.floor(damage * 1.5);
    }
    
    return damage;
  }

  takeAttack(damage) {
    // Воин может блокировать некоторые атаки
    if (Math.random() < 0.2) {
      return Math.floor(damage * 0.5);
    }
    return damage;
  }
}