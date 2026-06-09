export class APILogger {
  constructor(name) {
    this.name = name;
  }

  async log(data) {
    // Simply log the object to the terminal
    console.log(`[${this.name}]`, JSON.stringify(data, null, 2));
  }
}
