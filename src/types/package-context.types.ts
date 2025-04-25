import { TPackage2DEntity } from "./entities/package2d.types";
import { E_RENDERING_CONTEXT_ID } from "./rendering-context.enum";

export type TPackageContextMap = {
  [E_RENDERING_CONTEXT_ID.DIMENSIONAL2]: TPackage2DEntity;
  [E_RENDERING_CONTEXT_ID.BITMAP_RENDERER]: null;
  [E_RENDERING_CONTEXT_ID.WEBGL]: null;
  [E_RENDERING_CONTEXT_ID.WEBGL2]: null;
};

export type TPackageEntityByContextId<ContextId extends E_RENDERING_CONTEXT_ID> = TPackageContextMap[ContextId];
