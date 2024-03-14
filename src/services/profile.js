import { studentModel } from "../../DB/model/student.model.js";
import { userModel } from "../../DB/model/user.model.js";
import bcrypt from "bcryptjs";
export const viewProfile = async (req, res, next) => {
    try {
      const userId = req.user.id;
      
      let userProfile = await userModel.findById(userId)
                                         .populate({
                                           path: 'depId',
                                           select: 'name'
                                         })
                                         .select('img name email officeHours depId');
      if(!userProfile) {
         userProfile = await studentModel.findById(userId)
                                         .populate({
                                           path: 'depId',
                                           select: 'name'
                                         })
                                         .select('img name email academicYear depId');
      }
  
      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }
      const departmentName = userProfile.depId ? userProfile.depId.name : null;
      userProfile.departmentName = departmentName;
      delete userProfile.depId; 
      return res.status(200).json(userProfile);
    } catch (err) {
      next(new Error(err.message, { cause: 500 }));
    }
  };
  
  
  
  export const editProfile = async (req, res, next) => {
    try {
      const userId = req.userId;
      const { password, phoneNumber } = req.body;
      let user = await userModel.findById(userId);
      if(!user){
        user = await studentModel.findById(userId);
      }
      if (password) {
        const saltRounds = parseInt(process.env.SALTROUND);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
      }
      if (phoneNumber) user.phoneNumber = phoneNumber;
  
      await user.save();
  
      return res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
      console.error(err); 
      return res.status(500).json({ message: "Internal server error",err:err.stack });
    }
  };