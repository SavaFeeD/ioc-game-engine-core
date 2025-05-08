import { Controller } from "@savafeed/module-manager";
import type {
  AbstractGameController,
  IEntity,
} from "#types";
import {
  E_CONTOROLLERS_TOKENS,
  E_RENDERING_CONTEXT_ID,
} from "#shared.types";
import PackageRepository from "@repositories/package.repository";
import CanvasService from "@services/canvas.service";
import DrawService from "@services/draw.service";
import RenderingService from "@services/rendering.service";


@Controller(E_CONTOROLLERS_TOKENS.GAME)
export default class GameController implements AbstractGameController {
  constructor(
    private drawService: DrawService,
    private renderingService: RenderingService,
    private canvasService: CanvasService,
  ) {}

  public test() {
    [this.drawService, this.renderingService].forEach(service => {
      if (!service) {
        throw new Error('[GameController] Service is not defined!');
      }
    });
  }

  public addEntity(entity: IEntity<any>) {
    const drawPackage = this.drawService.package(entity);
    this.renderingService.addPackage(drawPackage);
  }

  public run(context: E_RENDERING_CONTEXT_ID) {
    this.renderingService.updateRenderingPackages(context);
    requestAnimationFrame(() => {
      this.renderingService.renderFrame();
      this.canvasService.clear(context);
    });
  }

}