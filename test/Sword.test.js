import Sword from '../src/js/Sword.js';

describe('Sword', () => {
  let sword;

  beforeEach(() => {
    sword = new Sword();
  });

  test('должен создавать меч с правильными свойствами', () => {
    expect(sword.name).toBe('Меч');
    expect(sword.attack).toBe(5);
    expect(sword.durability).toBe(300);
    expect(sword.range).toBe(2);
  });

  test('должен наследовать от Weapon', () => {
    expect(sword instanceof Object).toBe(true);
    expect(sword.takeDamage).toBeDefined();
    expect(sword.getDamage).toBeDefined();
    expect(sword.isBroken).toBeDefined();
  });
});