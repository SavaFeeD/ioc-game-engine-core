import { E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";
import { IEntity } from "src/types/entity.interface";
import { CanvasService } from "./canvas.service";
import Package2DEntity from "src/entities/package2d.entity";
import { TPackageEntityByContextId } from "src/types/package-context.types";
import { Injectable } from "@savafeed/module-manager";


@Injectable()
export class DrawService {

  constructor(
    private canvasService: CanvasService,
  ) {}

  package(entity: IEntity<E_RENDERING_CONTEXT_ID>): TPackageEntityByContextId<E_RENDERING_CONTEXT_ID> {
    switch(entity.contextId) {
      case E_RENDERING_CONTEXT_ID.DIMENSIONAL2:
        return this.package2D(entity as IEntity<E_RENDERING_CONTEXT_ID.DIMENSIONAL2>);
      default:
        throw new Error('Unsupported context');
    }
  }

  package2D<Entity extends IEntity<E_RENDERING_CONTEXT_ID.DIMENSIONAL2>>(entity: Entity) {
    const ctx = this.canvasService.getContext(E_RENDERING_CONTEXT_ID.DIMENSIONAL2);
    entity.setContext(ctx);
    return new Package2DEntity({
      entity
    });
  }

}