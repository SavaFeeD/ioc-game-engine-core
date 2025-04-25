import { IBallEntity, IInitialBallEntity, IUpdateBallOptions } from "src/types/entities/ball2d.types";
import { E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";

export default class Ball2D implements IBallEntity {
  public readonly contextId: IBallEntity['contextId'] = E_RENDERING_CONTEXT_ID.DIMENSIONAL2;
  public position: IBallEntity['position'];
  public velocity: IBallEntity['velocity'];
  public radius: IBallEntity['radius'];
  public color: IBallEntity['color'];

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

  update(options: IUpdateBallOptions): void {
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

  render(): void {
    if (!this._ctx) throw new Error('Context is not available');
    this._ctx.beginPath();
    this._ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this._ctx.fillStyle = this.color;
    this._ctx.fill();
    this._ctx.closePath();
  }
}