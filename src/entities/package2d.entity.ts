import type {
  IInitialPackage2DEntity,
  TPackage2DEntity,
} from "#types";
import UUID from "@utils/uuid";
import {
  E_RENDERING_CONTEXT_ID,
} from "#shared.types";


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
    return this.entity.update.bind(this.entity);
  }

  get render() {
    return this.entity.render.bind(this.entity);
  }
}