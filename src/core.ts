import { Container } from "@savafeed/module-manager";
import { E_CONTOROLLERS_TOKENS, E_CORE_TOKENS } from "./types/tokens.enum";
import { ICoreConfig } from "./types/config.interface";
import { CoreModule } from "./core.module";
import { AbstractGameController } from "./types/controllers.abstract";

export class Core {

  constructor(
    public appContainer: Container,
    private initialConfig: ICoreConfig,
  ) {
    this.appContainer.registerInnerInject({
      token: E_CORE_TOKENS.CONFIG,
      useValue: this.initialConfig,
    });
    this.appContainer.registerModule(CoreModule);
  }
  
  public test() {
    const gameController = this.appContainer.getController<AbstractGameController>(E_CONTOROLLERS_TOKENS.GAME);
    [gameController].forEach((controller) => {
      if (!controller) {
        throw new Error('Controller is not defined');
      }
      controller.test();
    })
  }
}