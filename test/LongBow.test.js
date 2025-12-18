import LongBow from '../src/js/LongBow.js';

describe('LongBow', () => {
  let longBow;

  beforeEach(() => {
    longBow = new LongBow();
  });

  test('должен создавать длинный лук с правильными свойствами', () => {
    expect(longBow.name).toBe('Длинный лук');
    expect(longBow.attack).toBe(4);
    expect(longBow.durability).toBe(180);
    expect(longBow.range).toBe(4);
  });

  test('должен наследовать от Bow', () => {
    expect(longBow instanceof Object).toBe(true);
    expect(longBow.takeDamage).toBeDefined();
    expect(longBow.getDamage).toBeDefined();
    expect(longBow.isBroken).toBeDefined();
  });
});