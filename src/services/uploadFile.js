import cloudinary from "./cloudinary.js";

export const uploadFile=async(file)=>{
     const { secure_url } = await cloudinary.uploader.upload(
        file,
        {
          folder: "grad-proj",
        }
      );
      return secure_url
}
