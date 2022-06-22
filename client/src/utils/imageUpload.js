export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "File does not exists.");
  if (file.size > 1024 * 1024) err = "The largest image size is 1mb";
  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "Image format is incorrect";
  return err;
};
export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", "wingtr2s");
    formData.append("cloud_name", "dtbazi1zt");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtbazi1zt/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
