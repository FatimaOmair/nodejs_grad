import { studentModel } from "../../DB/model/student.model.js"

export const getUser=async(universityNum)=>{
 
    const id=await studentModel.findOne({universityNum}).select("_id")
    return id;
}