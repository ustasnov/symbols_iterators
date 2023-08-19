export default class RouteIterator {
  constructor(route) {
    this.route = route;
    this.nextIdx = 0;
  }

  next() {
    if (this.nextIdx === this.route.length) {
      return { done: true };
    }

    const result = {
      value: this.route[this.nextIdx],
      done: false,
    };

    this.nextIdx += 1;

    return result;
  }
}
