require('dotenv').config();

// utility
const LOG_LEVEL = process.env.LOG_LEVEL;

// abstract stuff
const ABSTRACT_TOKEN = process.env.ABSTRACT_TOKEN;
const ABSTRACT_PROJECT_ID = process.env.ABSTRACT_PROJECT_ID;
const ABSTRACT_BRANCH = process.env.ABSTRACT_BRANCH || "master";
const ABSTRACT_FILE_NAME = process.env.ABSTRACT_FILE_NAME;

// fs paths
const TEMP_PATH = process.env.TEMP_PATH || process.cwd() + '/temp';

export {
  LOG_LEVEL,
  ABSTRACT_PROJECT_ID,
  ABSTRACT_TOKEN,
  ABSTRACT_FILE_NAME,
  TEMP_PATH,
  ABSTRACT_BRANCH
}
