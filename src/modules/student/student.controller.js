import { requestModel } from "../../../DB/model/request.model.js";
import { sectionModel } from "../../../DB/model/section.model.js";
import { studentModel } from "../../../DB/model/student.model.js";

export const bookSection = async (req, res, next) => {
    try {
     const {text,studentId,sectionId}=req.body;
     const request = await requestModel.create({text,studentId,sectionId});
     await sectionModel.findByIdAndUpdate(sectionId,{visible:false});
     return res.status(201).json(request);
    } catch (err) {
      next(new Error(err.message, { cause: 500 }));
    }
  };


  
  

  export const viewProfile = async (req, res, next) => {
    try {
      const id = req.student.id;
       return res.json(id)
      const userProfile = await studentModel.findById(id)
        .populate({
          path: 'depId',
          model: 'department',
          select: 'name'
        })
        .select('img name email academicYear depId');
  
      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }
  
      const departmentName = userProfile.depId ? userProfile.depId.name : null;
      userProfile.departmentName = departmentName;
      delete userProfile.depId;
  
      return res.status(200).json(userProfile);
    } catch (err) {
      next(err); // Passing the error to the next middleware
    }
  };
  



export const editProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { img,  password, phoneNumber } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (img) user.img = img;
   
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