import { E_BEHAVIORS } from "src/entities/behaviors.entity"
import { E_DIMENSIONAL_ID, E_RENDERING_CONTEXT_ID } from "./rendering-context.enum"
import { E_MOVE_DIRECTION } from "./entities/behaviors/move.types"
import { E_CONTOROLLERS_TOKENS, E_CORE_TOKENS } from "./tokens.enum"
import { TControllerMap, TControllerMapper } from "./controller-mapper"
import { ICoreConfig } from "./config.interface"
import { AbstractGameController } from "./controllers.abstract"


export {
  // @enums
  E_BEHAVIORS,
  E_DIMENSIONAL_ID,
  E_MOVE_DIRECTION,
  E_RENDERING_CONTEXT_ID,
  // @token.enums
  E_CONTOROLLERS_TOKENS,
  E_CORE_TOKENS,
  // @types
  TControllerMap,
  TControllerMapper,
  // @interfaces
  ICoreConfig,
  // @controllers.abstract
  AbstractGameController,
}