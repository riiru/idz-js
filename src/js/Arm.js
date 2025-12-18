import Weapon from './Weapon.js';

// Класс Arm (рука)
export default class Arm extends Weapon {
  constructor() {
    super('Рука', 1, Infinity, 1);
  }

  getDamage() {
    return this.attack;
  }
}