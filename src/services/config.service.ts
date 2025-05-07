import { Inject, Injectable } from "@savafeed/module-manager";
import ConfigRepository from "@repositories/config.repository";
import {
  ICoreConfig,
  E_CORE_TOKENS,
} from "#types";


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

  public get context() {
    return this.configRepository.config.input.context;
  }
  
}