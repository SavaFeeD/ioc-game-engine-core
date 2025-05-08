import { Inject, Injectable } from "@savafeed/module-manager";
import ConfigRepository from "@repositories/config.repository";
import type {
  ICoreConfig,
} from "#types";
import {
  E_CORE_TOKENS,
} from "#shared.types";


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