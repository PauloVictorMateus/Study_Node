const express = require('express');
const {uuid} = require('uuidv4');

const app = express();

app.use(express.json());
/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end.
 * POST: Criar informação no back-end.
 * PUT/PATCH: Alterar informação no back-end.
 *          PUT: Atualizar TODOS os dados de uma aplicação.
 *          PATCH: Atualizar UM dado específico.
 * DELETE: Deletar uma informação no back-end.*/

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação.
 * Route Params: Identificar recursos (Atualizar/Deletar).
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON).
 */

const projects = [];


app.get('/projects', (request, response) =>{
    const { title } = request.query;

    const results = title
       ? projects.filter(project => project.title.includes(title))
       : projects;

    return response.json(results);
});

app.post('/projects', (request, response) =>{
    const {title, owner} = request.body;

    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);

});

app.put('/projects/:id', (request, response) =>{
    const {id} = request.params;
    const {title, owner} = request.body;
   
    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found x_x'})
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) =>{
    const { id } = request.params;
    
    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found x_x'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(5555, () => {
    console.log('Back-end started!')
});