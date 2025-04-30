import { Injectable } from "@savafeed/module-manager";
import { PackageRepository } from "src/repositories/package.repository";


@Injectable()
export class RenderingService {
  constructor(
    private packageRepository: PackageRepository,
  ) {}

  
}