import Case from "test/core/base/case";
import { Ball2D, Core, E_CONTOROLLERS_TOKENS, container } from "@src";
import HTMLFabric from "test/core/base/html-fabric";
import { E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";


export default function entityCase() {
  Case.new('entity');
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

    const gameController = core.getController(E_CONTOROLLERS_TOKENS.GAME);
    if (!gameController) {
      throw new Error('[Test] Game controller is not defined!');
    }

    const ball2d = new Ball2D({
      position: {
        x: 0,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      radius: 10,
      color: '#000',
    });

    console.log('ball2d.behaviors:', ball2d.behaviors);
    console.log('ball2d.activeBehaviors:', ball2d.activeBehaviors);

    gameController.addEntity(ball2d);
    // gameController.run(E_RENDERING_CONTEXT_ID.DIMENSIONAL2);
    console.log('OK');
  });
}