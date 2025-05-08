import type {
  IPoint2d,
  IPoint3d,
} from "#types";
import {
  MoveCalculator2d,
  MoveCalculator3d,
} from "#src";
import { E_DIMENSIONAL_ID } from "../../rendering-context.types";


export type TPositionDimensionalMap = {
  [E_DIMENSIONAL_ID.DIMENSIONAL2]: IPoint2d,
  [E_DIMENSIONAL_ID.DIMENSIONAL3]: IPoint3d,
}
export type TVelocityDimensionalMap = {
  [E_DIMENSIONAL_ID.DIMENSIONAL2]: IPoint2d,
  [E_DIMENSIONAL_ID.DIMENSIONAL3]: IPoint3d,
}

export type TPosition<Dimension extends E_DIMENSIONAL_ID> = TPositionDimensionalMap[Dimension];
export type TVelocity<Dimension extends E_DIMENSIONAL_ID> = TVelocityDimensionalMap[Dimension];

export interface IMoveParams<Dimension extends E_DIMENSIONAL_ID> {
  position: TPosition<Dimension>,
  velocity: TVelocity<Dimension>,
}

export enum E_MOVE_DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down',
  FORWARD = 'forward',
  BACKWARD = 'backward',
}

export type TMoveCalculatorMap = {
  [E_DIMENSIONAL_ID.DIMENSIONAL2]: typeof MoveCalculator2d,
  [E_DIMENSIONAL_ID.DIMENSIONAL3]: typeof MoveCalculator3d,
};