import express from 'express';

import { getUsers, getUser, postLogInUser, logOut, postUser, putUser, deleteUser } from '../controllers/users.js';

const router = express.Router();


router.get("/users", getUsers)

router.get("/user/:iduser", getUser)

router.post("/userlogin", postLogInUser)

router.post("/userlogout", logOut)

router.post("/user", postUser)

router.put("/user/:iduser", putUser)

router.delete("/user/:iduser", deleteUser)


export default router