import { Controller } from "@savafeed/module-manager";
import {
  AbstractGameController,
  IEntity,
  E_RENDERING_CONTEXT_ID,
  E_CONTOROLLERS_TOKENS,
} from "#types";
import PackageRepository from "@repositories/package.repository";
import CanvasService from "@services/canvas.service";
import DrawService from "@services/draw.service";
import RenderingService from "@services/rendering.service";


@Controller(E_CONTOROLLERS_TOKENS.GAME)
export default class GameController implements AbstractGameController {
  constructor(
    private drawService: DrawService,
    private packageRepository: PackageRepository,
    private renderingService: RenderingService,
    private canvasService: CanvasService,
  ) {}

  public test() {
    [this.drawService, this.packageRepository, this.renderingService].forEach(service => {
      if (!service) {
        throw new Error('[GameController] Service is not defined!');
      }
    });
  }

  public addEntity(entity: IEntity<any>) {
    const drawPackage = this.drawService.package(entity);
    this.packageRepository.addPackage(drawPackage);
  }

  public run(context: E_RENDERING_CONTEXT_ID) {
    this.renderingService.updateRenderingPackages(context);
    requestAnimationFrame(() => {
      this.renderingService.renderFrame();
      this.canvasService.clear(context);
    });
  }

}