import { container } from '@savafeed/module-manager';
import { Core } from './core';
import { E_BEHAVIORS } from './entities/behaviors.entity';
import { E_CONTOROLLERS_TOKENS, E_CORE_TOKENS } from './types/tokens.enum';
import { E_DIMENSIONAL_ID, E_RENDERING_CONTEXT_ID } from './types/rendering-context.enum';
import { E_MOVE_DIRECTION } from './types/entities/behaviors/move.types';


export {
  Core,
  container,
  // @enums
  E_BEHAVIORS,
  E_CONTOROLLERS_TOKENS,
  E_CORE_TOKENS,
  E_DIMENSIONAL_ID,
  E_MOVE_DIRECTION,
  E_RENDERING_CONTEXT_ID,
};