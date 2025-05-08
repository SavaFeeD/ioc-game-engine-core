import { Injectable } from "@savafeed/module-manager";
import PackageRepository from "@repositories/package.repository";
import type { 
  IPackage,
  IEntity,
} from "#types";
import {
  E_RENDERING_CONTEXT_ID,
} from "#shared.types";


@Injectable()
export default class RenderingService {
  private renderingPackages: IPackage<E_RENDERING_CONTEXT_ID, IEntity<E_RENDERING_CONTEXT_ID>>[] = [];

  constructor(
    private packageRepository: PackageRepository,
  ) {}

  updateRenderingPackages<Context extends E_RENDERING_CONTEXT_ID>(context: Context) {
    const packages = this.packageRepository.getPackagesByContext(context);
    this.renderingPackages = this.sortPackagesByRenderOrder(packages);
  }

  renderFrame() {
    for (const packageEntity of this.renderingPackages) {
      if (!packageEntity.estimatedRendering) continue;
      packageEntity.update();
      packageEntity.render();
    }
  }

  private sortPackagesByRenderOrder<Context extends E_RENDERING_CONTEXT_ID>(packages: IPackage<Context, IEntity<Context>>[]) {
    const sortedPackages = packages.sort((a, b) => {
      if (a.renderOrder === undefined) return 1;
      if (b.renderOrder === undefined) return -1;
      return a.renderOrder - b.renderOrder;
    });
    return (sortedPackages as unknown) as IPackage<E_RENDERING_CONTEXT_ID, IEntity<E_RENDERING_CONTEXT_ID>>[];
  }
}