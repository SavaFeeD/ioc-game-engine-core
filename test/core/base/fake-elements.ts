export class FakeCanvasElement {
  width: number = 100;
  height: number = 100;
  
  constructor() {}

  getContext(contextId: string) {
    switch (contextId) {
      case '2d':
        return {};
      case 'webgl':
        return {};
      case 'webgl2':
        return {};
      case 'bitmaprenderer':
        return {};
    }
  }
}