import PackageRepository from "src/repositories/package.repository";
import DrawService from "src/services/draw.service";
import RenderingService from "src/services/rendering.service";
import { AbstractGameController } from "src/types/controllers.abstract";
import { IEntity } from "src/types/entity.interface";
import { E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";


export default class GameController implements AbstractGameController{
  constructor(
    private drawService: DrawService,
    private renderingService: RenderingService,
    private packageRepository: PackageRepository,
  ) {}

  public addEntity(entity: IEntity<E_RENDERING_CONTEXT_ID>) {
    const drawPackage = this.drawService.package(entity);
    this.packageRepository.addPackage(drawPackage);
    this.renderingService
  }

}