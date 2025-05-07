import { AbstractGameController, E_CONTOROLLERS_TOKENS } from "#types";

export type TControllerMap = {
  [E_CONTOROLLERS_TOKENS.GAME]: AbstractGameController;
};

export type TControllerMapper<TOKEN extends E_CONTOROLLERS_TOKENS> = TControllerMap[TOKEN];
