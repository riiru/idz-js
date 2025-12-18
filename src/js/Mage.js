import Player from './Player.js';
import Staff from './Staff.js';

// Класс Mage (маг)
export default class Mage extends Player {
  constructor(name) {
    super(name);
    this.life = 60;
    this.magic = 100;
    this.speed = 12;
    this.attack = 8;
    this.agility = 12;
    this.luck = 20;
    this.description = 'Маг - повелитель магии';
    this.weapon = new Staff();
  }

  getDamage() {
    let damage = super.getDamage();
    
    // Маг может использовать магию для увеличения урона
    if (this.magic >= 10) {
      this.magic -= 10;
      damage = Math.floor(damage * 1.5);
    }
    
    return damage;
  }

  takeAttack(damage) {
    // Маг может использовать магию для защиты
    if (this.magic >= 5 && Math.random() < 0.4) {
      this.magic -= 5;
      return Math.floor(damage * 0.3);
    }
    return damage;
  }
}