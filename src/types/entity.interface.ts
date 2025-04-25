import { TGetRenderingContext } from "./rendering-context.types";
import { E_RENDERING_CONTEXT_ID } from "./rendering-context.enum";

export interface IEntity<Context extends E_RENDERING_CONTEXT_ID> {
  contextId: Context;
  setContext: (ctx: TGetRenderingContext<Context>) => void;
  update: (...args: any) => void;
  render: () => void;
}