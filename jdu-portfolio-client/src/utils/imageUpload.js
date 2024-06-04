import {  FileUpload } from "../services/upload"

export async function ImageUpload(file) {
      
  if(file){
    const formData = new FormData()
    formData.append("image", file)
    const data = await FileUpload(formData)
        .then((data) => {
            return data?.data
        })
          .catch(() => " ")
      
    return await data
  } else {
      return ""
  }
   
  }

