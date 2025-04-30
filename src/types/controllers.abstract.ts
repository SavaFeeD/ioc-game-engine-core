import { IEntity } from "./entity.interface";
import { E_RENDERING_CONTEXT_ID } from "./rendering-context.enum";

export abstract class AbstractGameController {
  abstract test(): void;
  abstract addEntity(entity: IEntity<E_RENDERING_CONTEXT_ID>): void;
}