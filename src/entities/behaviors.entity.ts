import type {
  TActiveBehavior,
  TBehaviorOptions,
} from "#types";
import {
  E_BEHAVIOR_PROPERTY,
  E_BEHAVIORS,
} from "#shared.types";


export default class BehaviorsEntity {
  private _properties = {
    [E_BEHAVIOR_PROPERTY.MOVED]: false,
    [E_BEHAVIOR_PROPERTY.ROTATED]: false,
    [E_BEHAVIOR_PROPERTY.SCALED]: false,
    [E_BEHAVIOR_PROPERTY.TRANSLATED]: false,
    [E_BEHAVIOR_PROPERTY.TRANSFORMED]: false,
    [E_BEHAVIOR_PROPERTY.ANIMATED]: false,
  };
  
  public activeBehaviors: Map<E_BEHAVIORS, TActiveBehavior<E_BEHAVIORS>> = new Map();
  private behaviorsOptions: Map<E_BEHAVIORS, TBehaviorOptions<E_BEHAVIORS>> = new Map();

  reduceProperty(property: E_BEHAVIOR_PROPERTY, value: boolean) {
    this._properties[property] = value;
  }

  getProperty(property: E_BEHAVIOR_PROPERTY) {
    return this._properties[property];
  }

  getAllProperties() {
    return this._properties;
  }

  setBehaviorOptions(behaviorToken: E_BEHAVIORS, options: TBehaviorOptions<E_BEHAVIORS>) {
    this.behaviorsOptions.set(behaviorToken, options);
  }

  getBehaviorOptions<Token extends E_BEHAVIORS>(behaviorToken: Token) {
    return this.behaviorsOptions.get(behaviorToken) as TBehaviorOptions<Token>;
  }

  getActiveBehavior<Behavior extends E_BEHAVIORS>(behavior: Behavior) {
    return this.activeBehaviors.get(behavior) as TActiveBehavior<Behavior>;
  }

  setActiveBehavior<Behavior extends E_BEHAVIORS>(behavior: Behavior) {
    const maxOrder = Array.from(this.activeBehaviors.entries()).reduce((prev, curr) => {
      if (curr[1]?.order === undefined) return prev; 
      return (prev < curr[1].order) ? curr[1].order : prev;
    }, 0);
    const order = maxOrder + 1;
    const activeBehaviorValue: TActiveBehavior<Behavior> = {
      token: behavior,
      order, 
    };
    this.activeBehaviors.set(behavior, activeBehaviorValue);
  }

  removeActiveBehavior<Behavior extends E_BEHAVIORS>(behavior: Behavior, filter?: TBehaviorOptions<Behavior>) {
    if (!this.activeBehaviors.has(behavior)) return;

    if (filter) {
      const behaviorOptions = this.behaviorsOptions.get(behavior);
      if (!!behaviorOptions) {
        if (typeof behaviorOptions === 'object') {
          let isMatch = true;
          const entryFilter = Object.entries(filter);
          if (!entryFilter.length) {
            isMatch = false;
          }
          entryFilter.forEach(([key, value]) => {
            if (behaviorOptions[key] !== value) {
              isMatch = false;
            }
          });
          if (isMatch) {
            this.activeBehaviors.delete(behavior);
          }
        } else {
          if (behaviorOptions === filter) {
            this.activeBehaviors.delete(behavior);
          }
        }
      }
    } else {
      this.activeBehaviors.delete(behavior);
    }
  }

  hasBehavior<Behavior extends E_BEHAVIORS>(behavior: Behavior) {
    return this.activeBehaviors.has(behavior);
  }

  hasActiveBehavior<Behavior extends E_BEHAVIORS>(behavior: Behavior) {
    return this.activeBehaviors.has(behavior);
  }

  hasBehaviorOptions<Behavior extends E_BEHAVIORS>(behavior: Behavior) {
    return this.behaviorsOptions.has(behavior);
  }

  getBehaviorTokenByPropertyToken(behaviorProperty: E_BEHAVIOR_PROPERTY) {
    const comparison = {
      [E_BEHAVIOR_PROPERTY.MOVED]: E_BEHAVIORS.MOVED,
      [E_BEHAVIOR_PROPERTY.ANIMATED]: E_BEHAVIORS.ANIMATED,
      [E_BEHAVIOR_PROPERTY.ROTATED]: E_BEHAVIORS.ROTATED,
      [E_BEHAVIOR_PROPERTY.SCALED]: E_BEHAVIORS.SCALED,
      [E_BEHAVIOR_PROPERTY.TRANSLATED]: E_BEHAVIORS.TRANSLATED,
      [E_BEHAVIOR_PROPERTY.TRANSFORMED]: E_BEHAVIORS.TRANSFORMED,
    }
    return comparison[behaviorProperty];
  }

  validateBehavior<Behavior extends E_BEHAVIORS>(behavior: Behavior) {
    if (!this.hasBehavior(behavior)) return false;
    if (!this.hasActiveBehavior(behavior)) return false;
    if (!this.hasBehaviorOptions(behavior)) return false;
    return true;
  }

  getActiveBehaviorToken<Behavior extends E_BEHAVIORS>(behavior: Behavior) {
    const activeBehavior = this.getActiveBehavior(behavior);
    if (!activeBehavior) {
      throw new Error(`Behavior ${behavior} is not active!`);
    }
    const { token } = activeBehavior;
    return token;
  }

  getActiveBehaviorOptions<Token extends E_BEHAVIORS>(token: Token) {
    const behaviorOptions = this.getBehaviorOptions(token);
    if (!behaviorOptions) {
      throw new Error(`Behavior options for ${token} is not defined!`);
    }
    return behaviorOptions;
  }
}