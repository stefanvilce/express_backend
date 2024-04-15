import express from 'express';

import { getProjects, getConnected, getProject, postProject, putProject, deleteProject, getProjectsByUser } from '../controllers/projects.js';

const router = express.Router();

router.get("/", getConnected)

router.get("/projects", getProjects)

router.get("/projects/:iduser", getProjectsByUser)

router.get("/project/:idproject", getProject)

router.post("/project", postProject)

router.put("/project/:idproject", putProject)

router.delete("/project/:idproject", deleteProject)


export default router