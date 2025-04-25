import { Injectable } from "@savafeed/module-manager";
import { IEntity } from "src/types/entity.interface";
import { TPackageEntityByContextId } from "src/types/package-context.types";
import { IPackage } from "src/types/package.interface";
import { E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";

@Injectable()
export default class PackageRepository {
  private packages: Map<E_RENDERING_CONTEXT_ID, TPackageEntityByContextId<E_RENDERING_CONTEXT_ID>[]> = new Map();
  private treeContextById: Map<string, E_RENDERING_CONTEXT_ID> = new Map();
  
  constructor() {
    for (let context of Object.values(E_RENDERING_CONTEXT_ID)) {
      if (this.packages.has(context)) continue;
      this.packages.set(
        context,
        []
      );
    }
  }

  public addPackage(pkg: TPackageEntityByContextId<E_RENDERING_CONTEXT_ID>) {
    if (!pkg) throw new Error('Package not defined or rendering context not resolved');
    const packages = this.packages.get(pkg.renderType) || [];
    packages.push(pkg);
    this.packages.set(pkg.renderType, packages);
    this.treeContextById.set(pkg.id, pkg.renderType);
  }

  public getPackagesByContext<Context extends E_RENDERING_CONTEXT_ID>(context: Context): IPackage<Context, IEntity<Context>>[] {
    const packages = this.packages.get(context) || [];
    return (packages as unknown) as IPackage<Context, IEntity<Context>>[];
  }

  public getPackageById<Context extends E_RENDERING_CONTEXT_ID>(id: string): IPackage<Context, IEntity<Context>> | null {
    const context = this.shakeTree<Context>(id);
    if (context) {
      const packages = this.getPackagesByContext(context);
      return packages.find((pkg) => pkg.id === id) || null;
    } else {
      const pkg = this.findPackageById<Context>(id);
      return pkg;
    };
  }

  public findPackageById<Context extends E_RENDERING_CONTEXT_ID>(id: string): IPackage<Context, IEntity<Context>> | null {
    let result: IPackage<Context, IEntity<Context>> | null = null;
    for (let [context, packages] of this.packages.entries()) {
      const pkg = packages.find((pkg) => {});
      if (pkg) {
        if (!this.treeContextById.has(id)) {
          this.treeContextById.set(id, context);
        }
        result = (pkg as unknown) as IPackage<Context, IEntity<Context>>;
        break;
      }
    }
    return result;
  }

  private shakeTree<Context extends E_RENDERING_CONTEXT_ID>(id: string): Context | undefined {
    let tempContext = this.treeContextById.get(id) as Context | undefined;
    return tempContext;
  }
};