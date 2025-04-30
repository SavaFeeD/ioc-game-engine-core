import { TGetRenderingContext } from "./rendering-context.types";
import { E_RENDERING_CONTEXT_ID } from "./rendering-context.enum";
import BehaviorsEntity from "src/entities/behaviors.entity";

export interface IEntity<Context extends E_RENDERING_CONTEXT_ID> {
  contextId: Context;
  behaviors: BehaviorsEntity;
  setContext: (ctx: TGetRenderingContext<Context>) => void;
  update: (...args: any) => void;
  render: () => void;
}