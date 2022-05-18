import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  shop: String,
  isActive: Boolean,
  catId: Number,
  priority: Number,
  startDate: Date,
  endDate: Date,
  template: {
    name: String,
    path: String,
  },
  params: {
    images: [{ url: String }],
    text: [
      {
        key: String,
        value: String,
      },
    ],
    colors: [
      {
        key: String,
        value: String,
      },
    ],
  },
  actions: [
    {
      type: { type: String },
      discountCode: String,
      url: String,
      products: [
        {
          id: String,
          title: String,
        },
      ],
      discount: {
        type: { type: String },
        amount: String,
      },
    },
  ],
  triggers: [
    {
      type: { type: String },
      value: { type: String },
      collections: [
        {
          id: String,
          title: String,
        },
      ],
      products: [
        {
          id: String,
          title: String,
        },
      ],
    },
  ],
  conditions: [
    {
      type: { type: String },
      value: String,
    },
  ],
});

const offer = mongoose.models.offer || mongoose.model("offer", offerSchema);

export default offer;
