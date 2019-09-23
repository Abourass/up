import fs from 'fs';
import path from 'path';
import {asyncForEach} from './asyncForEach.mjs';

const clientDB = JSON.parse(fs.readFileSync(path.join('db', 'clientDB.json'), 'utf8')),
  projectDB = JSON.parse(fs.readFileSync(path.join('db', 'projectDB.json'), 'utf8'));

export const addProjectID = async({convert, name} = {}) => {
  const correctedArray = [];
  await asyncForEach(clientDB, async(client) => {
    if (client.name === name){
      await asyncForEach(projectDB, async(project) => {
        if (project.client === client._id){
          await asyncForEach(convert, async(jsonObj) => {
            jsonObj.project = project._id;
            correctedArray.push(jsonObj);
          });
          return project._id;
        }
      });
    }
  });
  return correctedArray;
};
export default {addProjectID};
