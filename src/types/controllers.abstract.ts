import type {
  IEntity,
} from "#types";
import { E_RENDERING_CONTEXT_ID } from "./rendering-context.types";


export abstract class AbstractGameController {
  abstract test(): void;
  abstract addEntity(entity: IEntity<any>): void;
  abstract run(context: E_RENDERING_CONTEXT_ID): void;
  abstract pause(): void;
  abstract resume(context: E_RENDERING_CONTEXT_ID): void;
}