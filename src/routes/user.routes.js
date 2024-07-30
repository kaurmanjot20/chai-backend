import {Router} from "express";
import { loginUser, logoutUser, registerUser,refreshAccessToken } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
const router = Router()

router.route("/register").post(
    upload.fields([   // multer used in between
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser) //using verifyJWT middleware here
// next() used in the end of middleware shifts control to next thing after middleware execution ends

router.route("/refresh-token").post(refreshAccessToken)
export default router