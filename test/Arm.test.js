import Arm from '../src/js/Arm.js';

describe('Arm', () => {
  let arm;

  beforeEach(() => {
    arm = new Arm();
  });

  test('должен создавать руку с правильными свойствами', () => {
    expect(arm.name).toBe('Рука');
    expect(arm.attack).toBe(1);
    expect(arm.durability).toBe(Infinity);
    expect(arm.range).toBe(1);
  });

  test('метод getDamage должен всегда возвращать 1', () => {
    expect(arm.getDamage()).toBe(1);
  });

  test('метод isBroken должен всегда возвращать false для руки', () => {
    expect(arm.isBroken()).toBe(false);
  });
});