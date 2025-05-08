import type {
  AbstractGameController,
} from "#types";
import { E_CONTOROLLERS_TOKENS } from "./tokens.enum";


export type TControllerMap = {
  [E_CONTOROLLERS_TOKENS.GAME]: AbstractGameController;
};

export type TControllerMapper<TOKEN extends E_CONTOROLLERS_TOKENS> = TControllerMap[TOKEN];
