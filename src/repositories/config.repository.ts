import { Injectable } from "@savafeed/module-manager";
import { ICoreConfig } from "#types";


@Injectable()
export default class ConfigRepository {
  private CONFIG: ICoreConfig | null = null;

  public get config() {
    if (!this.CONFIG) throw new Error('Config is not set');
    return this.CONFIG;
  }

  public set config(config: ICoreConfig) {
    if (!config) throw new Error('Parameter "config" is required');
    this.CONFIG = config;
  }

}