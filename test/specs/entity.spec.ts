import Case from "test/core/base/case";
import HTMLFabric from "test/core/base/html-fabric";
import { Ball2D, Core } from "#src";
import { E_BEHAVIORS, E_CONTOROLLERS_TOKENS, E_RENDERING_CONTEXT_ID } from '#types';


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
      Core.BASE_IOC_CONTAINER,
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

    ball2d.setActiveBehavior(E_BEHAVIORS.MOVED);

    console.log('ball2d.behaviors:', ball2d.behaviors);

    gameController.addEntity(ball2d);
    // gameController.run(E_RENDERING_CONTEXT_ID.DIMENSIONAL2);
    console.log('OK');
  });
}