import Weapon from './Weapon.js';

// Класс Staff (посох)
export default class Staff extends Weapon {
  constructor() {
    super('Посох', 4, 150, 2);
  }
}