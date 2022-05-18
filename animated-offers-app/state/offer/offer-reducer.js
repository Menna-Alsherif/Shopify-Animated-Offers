export const offerReducer = (offer, action) => {
  switch (action.type) {
    case "setOfferType":
      return { ...offer, catId: action.value.id, offerType: action.value };
    case "setTrigger":
      console.log(action.value);

      const setTriggers = offer.triggers.filter(({ type }) => {
        return type !== action.value.type;
      });
      setTriggers.push(action.value);
      return { ...offer, triggers: setTriggers };
    case "removeTrigger":
      const removeTriggers = offer.triggers.filter(({ type }) => {
        return type !== action.value;
      });
      return { ...offer, triggers: removeTriggers };

    case "setAction":
      const setActions = offer.actions.filter(({ type }) => {
        return type !== action.value.type;
      });
      setActions.push(action.value);
      return { ...offer, actions: setActions };

    case "removeAction":
      const removeActions = offer.actions.filter(({ type }) => {
        return type !== action.value.type;
      });
      return { ...offer, actions: removeActions };

    case "setCondition":
      const setConditions = offer.conditions.filter(({ type }) => {
        return type !== action.value.type;
      });
      setConditions.push(action.value);
      return { ...offer, conditions: setConditions };

    case "removeCondition":
      const removeConditions = offer.conditions.filter(({ type }) => {
        return type !== action.value.type;
      });
      return { ...offer, conditions: removeConditions };

    case "setTemplate":
      return { ...offer, template: action.template };

    case "setShop":
      return { ...offer, shop: action.shop };

    case "setParamText":
      const paramsText = {
        text: action.data,
        images: offer.params.images,
        colors: offer.params.colors,
      };
      return { ...offer, params: paramsText };

    case "setParamColor":
      const paramsColor = {
        text: offer.params.text,
        images: offer.params.images,
        colors: action.data,
      };
      return { ...offer, params: paramsColor };

    case "setParamImages":
      const paramsImages = {
        text: offer.params.text,
        images: action.data,
        colors: offer.params.colors,
      };
      return { ...offer, params: paramsImages };

    default:
      return offer;
  }
};
