import { Inject, Injectable } from "@savafeed/module-manager";
import ConfigRepository from "src/repositories/config.repository";
import { ICoreConfig } from "src/types/config.interface";
import { E_CORE_TOKENS } from "src/types/tokens.enum";


@Injectable()
export default class ConfigService {

  constructor(
    @Inject(E_CORE_TOKENS.CONFIG) private initialConfig: ICoreConfig,
    private configRepository: ConfigRepository,
  ) {
    this.init();
  }

  private init() {
    this.configRepository.config = this.initialConfig;
  }

  public get canvas() {
    return this.configRepository.config.input.canvas;
  }
  
}