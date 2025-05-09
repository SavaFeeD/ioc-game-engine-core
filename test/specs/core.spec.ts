import Case from "test/core/base/case";
import HTMLFabric from "test/core/base/html-fabric";
import { Core } from "#src";
import { E_RENDERING_CONTEXT_ID } from "#types";


export default function coreCase() {
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
      Core.BASE_IOC_CONTAINER,
      config,
    );

    core.test();
    console.log('OK');
  });
}