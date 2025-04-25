import Case from "test/core/base/case";
import { Core } from "@src";

export default function coreCase() {
  Case.new('core');
  Case.add(() => {
    const core = new Core({
      input: {
        canvas: { ctx: {} } as unknown as HTMLCanvasElement,
      }
    });
    console.log('core', core);
  });  
}