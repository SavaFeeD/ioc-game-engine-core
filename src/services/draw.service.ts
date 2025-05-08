import { Injectable } from "@savafeed/module-manager";
import type {
  IEntity,
  TPackageEntityByContextId,
} from "#types";
import {
  E_RENDERING_CONTEXT_ID,
} from "#shared.types";
import CanvasService from "@services/canvas.service";
import Package2DEntity from "@entities/package2d.entity";


@Injectable()
export default class DrawService {

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