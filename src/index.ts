import { container } from '@savafeed/module-manager';
import { Core } from './core';
import Ball2D from '@entities/ball2d.entity';
import BehaviorsEntity from '@entities/behaviors.entity';
import MoveCalculator2d from '@behaviors/move-calculator2d';
import MoveCalculator3d from '@behaviors/move-calculator3d';
import MoveBehavior from '@behaviors/move.behavior';


export {
  // @core
  Core,
  container,
  // @entities
  BehaviorsEntity,
  MoveBehavior,
  Ball2D,
  MoveCalculator2d,
  MoveCalculator3d,
};