import { IEntity } from "./entity.interface";
import { E_RENDERING_CONTEXT_ID } from "./rendering-context.enum";

export interface IPackage<Context extends E_RENDERING_CONTEXT_ID, Entity extends IEntity<Context>> {
  id: string;
  renderType: Context;
  entity: Entity;
}