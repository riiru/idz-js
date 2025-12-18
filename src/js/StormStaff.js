import Staff from './Staff.js';

// Класс StormStaff (штормовой посох)
export default class StormStaff extends Staff {
  constructor() {
    super();
    this.name = 'Штормовой посох';
    this.attack = 8;
    this.durability = 120;
    this.range = 3;
  }
}