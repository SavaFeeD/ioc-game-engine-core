import Case from "test/core/base/case";
import { Core, container } from "@src";
import HTMLFabric from "test/core/base/html-fabric";
import { E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";


export const coreCase = () => {
  Case.new('core');
  Case.add(() => {
    const canvas = HTMLFabric.createElement('canvas');
    const config = {
      input: {
        canvas,
        context: E_RENDERING_CONTEXT_ID.DIMENSIONAL2,
      }
    };

    const core = new Core(
      container,
      config,
    );

    core.test();
    console.log('OK');
  });
}