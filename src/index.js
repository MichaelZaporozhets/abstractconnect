import path from 'path';
import fs from 'fs';
import { client } from './client';
import { ABSTRACT_PROJECT_ID, ABSTRACT_BRANCH, ABSTRACT_FILE_NAME, TEMP_PATH } from './constants';
import { doLog } from './log';

async function getMasterHead() {
  const masterBranchInfo = await client.branches.info({
    projectId: ABSTRACT_PROJECT_ID,
    branchId: "master"
  });

  return masterBranchInfo.head;
}

async function getProjectFiles() {
  const files = await client.files.list({
    branchId: ABSTRACT_BRANCH,
    projectId: ABSTRACT_PROJECT_ID,
    sha: "latest"
  });

  return files;
}

async function getFileByName(name) {
  const files = await getProjectFiles();
  return files.find(file => file.name === name);
}

async function downloadRawFile(file, outputPath) {
  const result = await client.files.raw({
    projectId: ABSTRACT_PROJECT_ID,
    branchId: ABSTRACT_BRANCH,
    fileId: file.id,
    sha: file.sha
  }, {
    filename: outputPath
  });
}

async function getLatestAsSketchFile() {
  const file = await getFileByName(ABSTRACT_FILE_NAME);

  const outputPath = `${TEMP_PATH}/${file.sha}.sketch`;

  if(!fs.existsSync(outputPath)) {
    doLog('\nabstractconnect: downloading data... ==\n');
    const result = await downloadRawFile(file, outputPath);
  }
}

getLatestAsSketchFile().then(console.log).catch(console.error);
