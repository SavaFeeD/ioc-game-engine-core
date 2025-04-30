export default class BehaviorsEntity {
  public isMoved: boolean = false;
  public isRotated: boolean = false;
  public isScaled: boolean = false;
  public isTranslated: boolean = false;
  public isTransformed: boolean = false;
  public isAnimated: boolean = false;
}

export type TBehaviorProperty = keyof typeof BehaviorsEntity.prototype;

export enum E_BEHAVIORS {
  MOVED = 'move',
  ROTATED = 'rotate',
  SCALED = 'Scale',
  TRANSLATED = 'Translate',
  TRANSFORMED = 'Transforme',
  ANIMATED = 'Animate',
};