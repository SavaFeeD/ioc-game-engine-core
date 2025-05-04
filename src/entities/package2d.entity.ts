import { IInitialPackage2DEntity, TPackage2DEntity } from "src/types/entities/package2d.types";
import { E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";
import UUID from "src/utils/uuid";


export default class Package2DEntity implements TPackage2DEntity {
  public id: TPackage2DEntity['id'] = UUID.generate();
  public renderOrder: TPackage2DEntity['renderOrder'] = 0;
  public renderType: TPackage2DEntity['renderType'] = E_RENDERING_CONTEXT_ID.DIMENSIONAL2;
  public entity: TPackage2DEntity['entity'];
  public estimatedRendering: boolean = true;

  constructor(initial: Required<IInitialPackage2DEntity>) {
    this.entity = initial.entity;
  }

  get update() {
    return this.entity.update;
  }

  get render() {
    return this.entity.render;
  }
}