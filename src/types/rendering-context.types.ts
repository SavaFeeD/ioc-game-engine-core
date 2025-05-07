export enum E_RENDERING_CONTEXT_ID {
  DIMENSIONAL2 = '2d',
  WEBGL = 'webgl',
};

export enum E_DIMENSIONAL_ID {
  DIMENSIONAL2 = E_RENDERING_CONTEXT_ID.DIMENSIONAL2,
  DIMENSIONAL3 = E_RENDERING_CONTEXT_ID.WEBGL,
};

export type TRenderingContextMap = {
  [E_RENDERING_CONTEXT_ID.DIMENSIONAL2]: CanvasRenderingContext2D,
  [E_RENDERING_CONTEXT_ID.WEBGL]: WebGLRenderingContext,
  // [E_RENDERING_CONTEXT_ID.WEBGL2]: WebGL2RenderingContext,
  // [E_RENDERING_CONTEXT_ID.BITMAP_RENDERER]: ImageBitmapRenderingContext,
};

export type TGetRenderingContext<ContextId extends E_RENDERING_CONTEXT_ID> = TRenderingContextMap[ContextId];

export type TRenderingDimensionsMap = {
  [E_DIMENSIONAL_ID.DIMENSIONAL2]: '2d',
  [E_DIMENSIONAL_ID.DIMENSIONAL3]: '3d',
};

export type TGetDimension<Dimension extends E_DIMENSIONAL_ID> = TRenderingDimensionsMap[Dimension];