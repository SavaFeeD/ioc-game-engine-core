import { container } from "@savafeed/module-manager";
import CoreModule from "./core.module";
import { E_CORE_TOKENS } from "./types/tokens.enum";
import { ICoreConfig } from "./types/config.interface";

export class Core {
  constructor(initialConfig: ICoreConfig) {
    container.registerInnerInject({
      token: E_CORE_TOKENS.CONFIG,
      useValue: initialConfig,
    });
    // container.providers.set(E_CORE_TOKENS.CONFIG, initialConfig);
    container.registerModule(CoreModule);
  }
}