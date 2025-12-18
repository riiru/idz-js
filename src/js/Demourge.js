import Mage from './Mage.js';
import StormStaff from './StormStaff.js';

// Класс Demourge (демург)
export default class Demourge extends Mage {
  constructor(name) {
    super(name);
    this.life = 70;
    this.magic = 120;
    this.speed = 10;
    this.attack = 12;
    this.agility = 15;
    this.luck = 25;
    this.description = 'Демург - могущественный маг с штормовым посохом';
    this.weapon = new StormStaff();
  }

  getDamage() {
    let damage = super.getDamage();
    
    // Демург может использовать мощные заклинания
    if (this.magic >= 15 && Math.random() < 0.25) {
      this.magic -= 15;
      damage = Math.floor(damage * 2.5);
    }
    
    return damage;
  }

  takeAttack(damage) {
    let finalDamage = super.takeAttack(damage);
    
    // Демург может создать магический щит
    if (this.magic >= 10 && Math.random() < 0.3) {
      this.magic -= 10;
      return Math.floor(finalDamage * 0.1);
    }
    
    return finalDamage;
  }
}