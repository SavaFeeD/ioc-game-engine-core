import {
  E_RENDERING_CONTEXT_ID,
  TGetRenderingContext,
} from "#types";
import { BehaviorsEntity } from "#src";

export interface IEntity<Context extends E_RENDERING_CONTEXT_ID> {
  contextId: Context;
  behaviors: BehaviorsEntity;
  setContext: (ctx: TGetRenderingContext<Context>) => void;
  update: (...args: any) => void;
  render: () => void;
}