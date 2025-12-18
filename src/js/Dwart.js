import Warrior from './Warrior.js';
import Axe from './Axe.js';

// Класс Dwart (дворф)
export default class Dwart extends Warrior {
  constructor(name) {
    super(name);
    this.life = 140;
    this.magic = 10;
    this.speed = 6;
    this.attack = 20;
    this.agility = 6;
    this.luck = 3;
    this.description = 'Дворф - крепкий воин с топором';
    this.weapon = new Axe();
  }

  getDamage() {
    let damage = super.getDamage();
    
    // Дворф может наносить критические удары
    if (Math.random() < 0.15) {
      damage = Math.floor(damage * 2);
    }
    
    return damage;
  }

  takeAttack(damage) {
    let finalDamage = super.takeAttack(damage);
    
    // Дворф имеет повышенную защиту
    if (Math.random() < 0.3) {
      finalDamage = Math.floor(finalDamage * 0.7);
    }
    
    return finalDamage;
  }
}