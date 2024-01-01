import { v2 as cloudinary} from "cloudinary";
import fs from "fs"   
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret:process.env.CLOUDINARY_SECRET 
});

const uploadCloudinary = async(localFilePath) =>{
    try {
        if(!localFilePath) return null
       const fileData = cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})

       console.log("Successfully data is uploaded on cloudinary :",(await fileData).url);
       
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}



cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });


export {uploadCloudinary}