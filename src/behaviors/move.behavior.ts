import {
  E_DIMENSIONAL_ID,
  E_MOVE_DIRECTION,
  IMoveParams,
  TMoveCalculatorMap,
} from "#types";
import { MoveCalculator2d, MoveCalculator3d } from "#src";


export default class MoveBehavior<Dimension extends E_DIMENSIONAL_ID> {
  private calculator: TMoveCalculatorMap[Dimension];

  constructor(private dimension: Dimension) {
    switch (this.dimension) {
      case E_DIMENSIONAL_ID.DIMENSIONAL2:
        this.calculator = MoveCalculator2d as TMoveCalculatorMap[Dimension];
        break;
      case E_DIMENSIONAL_ID.DIMENSIONAL3:
        this.calculator = MoveCalculator3d as TMoveCalculatorMap[Dimension];
        break;
      default:
        throw new Error('Invalid dimension');
    }
  }

  public move(direction: E_MOVE_DIRECTION, options: IMoveParams<Dimension>) {
    switch (direction) {
      case E_MOVE_DIRECTION.LEFT:
        return this.moveLeft(options);
        break;
      case E_MOVE_DIRECTION.RIGHT:
        return this.moveRight(options);
        break;
      case E_MOVE_DIRECTION.UP:
        return this.moveUp(options);
        break;
      case E_MOVE_DIRECTION.DOWN:
        return this.moveDown(options);
        break;
      case E_MOVE_DIRECTION.FORWARD:
        return this.moveForward(options);
        break;
      case E_MOVE_DIRECTION.BACKWARD:
        return this.moveBackward(options);
      default:
        throw new Error('Invalid direction');
    }
  }

  private moveLeft(options: IMoveParams<Dimension>) {
    const { position, velocity } = options;
    return new this.calculator(position, velocity, E_MOVE_DIRECTION.LEFT);
  }

  private moveRight(options: IMoveParams<Dimension>) {
    const { position, velocity } = options;
    return new this.calculator(position, velocity, E_MOVE_DIRECTION.RIGHT);
  }

  private moveUp(options: IMoveParams<Dimension>) {
    const { position, velocity } = options;
    return new this.calculator(position, velocity, E_MOVE_DIRECTION.UP);
  }

  private moveDown(options: IMoveParams<Dimension>) {
    const { position, velocity } = options;
    return new this.calculator(position, velocity, E_MOVE_DIRECTION.DOWN);
  }

  private moveForward(options: IMoveParams<Dimension>) {
    const { position, velocity } = options;
    return new this.calculator(position, velocity, E_MOVE_DIRECTION.FORWARD);
  }

  private moveBackward(options: IMoveParams<Dimension>) {
    const { position, velocity } = options;
    return new this.calculator(position, velocity, E_MOVE_DIRECTION.BACKWARD);
  }
}