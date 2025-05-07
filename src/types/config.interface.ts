import { E_RENDERING_CONTEXT_ID } from "#types";

export interface ICoreConfig {
  input: {
    canvas: HTMLCanvasElement;
    context: E_RENDERING_CONTEXT_ID;
  };
}