import { Injectable } from "@savafeed/module-manager";
import PackageRepository from "src/repositories/package.repository";

@Injectable()
export default class RenderingService {
  constructor(
    private packageRepository: PackageRepository,
  ) {}

  
}