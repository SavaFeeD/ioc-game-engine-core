import { Module } from "@savafeed/module-manager";
import GameController from "./controllers/game.controller";
import ConfigRepository from "./repositories/config.repository";
import ConfigService from "./services/config.service";
import DrawService from "./services/draw.service";
import CanvasService from "./services/canvas.service";
import PackageRepository from "./repositories/package.repository";


@Module({
  name: 'core',
  controllers: [
    GameController,
  ],
  providers: [
    // @repositories
    ConfigRepository,
    PackageRepository,
    // @services
    ConfigService,
    DrawService,
    CanvasService,
  ],
})
export default class CoreModule {};