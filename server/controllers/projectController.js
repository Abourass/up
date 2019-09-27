const Project = require('../models/projectModel.js');
const {myGetDate} = require('../modules/date.js');

class ProjectController {
  async find(ctx) { ctx.body = await Project.find();} // Get all projects
  async findByClient(client) { // Find a Client
    try {
      const project = await Project.findOne({client: client});
      if (!project) {console.error('No projects found for this client') }
      return project;
    } catch (err) { console.error(err) }
  }
  async add(clientID, clientName) { // Create a new project
    try {
      const currentProjects = await this.findByClient(clientID);
      if (!currentProjects){
        const newProject = new Project({
          projects: [{
            name: `${clientName}-${myGetDate()}`,
            date: Date.now(),
          }],
          client: clientID
        });
        await newProject.save();
        return newProject.projects[0]._id;
      } else {
        const check = await this.check(clientID);
        if (!check) {
          currentProjects.projects.unshift({
            name: `${clientName}-${myGetDate()}`,
            date: Date.now(),
          });
          await currentProjects.save();
          return currentProjects.projects[0]._id;
        } else {
          return check.id;
        }
      }
    } catch (err) { console.error(err) }
  }
  async check(client) {
    const currentProjects = await this.findByClient(client);
    const humanTime = timeStr => {
      const now = new Date(timeStr);
      return {
        hour: now.getUTCHours(),
        minute: now.getUTCMinutes(),
        day: now.getUTCDate(),
        month: now.getUTCMonth(),
        year: now.getUTCFullYear()
      }
    };
    let projectIndex, projectID;
    currentProjects.projects.forEach((project, i) => {
      const time = humanTime(project.date);
      const today = humanTime(Date.now());
      if (time.year === today.year
        && time.month === today.month
        && time.day === today.day
        && time.hour === today.hour){
        projectIndex = i;
        projectID = project._id;
      }
    });
    return {index: projectIndex, id: projectID};
  }
  async update(client) { // Update client
    try {
      const currentProjects = await this.findByClient(client);
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { client.throw(404, err.name);}
      client.throw(500, err);
    }
  }
  async delete(client) { // Delete a client
    try {
      const client = await Project.findByIdAndRemove(client.params.id);
      if (!client) { client.throw(404); }
      client.body = client;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { client.throw(404, err.name);}
      client.throw(500, err);
    }
  }
}
module.exports = new ProjectController();
