import {
  IEntity,
  TPackage2DEntity,
  E_RENDERING_CONTEXT_ID,
} from "#types";

export type TPackageContextMap = {
  [E_RENDERING_CONTEXT_ID.DIMENSIONAL2]: TPackage2DEntity;
  [E_RENDERING_CONTEXT_ID.WEBGL]: null;
};

export type TPackageEntityByContextId<ContextId extends E_RENDERING_CONTEXT_ID> = TPackageContextMap[ContextId];

export interface IPackage<Context extends E_RENDERING_CONTEXT_ID, Entity extends IEntity<Context>> {
  id: string;
  estimatedRendering: boolean;
  renderOrder: number;
  renderType: Context;
  entity: Entity;

  get update(): Entity['update'];
  get render(): Entity['render'];
}