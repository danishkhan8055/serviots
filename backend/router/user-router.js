import {Router} from "express"
import {  getAllUsers, login, register, updateUser } from "../controller/user-controller.js"
import { isAdmin } from "../middleware/isAdmin.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = Router()

router.post("/register",upload.single("profileImage"),register);
router.post("/login",login);
router.get("/get-user",auth , isAdmin,getAllUsers)
router.patch("/update/:id",auth ,upload.single("profileImage"), updateUser)

export default router;