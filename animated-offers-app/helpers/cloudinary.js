// ************* Helper description *************

import axios from "axios";

export async function uploadImage(file, offer) {
  let resized_file;
  let res;
  if (offer.catId == 2) {
    resized_file = await resize(file);

    res = await toFormData(resized_file);
  } else {
    res = await toFormData(file);
  }

  return {
    data: res.data,
    original_filename: file.name,
    format: res.data.format,
    secure_url: res.data.url,
  };
}

function resize(file) {
  return new Promise((resolve, reject) => {
    try {
      var resized_file;
      var reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        var img = document.createElement("img");

        img.onload = (e) => {
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");

          const max_height = 150;
          const scale_size = max_height / e.target.height;

          canvas.height = max_height;
          canvas.width = e.target.width * scale_size;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resized_file = ctx.canvas.toDataURL();

          resolve(resized_file);
        };

        img.onerror = reject;
        img.src = reader.result;
      };
    } catch (e) {
      reject(e);
    }
  });
}

async function toFormData(file) {
  const formData = new FormData();
  formData.append("upload_preset", "public");
  formData.append("file", file);

  let res = await axios.post(
    "https://api.cloudinary.com/v1_1/blazi/image/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res;
}
