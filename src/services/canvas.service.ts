import { Injectable } from "@savafeed/module-manager";
import { ConfigService } from "./config.service";
import { TGetRenderingContext } from "src/types/rendering-context.types";
import { E_RENDERING_CONTEXT_ID } from "src/types/rendering-context.enum";


@Injectable()
export class CanvasService {
  private ctxMap: Map<E_RENDERING_CONTEXT_ID, TGetRenderingContext<E_RENDERING_CONTEXT_ID>> = new Map();
  
  constructor(
    private configService: ConfigService,
  ) {
    for (let context of Object.values(E_RENDERING_CONTEXT_ID)) {
      if (this.ctxMap.has(context)) continue;
      this.ctxMap.set(
        context,
        this.getContextById(context)
      );
    }
  }

  public getCanvas() {
    return this.configService.canvas;
  }

  public getContext<Context extends E_RENDERING_CONTEXT_ID>(context: Context) {
    if (!this.ctxMap.has(context)) throw new Error(`Context (${context}) is not available`);
    const ctx = this.ctxMap.get(context);
    if (!ctx) throw new Error(`Context (${context}) is not available`);
    return ctx as TGetRenderingContext<Context>;
  }

  private getContextById<Context extends E_RENDERING_CONTEXT_ID>(context: Context): TGetRenderingContext<Context> {
    const ctx = this.getCanvas().getContext(context) as TGetRenderingContext<Context> | null;
    if (!ctx) throw new Error(`Context (${context}) is not available`);
    return ctx;
  }
}