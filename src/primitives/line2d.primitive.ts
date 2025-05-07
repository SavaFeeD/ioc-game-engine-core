import { Point2d } from "@primitives/point2d.primitive";

export class Line2d {
  constructor(
    public start: Point2d,
    public end: Point2d,
  ) {};

  distance(): number {
    return Math.sqrt(
      Math.pow(this.end.x - this.start.x, 2) +
      Math.pow(this.end.y - this.start.y, 2)
    );
  }
}