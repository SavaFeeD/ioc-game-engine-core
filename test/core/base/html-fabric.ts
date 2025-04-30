import { FakeCanvasElement } from "./fake-elements";

export enum E_HTML_FABRIC_TAGS {
  CANVAS = 'canvas',
};


export default class HTMLFabric {

  public static createElement(tag: string) {
    const createElementMethod = HTMLFabric.getCreateElementMethodByTag(tag);
    if (!createElementMethod) throw new Error(`Tag (${tag}) is not supported`);
    return createElementMethod();
  }

  private static getCreateElementMethodByTag(tag: string) {
    if (!tag) throw new Error('Tag is not defined');
    let createElementMethod;
    switch (tag) {
      case E_HTML_FABRIC_TAGS.CANVAS:
        createElementMethod = HTMLFabric.createCanvas;
        break;
    }
    return createElementMethod;
  }

  private static createCanvas() {
    const canvas = new FakeCanvasElement() as HTMLCanvasElement;
    return canvas;
  }
}