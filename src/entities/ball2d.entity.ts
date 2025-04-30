import { IBallEntity, IInitialBallEntity, IUpdateBallOptions } from "src/types/entities/ball2d.types";
import { E_DIMENSIONAL_ID, E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";
import BehaviorsEntity, { E_BEHAVIORS, TBehaviorProperty } from "./behaviors.entity";
import MoveBehavior from "./behaviors/move.behavior";
import { E_MOVE_DIRECTION } from "src/types/entities/behaviors/move.types";

export default class Ball2D implements IBallEntity {
  public readonly contextId: IBallEntity['contextId'] = E_RENDERING_CONTEXT_ID.DIMENSIONAL2;
  public position: IBallEntity['position'];
  public velocity: IBallEntity['velocity'];
  public radius: IBallEntity['radius'];
  public color: IBallEntity['color'];
  
  public behaviors: BehaviorsEntity = new BehaviorsEntity();
  public activeBehaviors: Map<E_BEHAVIORS, E_MOVE_DIRECTION> = new Map();

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

  reduce(options: IUpdateBallOptions): void {
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

  takeBehavior(behavior: TBehaviorProperty): void {
    switch(behavior) {
      case 'isMoved':
        if (this.activeBehaviors.has(E_BEHAVIORS.MOVED)) {
          const direction = this.activeBehaviors.get(E_BEHAVIORS.MOVED);
          if (!direction) {
            throw new Error(`Invalid direction: ${direction}!`);
          }
          this.move(direction);
        }
        break;
      default:
        throw new Error('Invalid behavior');
    }
  }

  move(direction: E_MOVE_DIRECTION): void {
    const moveBehavior = new MoveBehavior(E_DIMENSIONAL_ID.DIMENSIONAL2);
    const moveCalculator = moveBehavior.move(direction, {
      position: this.position,
      velocity: this.velocity,
    });
    const moveLine = moveCalculator.calculate();
    const position = moveLine.end;
    this.reduce({
      position,
    });
  }

  update(): void {
    const behaviors = Object.entries(this.behaviors)
      .filter(([_, hasBehavior]) => hasBehavior)
      .map(([behavior, _]) => behavior as TBehaviorProperty);
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