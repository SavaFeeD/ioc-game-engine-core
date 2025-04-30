import { Container } from "@savafeed/module-manager";
import { CoreModule } from "./core.module";
import {
  E_CONTOROLLERS_TOKENS,
  E_CORE_TOKENS,
  ICoreConfig,
  TControllerMapper,
} from "./types";


export class Core {
  constructor(
    private appContainer: Container,
    private initialConfig: ICoreConfig,
  ) {
    this.appContainer.registerInnerInject({
      token: E_CORE_TOKENS.CONFIG,
      useValue: this.initialConfig,
    });
    this.appContainer.registerModule(CoreModule);
  }
  
  public getController<TOKEN extends E_CONTOROLLERS_TOKENS>(token: E_CONTOROLLERS_TOKENS): TControllerMapper<TOKEN> | undefined {
    return this.appContainer.getController<TControllerMapper<TOKEN>>(token);
  }

  public test() {
    const controllerTokens: E_CONTOROLLERS_TOKENS[] = [
      E_CONTOROLLERS_TOKENS.GAME,
    ];
    controllerTokens.forEach((token) => {
      const controller = this.getController(token);
      if (!controller) {
        throw new Error('Controller is not defined');
      }
      controller.test();
    })
  }
}