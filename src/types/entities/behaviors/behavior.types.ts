import { E_BEHAVIORS } from "./behavior.enum";
import { E_MOVE_DIRECTION } from "./move.types";

export type TBehaviorOptionsMap = {
  [E_BEHAVIORS.MOVED]: {
    direction: E_MOVE_DIRECTION;
  },
  [E_BEHAVIORS.ROTATED]: {
    angle: number;
  };
  [E_BEHAVIORS.ANIMATED]: {
    duration: number;
    delay: number;
  };
  [E_BEHAVIORS.SCALED]: {
    scale: number;
  };
  [E_BEHAVIORS.TRANSFORMED]: {
    typeTransform: string;
  };
  [E_BEHAVIORS.TRANSLATED]: {
    position: {
      x: number;
      y: number;
    };
  };
}

export type TBehaviorOptions = {
  [E_BEHAVIORS.MOVED]: TBehaviorOptionsMap[E_BEHAVIORS.MOVED];
  [E_BEHAVIORS.ROTATED]: TBehaviorOptionsMap[E_BEHAVIORS.ROTATED];
  [E_BEHAVIORS.ANIMATED]: TBehaviorOptionsMap[E_BEHAVIORS.ANIMATED];
  [E_BEHAVIORS.SCALED]: TBehaviorOptionsMap[E_BEHAVIORS.SCALED];
  [E_BEHAVIORS.TRANSFORMED]: TBehaviorOptionsMap[E_BEHAVIORS.TRANSFORMED];
  [E_BEHAVIORS.TRANSLATED]: TBehaviorOptionsMap[E_BEHAVIORS.TRANSLATED];
}

export type TActiveBehavior<Behavior extends E_BEHAVIORS> = {
  token: Behavior;
  order: number;
} | undefined;