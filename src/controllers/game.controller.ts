import { Controller } from "@savafeed/module-manager";
import Ball2D from "src/entities/ball2d.entity";
import { PackageRepository } from "src/repositories/package.repository";
import { CanvasService } from "src/services/canvas.service";
import { DrawService } from "src/services/draw.service";
import { RenderingService } from "src/services/rendering.service";
import { AbstractGameController } from "src/types/controllers.abstract";
import { IEntity } from "src/types/entity.interface";
import { E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";
import { E_CONTOROLLERS_TOKENS } from "src/types/tokens.enum";


@Controller(E_CONTOROLLERS_TOKENS.GAME)
export class GameController implements AbstractGameController {
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