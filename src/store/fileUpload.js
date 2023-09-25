export const baseURl = ""
export async function fileUpload(files){
    try {
        const uploadPromises = files.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
    
            try {
              const response = await axios({
                url: `${baseURl}/upload`, // Make sure to define 'baseURl' before using it
                method: "post",
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                data: formData,
              });
    
              if (response?.data?.status) {
                return response?.data?.url;
              }
            } catch (error) {
              throw new Error("Image couldn't be uploaded");
            }
          });

          const uploadedFiles = await Promise.all(uploadPromises);
          return uploadedFiles
    } catch (error) {
        throw new Error(error)
    }
}