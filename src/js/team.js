import RouteIterator from './routeiterator';

export default class Team {
  constructor() {
    this.members = new Set();
  }

  add(character) {
    if (!this.members.has(character)) {
      this.members.add(character);
    } else {
      throw new Error(`Уже есть ${character.name} в команде!`);
    }
  }

  addAll(...characters) {
    characters.forEach((elem) => {
      this.members.add(elem);
    });
  }

  toArray() {
    return [...this.members];
  }

  [Symbol.iterator]() {
    return new RouteIterator(this.toArray());
  }
}
