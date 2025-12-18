import Bow from './Bow.js';

// Класс LongBow (длинный лук)
export default class LongBow extends Bow {
  constructor() {
    super();
    this.name = 'Длинный лук';
    this.attack = 4;
    this.durability = 180;
    this.range = 4;
  }
}