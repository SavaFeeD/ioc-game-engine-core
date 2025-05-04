import { IEntity } from "../entity.interface";
import { E_RENDERING_CONTEXT_ID } from "../rendering-context.enum";


export interface IBallEntity extends IEntity<E_RENDERING_CONTEXT_ID.DIMENSIONAL2> {
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
  radius: number;
  color: string;
  update(options: IUpdateBallOptions): void;
  render(): void;
}

export interface IUpdateBallOptions {
  position?: Partial<IBallEntity>['position'];
  velocity?: Partial<IBallEntity>['velocity'];
  radius?: Partial<IBallEntity>['radius'];
  color?: Partial<IBallEntity>['color'];
}

export interface IInitialBallEntity {
  position: Required<IBallEntity>['position'];
  velocity: Required<IBallEntity>['velocity'];
  radius: Required<IBallEntity>['radius'];
  color: Required<IBallEntity>['color'];
}
