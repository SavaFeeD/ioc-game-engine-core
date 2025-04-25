export default class Case {
  private static all: Map<string, (...args: any) => any> = new Map();
  private static lastName: string | null = null;

  public static new(name: string) {
    if (Case.all.has(name)) throw new Error(`[Case] Case with name '${name}' already exists`);
    Case.lastName = name;
    Case.all.set(name, () => null);
  }

  public static add<Result>(testCase: (...args: any) => Result) {
    if (Case.lastName == null) throw new Error(`[Case] Case name is not set`);
    Case.all.set(Case.lastName, testCase);
    Case.lastName = null;
  }

  public static getAll() {
    return Array.from(Case.all.entries());
  }

}