import { E_DIMENSIONAL_ID, E_RENDERING_CONTEXT_ID } from "./rendering-context.enum"
import { E_BEHAVIORS, E_BEHAVIOR_PROPERTY } from "./entities/behaviors/behavior.enum"
import { E_MOVE_DIRECTION } from "./entities/behaviors/move.types"
import { E_CONTOROLLERS_TOKENS, E_CORE_TOKENS } from "./tokens.enum"
import { ICoreConfig } from "./config.interface"
import { TControllerMap, TControllerMapper } from "./controller-mapper"
import { AbstractGameController } from "./controllers.abstract"


export {
  // @enums
  E_DIMENSIONAL_ID,
  E_MOVE_DIRECTION,
  E_RENDERING_CONTEXT_ID,
  // @token.enums
  E_CONTOROLLERS_TOKENS,
  E_CORE_TOKENS,
  // @behavior.enums
  E_BEHAVIORS,
  E_BEHAVIOR_PROPERTY,
  // @types
  TControllerMap,
  TControllerMapper,
  // @interfaces
  ICoreConfig,
  // @controllers.abstract
  AbstractGameController,
};