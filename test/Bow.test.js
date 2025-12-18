import Bow from '../src/js/Bow.js';

describe('Bow', () => {
  let bow;

  beforeEach(() => {
    bow = new Bow();
  });

  test('должен создавать лук с правильными свойствами', () => {
    expect(bow.name).toBe('Лук');
    expect(bow.attack).toBe(3);
    expect(bow.durability).toBe(200);
    expect(bow.range).toBe(3);
  });

  test('должен наследовать от Weapon', () => {
    expect(bow instanceof Object).toBe(true);
    expect(bow.takeDamage).toBeDefined();
    expect(bow.getDamage).toBeDefined();
    expect(bow.isBroken).toBeDefined();
  });
});