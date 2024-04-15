import express from 'express';

import { getAllHours, getHoursByUser, getHoursForProject, postHours, putHours, deleteHours } from '../controllers/hours.js';

const router = express.Router();


router.get("/hours/all", getAllHours)

router.get("/hours/:iduser", getHoursByUser)

router.get("/hours/project/:idproject", getHoursForProject)

router.post("/hours", postHours)

router.put("/hours/:idhour", putHours)

router.delete("/hours/:idhour", deleteHours)


export default router