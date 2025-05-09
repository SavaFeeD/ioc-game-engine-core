import type {
  IBallEntity,
  IInitialBallEntity,
  IUpdateBallOptions,
  TBehaviorOptions,
} from "#types";
import {
  E_BEHAVIOR_PROPERTY,
  E_BEHAVIORS,
  E_DIMENSIONAL_ID,
  E_RENDERING_CONTEXT_ID,
} from "#shared.types";
import MoveBehavior from "@behaviors/move.behavior";
import BehaviorsEntity from "@entities/behaviors.entity";


export default class Ball2D implements IBallEntity {
  public readonly contextId: IBallEntity['contextId'] = E_RENDERING_CONTEXT_ID.DIMENSIONAL2;
  public position: IBallEntity['position'];
  public velocity: IBallEntity['velocity'];
  public radius: IBallEntity['radius'];
  public color: IBallEntity['color'];
  
  public readonly behaviors: BehaviorsEntity = new BehaviorsEntity();

  private _ctx: CanvasRenderingContext2D | null = null;

  constructor(initial: Required<IInitialBallEntity>) {
    this.position = initial.position;
    this.velocity = initial.velocity;
    this.radius = initial.radius;
    this.color = initial.color;
  }

  setContext(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
  }

  setAvailableBehavior(behavior: E_BEHAVIOR_PROPERTY) {
    this.behaviors.reduceProperty(behavior, true);
  }

  unsetAvailableBehavior(behavior: E_BEHAVIOR_PROPERTY) {
    this.behaviors.reduceProperty(behavior, false);
  }

  reduceOptions(options: IUpdateBallOptions): void {
    this.position = {
      ...this.position,
      ...options.position
    };
    this.velocity = {
      ...this.velocity,
      ...options.velocity
    };
    this.color = options.color || this.color;
    this.radius = options.radius || this.radius;
  }

  getActiveBehavior<Behavior extends E_BEHAVIORS>(behavior: Behavior) {
    return this.behaviors.getActiveBehavior(behavior);
  }

  setActiveBehavior<Behavior extends E_BEHAVIORS>(behavior: Behavior, options: TBehaviorOptions<Behavior>) {
    this.behaviors.setBehaviorOptions(behavior, options);
    this.behaviors.setActiveBehavior(behavior);
  }

  takeBehavior(behaviorPropertyToken: E_BEHAVIOR_PROPERTY): void {
    const behaviorToken = this.behaviors.getBehaviorTokenByPropertyToken(behaviorPropertyToken);
    console.log('behavior', behaviorToken);
    console.log('this.behaviors.validateBehavior(behavior)', this.behaviors.validateBehavior(behaviorToken));
    if (!this.behaviors.validateBehavior(behaviorToken)) return;
    const token = this.behaviors.getActiveBehaviorToken(behaviorToken);
    const behaviorOptions = this.behaviors.getActiveBehaviorOptions(token);
    switch (behaviorToken) {
      case E_BEHAVIORS.MOVED:
        this.move(behaviorOptions as TBehaviorOptions<E_BEHAVIORS.MOVED>);
        break;
      default:
        break;
    }
  }

  move(behaviorOptions: TBehaviorOptions<E_BEHAVIORS.MOVED>): void {
    const { direction } = behaviorOptions;
    const moveBehavior = new MoveBehavior(E_DIMENSIONAL_ID.DIMENSIONAL2);
    const moveCalculator = moveBehavior.move(direction, {
      position: this.position,
      velocity: this.velocity,
    });
    const moveLine = moveCalculator.calculate();
    const position = moveLine.end;
    this.reduceOptions({
      position,
    });
  }

  update(): void {
    const behaviorPropertyToken = (Object.entries(this.behaviors.getAllProperties()) as [E_BEHAVIOR_PROPERTY, boolean][])
      .filter(([_, hasBehavior]) => hasBehavior)
      .map(([propertyToken, _]) => propertyToken);
    behaviorPropertyToken.forEach(this.takeBehavior.bind(this));
  }

  render(): void {
    if (!this._ctx) throw new Error('Context is not available');
    this._ctx.beginPath();
    this._ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this._ctx.fillStyle = this.color;
    this._ctx.fill();
    this._ctx.closePath();
  }
  
}