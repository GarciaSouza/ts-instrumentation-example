// tslint:disable: no-console
// tslint:disable: ban-types

function sum(a: number, b: number): number {
  return a + b;
}

function errorSum(a: number, b: number): number {
  const e = new Error("CÓCÓRICÓOOOOO");
  e.name = "CocoricoError";
  e.message = "Somou errado doidão!!!";
  throw e;
}

function instrumentation(
  einefunction: Function,
  successfunction: (functionname: string, args: any, result: any) => void,
  failfunction: (functionname: string, error: any) => void
) {
  return (...args: any) => {
    try {
      const result = einefunction.apply(undefined, args);
      successfunction(einefunction.name, args, result);
    } catch (error) {
      failfunction(einefunction.name, error);
    }
  };
}

function successFunction(funcname: string, args: any, result: any): void {
  console.log(`RUNNED ${funcname} WITH ${args} -> ${result}`);
}

function errorFunction(funcname: string, error: any): void {
  const { name, message, stack } = error;
  console.log(`ERROR at ${funcname} -> %j`, { name, message, stack });
}

const sum2 = instrumentation(sum, successFunction, errorFunction);
const errorSum2 = instrumentation(errorSum, successFunction, errorFunction);

sum2(5, 5);
errorSum2(5, 5);
