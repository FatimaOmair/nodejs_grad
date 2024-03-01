import jwt from "jsonwebtoken";
import { userModel } from "../../DB/model/user.model.js";

export const auth = (accessRoles = []) => {
  return async (req, res, next) => {
    try {
      let { token } = req.headers;
      if (!token.startsWith(process.env.authBearerToken)) {
        return next(new Error("error token", { cause: 400 }));
      }
      token = token.split("__")[1];
      const decoded = await jwt.verify(token, process.env.LOGINTOKEN);

      const user = await userModel
        .findOne({
          email: decoded.email,
        })
        .select("role _id ");

      if (!user) {
        return next(new Error("user not found", { cause: 404 }));
      }
      if (!accessRoles.includes(user.role)) {
        return next(new Error("U Are not authorized", { cause: 401 }));
      }
      req.user = user;
      next();
    } catch (err) {
      next(new Error("sendToken", { cause: 400 }));
    }
  };
};
