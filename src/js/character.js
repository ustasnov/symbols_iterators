export default class Character {
  constructor(name, type) {
    if (!(typeof name === 'string' || name instanceof String)) {
      throw new Error('Имя должно быть строкой!');
    } else if (name.length < 2 || name.length > 10) {
      throw new Error('Длина имени не должна быть менее 2 и более 10 символов!');
    }

    const characterTypes = ['Bowerman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
    if (!(typeof type === 'string' || type instanceof String)) {
      throw new Error('Тип персонажа должен быть строкой!');
    } else if (characterTypes.indexOf(type) === -1) {
      throw new Error('Неверный тип персонажа!');
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = 10;
    this.defence = 10;
  }

  levelUp() {
    if (this.health > 0) {
      this.level += 1;
      this.attack += this.attack * 0.2;
      this.defence += this.defence * 0.2;
      this.health = 100;
    } else {
      throw new Error('Нельзя повысить уровень умершего персонажа!');
    }
  }

  damage(points) {
    this.health = Math.max(this.health - points * (1 - this.defence / 100), 0);
  }
}
