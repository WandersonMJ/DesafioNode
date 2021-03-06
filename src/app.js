const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function logRequests(request, response, next){
  const { method, url} = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({ error: "Invalid project ID."})
  }

  return next();
}

app.use(logRequests);
app.use('/repositories/:id', validateProjectId);

 //--------------->


app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title 
    ? repositories.filter(repository => repository.title.includes(title))  
    : repositories;

  return response.send(results)
});

//--------------->


app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  repository = {
      id: uuid(), 
      title,
      url,
      techs,
      likes: 0 };
    repositories.push(repository);
  return response.send(repository)
});


//--------------->


app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  
  if (repositoryIndex < 0){
    return response.status(400).json({ error: "respository not found"})
  }

  const { likes } = repositories[repositoryIndex];

  repositories[repositoryIndex] = {id, title, url, techs, likes};
 
  return response.send(repositories[repositoryIndex]);
});

//------------------>

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  
  if (repositoryIndex < 0){
    return res.status(400).json({ error: "respository alredy been removed, or doesn't exists."})
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send([])
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  
  if (repositoryIndex < 0){
    return response.status(400).json({ error: "respository not found"})
  }

  const {  title, url, techs, likes } = repositories[repositoryIndex];

  repositories[repositoryIndex] = {id, title, url, techs, likes: likes+1};

  return response.send(repositories[repositoryIndex]);
});

module.exports = app;
