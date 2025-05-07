import {
  E_RENDERING_CONTEXT_ID,
  IEntity,
  IPackage,
} from "#types";

export type TPackage2DEntity = IPackage<E_RENDERING_CONTEXT_ID.DIMENSIONAL2, IEntity<E_RENDERING_CONTEXT_ID.DIMENSIONAL2>>;

export interface IInitialPackage2DEntity {
  entity: IEntity<E_RENDERING_CONTEXT_ID.DIMENSIONAL2>;
}
