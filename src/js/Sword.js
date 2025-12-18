import Weapon from './Weapon.js';

// Класс Sword (меч)
export default class Sword extends Weapon {
  constructor() {
    super('Меч', 5, 300, 2);
  }
}