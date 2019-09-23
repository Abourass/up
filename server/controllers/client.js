import Client from '../models/client.js';

class ClientController {
  async find(ctx) { ctx.body = await Client.find();} // Get all clients
  async findById(ctx) { // Find a Client
    try {
      const client = await Client.findById(ctx.params.id);
      if (!client) { ctx.throw(404); }
      ctx.body = client;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404); }
      ctx.throw(500);
    }
  }
  async add(ctx) { // Add A client
    console.log(ctx.request.body);
    try { ctx.body = await new Client(ctx.request.body).save(); } catch (err) { ctx.throw(422, err); }
  }
  async update(ctx) { // Update client
    try {
      const client = await Client.findByIdAndUpdate(ctx.params.id, ctx.request.body);
      if (!client) {ctx.throw(404);}
      ctx.body = client;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404, err.name);}
      ctx.throw(500, err);
    }
  }
  async delete(ctx) { // Delete a client
    try {
      const client = await Client.findByIdAndRemove(ctx.params.id);
      if (!client) { ctx.throw(404); }
      ctx.body = client;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404, err.name);}
      ctx.throw(500, err);
    }
  }
}
export default new ClientController();
