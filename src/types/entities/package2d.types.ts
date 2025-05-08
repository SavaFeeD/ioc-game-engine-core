import type {
  IEntity,
  IPackage,
} from "#types";
import { E_RENDERING_CONTEXT_ID } from "../rendering-context.types";


export type TPackage2DEntity = IPackage<E_RENDERING_CONTEXT_ID.DIMENSIONAL2, IEntity<E_RENDERING_CONTEXT_ID.DIMENSIONAL2>>;

export interface IInitialPackage2DEntity {
  entity: IEntity<E_RENDERING_CONTEXT_ID.DIMENSIONAL2>;
}
