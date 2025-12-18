import Archer from './Archer.js';
import LongBow from './LongBow.js';

// Класс Crossbowman (арбалетчик)
export default class Crossbowman extends Archer {
  constructor(name) {
    super(name);
    this.life = 90;
    this.magic = 25;
    this.speed = 14;
    this.attack = 16;
    this.agility = 20;
    this.luck = 18;
    this.description = 'Арбалетчик - мастер арбалета';
    this.weapon = new LongBow();
  }

  getDamage() {
    let damage = super.getDamage();
    
    // Арбалетчик может делать точные выстрелы
    if (Math.random() < 0.2) {
      damage = Math.floor(damage * 1.8);
    }
    
    return damage;
  }

  isAttackBlocked() {
    return Math.random() < 0.4;
  }
}