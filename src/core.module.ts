import { Module } from "@savafeed/module-manager";
import GameController from "@controllers/game.controller";
import ConfigRepository from "@repositories/config.repository";
import PackageRepository from "@repositories/package.repository";
import ConfigService from "@services/config.service";
import DrawService from "@services/draw.service";
import CanvasService from "@services/canvas.service";
import RenderingService from "@services/rendering.service";


@Module({
  name: 'core-app',
  providers: [
    // @repositories
    ConfigRepository,
    PackageRepository,
    // @services
    ConfigService,
    DrawService,
    CanvasService,
    RenderingService,
  ],
  controllers: [
    GameController,
  ],
})
export class CoreModule {};