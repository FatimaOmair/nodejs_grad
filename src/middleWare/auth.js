import jwt from "jsonwebtoken";
import { userModel } from "../../DB/model/user.model.js";
import { studentModel } from "../../DB/model/student.model.js";

export const auth = (accessRoles = []) => {
  return async (req, res, next) => {
    try {
      let { token } = req.headers;
      if (!token || !token.startsWith(process.env.authBearerToken)) {
        return next(new Error("Invalid token", { cause: 400 }));
      }
      token = token.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.LOGINTOKEN);

      let user = await userModel.findOne({
        email: decoded.email,
      });

      if (!user) {
        user = await studentModel.findOne({
          email: decoded.email,
        });
      }

      if (!user) {
        return next(new Error("User not found", { cause: 404 }));
      }

      const userRoles = Array.isArray(user.role) ? user.role : [user.role];

      if (!accessRoles.some(role => userRoles.includes(role))) {
        return next(new Error("Unauthorized", { cause: 401 }));
      }

      req.user = user;
      req.userId = decoded._id;
      req.depId = decoded.depId;
      req.img=decoded.img;
      req.role = decoded.role;
      next();
    } catch (err) {
      next(new Error("Failed to authenticate", { cause: 400 }));
    }
  };
};
