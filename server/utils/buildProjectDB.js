const fs = require('fs-extra');
const path = require('path');
const {Project} = require('../modules/database.js');
const {asyncForEach} = require('../modules/asyncForEach.js');
const {myGetDate} = require('../modules/date.js');

function wasCreatedToday(currentValue){
  if (currentValue == null) { return false; }
  return myGetDate(currentValue.created).toString() === myGetDate().toString();
}

const buildProjectDB = async() => {
  try {
    const clientDB = Array.from(JSON.parse(fs.readFileSync(path.join('db', 'clientDB.json'), 'utf-8'))), projectDB = [];
    await asyncForEach(clientDB, async(client, i) => {
      console.log(`Projects finished: ${i}/${clientDB.length - 1}`);
      const foundProjects = await Project.find({client: client._id});
      if (foundProjects.length === 0) {
        const tempProject = new Project({name: `${client.name}-${myGetDate()}`, client: client._id}), savedProject = await tempProject.save();
        projectDB.unshift(savedProject);
        fs.writeFileSync(path.join('db', 'projectDB.json'), JSON.stringify(projectDB, null, 2));
      } else if (foundProjects.every(wasCreatedToday) === false) {
        const tempProject = new Project({
            name: `${client.name}-${myGetDate()}`,
            client: client._id,
          }), savedProject = await tempProject.save();
        projectDB.unshift(savedProject);
        fs.writeFileSync(path.join('db', 'projectDB.json'), JSON.stringify(projectDB, null, 2));
      } else {
        foundProjects.forEach((project) => {
          if (wasCreatedToday(project.created)) {
            projectDB.unshift(project);
            fs.writeFileSync(path.join('db', 'projectDB.json'), JSON.stringify(projectDB, null, 2));
          }
        });
      }
    });
    process.exit(0);
  } catch (err){
    console.error(err);
  }
};
buildProjectDB();
