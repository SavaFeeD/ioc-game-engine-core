export default class UUID {
  private static _generated: Set<string> = new Set();

  public static generate(): string {
    let uuid: string;
    do {
      uuid = this.generateRandomUUID();
    } while (this._generated.has(uuid));
    this._generated.add(uuid);
    return uuid;
  }

  private static generateRandomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = Math.random() * 16 | 0;
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}