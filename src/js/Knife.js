import Weapon from './Weapon.js';

// Класс Knife (нож)
export default class Knife extends Weapon {
  constructor() {
    super('Нож', 2, 100, 1);
  }
}