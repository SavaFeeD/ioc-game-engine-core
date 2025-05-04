import { E_BEHAVIOR_PROPERTY, E_BEHAVIORS } from "src/types/entities/behaviors/behavior.enum";
import { TBehaviorOptions } from "src/types/entities/behaviors/behavior.types";


export default class BehaviorsEntity {
  public [E_BEHAVIOR_PROPERTY.MOVED]: boolean = false;
  public [E_BEHAVIOR_PROPERTY.ROTATED]: boolean = false;
  public [E_BEHAVIOR_PROPERTY.SCALED]: boolean = false;
  public [E_BEHAVIOR_PROPERTY.TRANSLATED]: boolean = false;
  public [E_BEHAVIOR_PROPERTY.TRANSFORMED]: boolean = false;
  public [E_BEHAVIOR_PROPERTY.ANIMATED]: boolean = false;
  
  private behaviorsOptions: Map<E_BEHAVIORS, TBehaviorOptions[E_BEHAVIORS]> = new Map();

  reduce(property: E_BEHAVIOR_PROPERTY, value: boolean) {
    this[property] = value;
  }

  setBehaviorOptions(behaviorToken: E_BEHAVIORS, options: TBehaviorOptions[E_BEHAVIORS]) {
    this.behaviorsOptions.set(behaviorToken, options);
  }

  getBehaviorOptions<Token extends E_BEHAVIORS>(behaviorToken: Token) {
    return this.behaviorsOptions.get(behaviorToken) as TBehaviorOptions[Token];
  }
}