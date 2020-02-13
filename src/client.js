import path from 'path';
import * as Abstract from "abstract-sdk";
import { ABSTRACT_TOKEN } from './constants';

const client = new Abstract.Client({
  transportMode: ["api"],
  accessToken: ABSTRACT_TOKEN
});

export {
  client
}
