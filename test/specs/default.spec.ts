import Case from "../core/base/case";

export default function defaultCase() {
  Case.new("default");
  Case.add(() => {
    console.log("default case");
  });
}