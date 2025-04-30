import { AbstractModule, Module } from "@savafeed/module-manager";
import { GameController } from "./controllers/game.controller";
import { ConfigRepository } from "./repositories/config.repository";
import { ConfigService } from "./services/config.service";
import { DrawService } from "./services/draw.service";
import { CanvasService } from "./services/canvas.service";
import { PackageRepository } from "./repositories/package.repository";
import { RenderingService } from "./services/rendering.service";
import 'reflect-metadata';


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