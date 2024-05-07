import { userModel } from "../../../DB/model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { studentModel } from "../../../DB/model/student.model.js";
import { departmentModel } from "../../../DB/model/department.model.js";
import { nanoid } from "nanoid";
import verifyCode from "../../services/verifyCode.js";
import { uploadFile } from "../../services/uploadFile.js";

export const userSignUp = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, role, depId,officeHours} = req.body;
    const img = await uploadFile(req.file.path);
    const exitUser = await userModel.findOne({ email: email });
    
    if (exitUser) {
      return next(new Error("exist user", { cause: 500 }));
    }
    const existingDepartment = await departmentModel.findById(depId);
    if (!existingDepartment) {
      return next(new Error("Department does not exist", { cause: 500 }));
    }
    const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    let user = undefined;
    if (depId && officeHours) {
      user = await userModel.create({
        name,
        email,
        password: hash,
        phoneNumber,
        role,
        depId,
        officeHours,
        img
      });
    } else {
      user = await userModel.create({
        name,
        email,
        password: hash,
        phoneNumber,
        role,
        img
      });
    }

    res.status(201).json({ message: "success", user });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};



export const studentSignUp = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, depId, academicYear, universityNum } = req.body;
    const img = await uploadFile(req.file.path);
    const existingUser = await studentModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingUserNum = await studentModel.findOne({ universityNum:universityNum });
    if (existingUserNum) {
      return res.status(400).json({ message: "University number already exists" });
    }

    const existingDepartment = await departmentModel.findById(depId);
    if (!existingDepartment) {
      return res.status(404).json({ message: "Department does not exist" });
    }

    const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));

    const user = await studentModel.create({
      name,
      email,
      password: hash,
      phoneNumber,
      depId,
      academicYear,
      universityNum,
      img
    });

    res.status(201).json({ message: "Student created successfully", user });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({
      email,
    });
    if (!user) {
      user = await studentModel.findOne({
        email: email,
      });
    }
    if (!user) {
      return next(new Error("invalid account", { cause: 404 }));
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(
        new Error("invalid account error in password", { cause: 400 })
      );
    }
    let tokenPayload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      depId:user.depId,
      img:user.img,
      phoneNumber:user.phoneNumber
    };
    if (user instanceof studentModel) {
      tokenPayload.academicYear = user.academicYear;
    } else {
      tokenPayload.officeHours = user.officeHours;
    }
    const token = jwt.sign(
      tokenPayload,
      process.env.LOGINTOKEN,
      {
        expiresIn: 60 * 60 * 24 * 7 ,
      }
    );
    console.log(tokenPayload)
    return res.status(200).json({ message: "valid account", token, role: user.role });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const sendCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await studentModel.findOne({ email }).select("email");
    let supervisor = false;
    if (!user) {
      user = await userModel.findOne({ email }).select("email");
      supervisor = true;
    }
    if (!user) {
      next(new Error("cant find user", { cause: 404 }));
    } else {
      const code = nanoid();
      await verifyCode(email,  code);

      if (supervisor) {
        await userModel.findOneAndUpdate({ email }, { sendCode: code });
      } else {
        await studentModel.findOneAndUpdate({ email }, { sendCode: code });
      }
      res.status(200).json({ message: "success", role: user.role });
    }
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }};


  
  export const changePassword = async (req, res, next) => {
    try {
      const { password, email } = req.body;
      const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
       let updatedModel;
      let user = await studentModel.findOne({ email }).select("email");
      updatedModel=studentModel
      if (!user) {
        user = await userModel.findOne({ email }).select("email");
        updatedModel=userModel
        
      }else{
        return res.status(404).json({ error: "User not found" });
      }
  
      
  
      const updated = await updatedModel.findOneAndUpdate(
        { email: email },
        { password: hash }
      );
  
      console.log("Update result:", updated);
  
      if (updated) {
        return res.status(200).json({ message: "success" });
      } 
     
        return res.status(500).json({ error: "Failed to update password" });
      
    } catch (err) {
      console.error("Update error:", err); 
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  
  
  
  

  export const veriFyCode = async (req, res, next) => {
    try {
      const { code, email } = req.body;
      if (!code) {
        next(new Error("enter coce password", { cause: 404 }));
      }
      let updated;
      
        updated = await userModel.findOneAndUpdate(
          { email: email, sendCode: code },
          { sendCode: "yes" }
        );
       if(!updated) {
        updated = await studentModel.findOneAndUpdate(
          { email: email, sendCode: code },
          { sendCode: "yes" }
        );
      }
      if (updated) {
        res.status(200).json({ message: "success" });
      } else {
        return next(new Error("enter valid code", { cause: 500 }));
      }
    } catch (err) {
      return next(new Error("internal error", { cause: 500 }));
    }
  };
  
  
  