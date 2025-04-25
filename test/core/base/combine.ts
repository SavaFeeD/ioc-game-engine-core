import Case from "./case";

export class Combine {
  private tests: Set<[string, (...args: any) => any]> = new Set();

  constructor(...cases: Function[]) {
    cases.forEach((caseFn) => {
      caseFn();
    });

    const pairsCase = Case.getAll();
    pairsCase.forEach(this.addCase.bind(this)); 
  }

  private addCase(pairCase: [string, (...args: any) => any]) {
    if (this.tests.has(pairCase)) throw new Error(`[Combine] Case with name '${pairCase[0]}' already exists`);
    this.tests.add(pairCase);
  }

  run() {
    this.tests.forEach((pair) => {
      const [name, testCase] = pair;
      console.log(`[Combine] Running test case '${name}'`);
      testCase();
    });
  }
}