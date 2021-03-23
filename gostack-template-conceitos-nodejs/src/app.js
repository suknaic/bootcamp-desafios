const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(cors());
app.use(express.json());

const repositories = [];

function Validate(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "invalid repositorie id" });
  }

  return next();
}

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  console.log(request.body);

  const respositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(respositorie);
  return response.status(200).json(respositorie);
});

app.put("/repositories/:id", Validate, (request, response) => {
  const { id } = request.params;

  const { url, title, techs } = request.body;

  console.log(request.body);

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "invalid repository id" });
  }

  const repo = {
    id,
    url,
    title,
    techs,
    likes: repositories[repoIndex].likes,
  };

  repositories[repoIndex] = repo;
  return response.json(repo);
});

app.delete("/repositories/:id", Validate, (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "invalid repository id" });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", Validate, (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "invalid repository id" });
  }

  repositories[repoIndex].likes += 1;

  return response.json(repositories[repoIndex]);
});

module.exports = app;
