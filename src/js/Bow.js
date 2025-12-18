import Weapon from './Weapon.js';

// Класс Bow (лук)
export default class Bow extends Weapon {
  constructor() {
    super('Лук', 3, 200, 3);
  }
}