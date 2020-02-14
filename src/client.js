import path from 'path';
import { Client } from "abstract-sdk";
import { ABSTRACT_TOKEN } from './constants';

const client = new Client({
  transportMode: ["api"],
  accessToken: ABSTRACT_TOKEN
});

export {
  client
}
