import { IEntity } from "./entity.interface";

export abstract class AbstractGameController {
  abstract test(): void;
  abstract addEntity(entity: IEntity<any>): void;
}