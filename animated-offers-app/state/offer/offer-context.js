import { createContext } from "react";

export const emptyOffer = {
  catId: 0,
  offerType: {},
  triggers: [],
  actions: [],
  conditions: [],
  params: {
    text: [],
    images: [],
    colors: [],
  },
  shop: "",
  isActive: true,
  startDate: new Date().toISOString(),
  endDate: null,
  priority: 1,
};

export const OfferContext = createContext(emptyOffer);
