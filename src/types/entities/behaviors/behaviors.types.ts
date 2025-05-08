import { E_MOVE_DIRECTION } from "./move.types";


export enum E_BEHAVIOR_PROPERTY {
  MOVED = 'isMoved',
  ROTATED = 'isRotated',
  SCALED = 'isScaled',
  TRANSLATED = 'isTranslated',
  TRANSFORMED = 'isTransformed',
  ANIMATED = 'isAnimated',
}

export enum E_BEHAVIORS {
  MOVED = 'move',
  ROTATED = 'rotate',
  SCALED = 'scale',
  TRANSLATED = 'translate',
  TRANSFORMED = 'transforme',
  ANIMATED = 'animate',
};

export type TBehaviorOptionsMap = {
  [E_BEHAVIORS.MOVED]: {
    direction: E_MOVE_DIRECTION;
  };
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

export type TBehaviorOptions<Behavior extends E_BEHAVIORS> = TBehaviorOptionsMap[Behavior];

export type TActiveBehavior<Behavior extends E_BEHAVIORS> = {
  token: Behavior;
  order: number;
} | undefined;