import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  name: String,
  isActive: Boolean,
  internalName: String,
  templatePath: String,
  type: String,
  scriptPath: String,
  previewPath: String,
  params: {
    text: [
      {
        id: String,
        controlType: String,
        label: String,
        value: String,
      },
    ],
    images: [
      {
        id: String,
      },
    ],
    colors: [
      {
        id: String,
        label: String,
        value: String,
      },
    ],
  },
  thumb_img: String,
  preview_img: String,
  cats: [Number],
});

const template =
  mongoose.models.template || mongoose.model("template", templateSchema);

export default template;
