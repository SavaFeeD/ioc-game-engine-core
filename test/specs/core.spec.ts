import Case from "test/core/base/case";
import { Core, container } from "@src";
import HTMLFabric from "test/core/base/html-fabric";


export const coreCase = () => {
  Case.new('core');
  Case.add(() => {
    const canvas = HTMLFabric.createElement('canvas');
    const config = {
      input: {
        canvas,
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