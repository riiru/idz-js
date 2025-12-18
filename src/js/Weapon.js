// Базовый класс Weapon
export default class Weapon {
  constructor(name, attack, durability, range) {
    this.name = name;
    this.attack = attack;
    this.durability = durability;
    this.range = range;
    this.maxDurability = durability;
  }

  takeDamage(damage) {
    this.durability = Math.max(0, this.durability - damage);
  }

  getDamage() {
    if (this.isBroken()) {
      return 0;
    }
    return this.attack;
  }

  isBroken() {
    return this.durability <= 0;
  }
}