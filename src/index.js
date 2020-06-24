import path from 'path';
import fs from 'fs';
import { client } from './client';
import { ABSTRACT_PROJECT_ID, ABSTRACT_BRANCH, ABSTRACT_FILE_NAME, TEMP_PATH } from './constants';
import { doLog } from './log';
import { Sketch } from 'sketch-constructor';
import { cleanSymbol } from './sketchCleaners';
import { namedObjArrayToKeyVals } from './utils';

async function getMasterHead() {
  const masterBranchInfo = await client.branches.info({
    projectId: ABSTRACT_PROJECT_ID,
    branchId: "master"
  });

  return masterBranchInfo.head;
}

async function getProjectFiles(sha) {
  const files = await client.files.list({
    branchId: ABSTRACT_BRANCH,
    projectId: ABSTRACT_PROJECT_ID,
    sha: sha || "latest"
  });

  return files;
}

async function getFileData(name, sha) {
  const files = await getProjectFiles(sha);
  return files.find(file => file.name === name);
}

async function downloadRawFile({ file, outputPath, withFS }) {
  const result = await client.files.raw({
    projectId: ABSTRACT_PROJECT_ID,
    branchId: ABSTRACT_BRANCH,
    fileId: file.id,
    sha: file.sha
  }, withFS ? {
    filename: outputPath
  } : {
    disableWrite: true
  });

  return result;
}

async function getSketchFileWithFS({ file, fromSHA }) {
  const outputPath = `${TEMP_PATH}/${file.sha}.sketch`;
  const fileExists = fs.existsSync(outputPath);

  if(!fileExists) {
    doLog('\nabstractconnect: downloading data... ==\n');
    const result = await downloadRawFile({ file, outputPath, withFS });
  }

  return outputPath;
}

async function getSketchFile({ fromSHA, withFS }) {
  const file = await getFileData(ABSTRACT_FILE_NAME, fromSHA);
  const withFSRes = withFS && await getSketchFileWithFS({ file, fromSHA });
  const withBufferRes = !withFS && await downloadRawFile({ file, withFS });
  return withFS ? withFSRes : withBufferRes && Buffer.from(withBufferRes);
}

async function getSymbols({ raw, filter, fromSHA, withFS }) {
  const sketchFile = await getSketchFile({ fromSHA, withFS }).catch(e => console.error(e));
  const sketchFileData = await Sketch.fromFile(sketchFile);

  // sketch creates a special page for all the symbols
  const allSymbols = sketchFileData.pages.find(page => page.name === "Symbols");

  // they're read as layers though
  const ensuredSymbols = allSymbols.layers.filter(symbolLayer => symbolLayer._class === "symbolMaster")

  // apply filter if passed
  const filteredSymbols = filter ? ensuredSymbols.filter(filter) : ensuredSymbols;

  // clean up the obj model by default
  const refined = raw === true ? filteredSymbols : filteredSymbols.map(cleanSymbol);

  // send it back in a nice format!
  return namedObjArrayToKeyVals(refined);
}

export {
  getMasterHead,
  getProjectFiles,
  getFileData,
  downloadRawFile,
  getSymbols
}
