import { Combine } from "./core/base/combine";
import {
  defaultCase,
  coreCase,
} from "./specs";


const combine = new Combine(
  defaultCase,
  coreCase,
);
combine.run();