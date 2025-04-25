import { Injectable } from "@savafeed/module-manager";
import { ICoreConfig } from "src/types/config.interface";

@Injectable()
export default class ConfigRepository {
  private CONFIG: ICoreConfig | null = null;

  public get config() {
    if (!this.CONFIG) throw new Error('Config is not set');
    return this.CONFIG;
  }

  public set config(config: ICoreConfig) {
    this.CONFIG = config;
  }

}