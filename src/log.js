import { LOG_LEVEL } from './constants';

function doLog(stuff) {
  return LOG_LEVEL !== 'silent' && console.log(stuff);
}

export {
  doLog
}
