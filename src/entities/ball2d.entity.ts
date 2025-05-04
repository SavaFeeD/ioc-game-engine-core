import { IBallEntity, IInitialBallEntity, IUpdateBallOptions } from "src/types/entities/ball2d.types";
import { E_DIMENSIONAL_ID, E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";
import BehaviorsEntity from "./behaviors.entity";
import MoveBehavior from "./behaviors/move.behavior";
import { E_MOVE_DIRECTION } from "src/types/entities/behaviors/move.types";
import { E_BEHAVIOR_PROPERTY, E_BEHAVIORS } from "src/types/entities/behaviors/behavior.enum";
import { TActiveBehavior } from "src/types/entities/behaviors/behavior.types";


export default class Ball2D implements IBallEntity {
  public readonly contextId: IBallEntity['contextId'] = E_RENDERING_CONTEXT_ID.DIMENSIONAL2;
  public position: IBallEntity['position'];
  public velocity: IBallEntity['velocity'];
  public radius: IBallEntity['radius'];
  public color: IBallEntity['color'];
  
  public behaviors: BehaviorsEntity = new BehaviorsEntity();
  public activeBehaviors: Map<E_BEHAVIORS, TActiveBehavior<E_BEHAVIORS>> = new Map();

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
    this.behaviors.reduce(behavior, true);
  }

  unsetAvailableBehavior(behavior: E_BEHAVIOR_PROPERTY) {
    this.behaviors.reduce(behavior, false);
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
    return this.activeBehaviors.get(behavior) as TActiveBehavior<Behavior>;
  }

  setActiveBehavior<Behavior extends E_BEHAVIORS>(behavior: Behavior) {
    const maxOrder = Array.from(this.activeBehaviors.entries()).reduce((prev, curr) => {
      if (curr[1]?.order === undefined) return prev; 
      return (prev < curr[1].order) ? curr[1].order : prev;
    }, 0);
    const order = maxOrder + 1;
    const activeBehaviorValue: TActiveBehavior<Behavior> = {
      token: behavior,
      order, 
    };
    this.activeBehaviors.set(behavior, activeBehaviorValue);
  }

  takeBehavior(behavior: E_BEHAVIOR_PROPERTY): void {
    switch(behavior) {
      case E_BEHAVIOR_PROPERTY.MOVED:
        this.takeMoveBehavior();
        break;
      default:
        throw new Error('Invalid behavior');
    }
  }

  takeMoveBehavior() {
    if (!this.activeBehaviors.has(E_BEHAVIORS.MOVED)) return;
    const activeBehavior = this.getActiveBehavior(E_BEHAVIORS.MOVED);
    if (!activeBehavior) return;
    const { token } = activeBehavior;
    if (!token) {
      throw new Error(`Invalid token: ${token}!`);
    }
    const { direction } = this.behaviors.getBehaviorOptions(token);
    if (!direction) {
      throw new Error(`Invalid direction: ${direction}!`);
    }
    this.move(direction);
  }

  move(direction: E_MOVE_DIRECTION): void {
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
    const behaviors = Object.entries(this.behaviors)
      .filter(([_, hasBehavior]) => hasBehavior)
      .map(([behavior, _]) => behavior);
    behaviors.forEach(this.takeBehavior.bind(this));
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