import { Combine } from "./core/base/combine";
import {
  defaultCase,
  coreCase,
  entityCase,
} from "./specs";


const combine = new Combine(
  defaultCase,
  coreCase,
  entityCase,
);
combine.run();