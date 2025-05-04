import { Line2d } from "src/primitives/line2d.primitive";
import { Point2d } from "src/primitives/point2d.primitive";
import { E_MOVE_DIRECTION } from "src/types/entities/behaviors/move.types";
import { IPoint2d } from "src/types/entities/point2d.types";

export default class MoveCalculator3d {
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

    switch(this.direction) {
      case E_MOVE_DIRECTION.LEFT:
        this.velocity.x = -this.velocity.x;
        break;
      case E_MOVE_DIRECTION.RIGHT:
        this.velocity.x = Math.abs(this.velocity.x);
        break;
      case E_MOVE_DIRECTION.UP || E_MOVE_DIRECTION.FORWARD:
        this.velocity.y = -this.velocity.y;
        break;
      case E_MOVE_DIRECTION.DOWN || E_MOVE_DIRECTION.BACKWARD:
        this.velocity.y = Math.abs(this.velocity.y);
        break;
    }
    
    const end = new Point2d(
      this.position.x + this.velocity.x,
      this.position.y + this.velocity.y,
    );
    
    return new Line2d(start, end);
  }
}