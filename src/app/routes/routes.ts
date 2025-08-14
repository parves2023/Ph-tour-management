import { Router } from "express";
import userRoute from "../modules/user/user.routes";
import authRoute from "../modules/auth/auth.routes";


const routes = Router();

routes.use("/users", userRoute);
routes.use("/auth", authRoute);


export default routes;
