import { Injectable } from "@savafeed/module-manager";
import ConfigService from "@services/config.service";
import {
  TGetRenderingContext,
  E_RENDERING_CONTEXT_ID,
} from "#types";


@Injectable()
export default class CanvasService {
  private ctxMap: Map<E_RENDERING_CONTEXT_ID, TGetRenderingContext<E_RENDERING_CONTEXT_ID>> = new Map();
  
  constructor(
    private configService: ConfigService,
  ) {
    const context = this.configService.context;
    this.ctxMap.set(
      context,
      this.getContextById(context)
    );
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

  public clear<Context extends E_RENDERING_CONTEXT_ID>(context: Context) {
    const ctx = this.getContext(context);
    if (context === E_RENDERING_CONTEXT_ID.DIMENSIONAL2) {
      (ctx as TGetRenderingContext<E_RENDERING_CONTEXT_ID.DIMENSIONAL2>).clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
    } else {
      (ctx as TGetRenderingContext<E_RENDERING_CONTEXT_ID.WEBGL>).clearColor(1, 0.5, 0.7, 1);
      (ctx as TGetRenderingContext<E_RENDERING_CONTEXT_ID.WEBGL>).clear(
        (ctx as TGetRenderingContext<E_RENDERING_CONTEXT_ID.WEBGL>).COLOR_BUFFER_BIT
      );
    }
  }
}