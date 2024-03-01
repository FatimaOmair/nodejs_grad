import { departmentModel } from "../../../DB/model/department.model.js";

export const createDepartment = async(req,res,next)=>{
try{
const {name}=req.body
const department=new departmentModel({name})
const savedDepartment=await department.save()
res.status(200).json({message:"success",savedDepartment})
}catch(err){
next(new Error(err.message,{cause:500}));
}
}