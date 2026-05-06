import { Router } from "express";
import { signup, login, logout } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const userRouter = new Router();

/**
 * @method POST
 * @path /user/signup
 */
userRouter.post("/signup", signup);

/**
 * @method POST
 * @path /user/login
 */
userRouter.post("/login", login);

/**
 * @method GET
 * @path /user/logout
 */
userRouter.get("/logout", logout);

/**
 * @method GET
 * @path /user/dashboard
 */
// Protected route
userRouter.get("/dashboard", auth, (req, res) => {
  res.json({ msg: "Welcome", user: req.user });
});

export { userRouter };
