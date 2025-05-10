import type {
  IPoint2d,
} from "#types";
import {
  E_MOVE_DIRECTION,
} from "#shared.types";
import { Line2d } from "@primitives/line2d.primitive";
import { Point2d } from "@primitives/point2d.primitive";


export default class MoveCalculator2d {
  constructor(
    private position: IPoint2d,
    private velocity: IPoint2d,
    private direction: E_MOVE_DIRECTION,
  ) {}

  public calculate(): Line2d {
    const start = new Point2d(
      this.position.x,
      this.position.y,
    );
    const velocity = new Point2d(
      this.velocity.x,
      this.velocity.y,
    );

    switch(this.direction) {
      case E_MOVE_DIRECTION.LEFT:
        velocity.x = -this.velocity.x;
        velocity.y = 0;
        break;
      case E_MOVE_DIRECTION.RIGHT:
        velocity.x = Math.abs(this.velocity.x);
        velocity.y = 0;
        break;
      case E_MOVE_DIRECTION.UP || E_MOVE_DIRECTION.FORWARD:
        velocity.x = 0;
        velocity.y = -this.velocity.y;
        break;
      case E_MOVE_DIRECTION.DOWN || E_MOVE_DIRECTION.BACKWARD:
        velocity.x = 0;
        velocity.y = Math.abs(this.velocity.y);
        break;
    }
    
    const end = new Point2d(
      this.position.x + velocity.x,
      this.position.y + velocity.y,
    );
    
    return new Line2d(start, end);
  }
}