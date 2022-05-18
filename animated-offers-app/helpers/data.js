// ************* Helper description *************

export function getPopupEvents() {
  return [
    {
      label: "Exit intent",
      value: "exit_intent",
      helpText: "when the user approach the close button or switch tabs",
    },
    {
      label: "New store visitors",
      value: "store_visit",
      helpText: "When a customer visit the store for the first time",
    },
    {
      label: "Product or collection page",
      value: "page_visit",
      helpText: "When a customer visit a specific product or collection page",
    },
    {
      label: "Inactive cart",
      value: "inactive_cart",
      helpText: "When a customer leaves his cart idle for X amount of time",
    },
    {
      label: "Abandoned checkout",
      value: "abandoned_checkout",
      helpText:
        "When a customer start the checkout process then leave the page",
    },
  ];
}

export function convertObjectToKeyValueArray(data) {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const formatted = [];

  for (let i = 0; i < keys.length; i++) {
    formatted.push({ key: keys[i], value: values[i] });
  }

  return formatted;
}

export const triggerData = [
  {
    key: "product",
    name: "Product",
    description: "trigger the offer based on a product",
  },
  {
    key: "collection",
    name: "Collection",
    description: "trigger the offer based on a collection",
  },
  {
    key: "exit_intent",
    name: "Exit intent",
    description: "trigger the offer if the user tried to exit the store",
  },
  {
    key: "new_visitor",
    name: "New visitor",
    description: "show the offer for new visitors",
  },
  {
    key: "inactive_cart",
    name: "Inactive cart",
    description: "trigger the offer if customers had inactive cart",
  },
  {
    key: "abandoned_checkout",
    name: "Abandoned checkout",
    description: "trigger the offer if customers didn't complete the checkout ",
  },
  {
    key: "store_wide_sale",
    name: "Store wide sale (TODO: find a better name)",
    description: "trigger the offer across the store",
  },
  {
    key: "order_total_more_than",
    name: "Order total value more than",
    description: "Order total is more than a specific amount",
    fieldType: "textbox", // PLEASE NOTE THE fieldType as it's being used in rendering
  },
  {
    key: "order_total_less_than",
    name: "Order total value less than",
    description: "Order total less than a specific amount",
    fieldType: "textbox",
  },
  {
    key: "order_items_more_than",
    name: "Order items count more than",
    description: "Order items count is more than a specific amount",
    fieldType: "textbox",
  },
  {
    key: "order_items_less_than",
    name: "Order items count less than",
    description: "Order items count is less than a specific amount",
    fieldType: "textbox",
  },
];

export function getTriggerListForOfferType(triggerKeys, onTriggerSelect) {
  if (triggerKeys) {
    const items = [];
    for (const trigger of triggerKeys) {
      const item = triggerData.find(({ key }) => key === trigger);
      items.push({
        content: item.name,
        helpText: item.description,
        onAction: () => {
          onTriggerSelect(item);
        },
      });
    }
    return items;
  }
}
export const actionData = [
  {
    key: "discount_code",
    name: "Discount Code",
    description: "Show a discount code when they accept the offer",
  },
  {
    key: "redirect",
    name: "Redirect to a page",
    description: "Redirect the user to a page when they accept the offer",
  },
  {
    key: "add_to_cart",
    name: "Add items to cart",
    description: "Add items to the shopping cart when they accept the offer",
  },
  {
    key: "start_checkout",
    name: "Start checkout",
    description: "trigger the offer based on a product",
  },
  {
    key: "add_to_order",
    name: "Add to order",
    description: "trigger the offer based on a product",
  },
  {
    key: "replace_in_order",
    name: "Replace in Order",
    description: "trigger the offer based on a product",
  },
];
export function getActionForOfferType(actionKeys, onActionSelect) {
  if (actionKeys) {
    const items = [];
    for (const action of actionKeys) {
      const item = actionData.find(({ key }) => key === action);
      items.push({
        content: item.name,
        helpText: item.description,
        onAction: () => {
          onActionSelect(item);
        },
      });
    }
    return items;
  }
}

export const conditionData = [
  {
    key: "new_visitors",
    name: "New visitors",
    description: "Show the offer to new visitors only",
    fieldType: "checkbox",
  },
  {
    key: "max_show_times",
    name: "Maximum show times",
    description: "The maximum number to show this offer to each visitor",
    fieldType: "textbox",
  },
  {
    key: "order_total_more_than",
    name: "Order total value more than",
    description: "Order total is more than a specific amount",
    fieldType: "textbox",
  },
  {
    key: "order_total_less_than",
    name: "Order total value less than",
    description: "Order total less than a specific amount",
    fieldType: "textbox",
  },
  {
    key: "order_items_more_than",
    name: "Order items count more than",
    description: "Order items count is more than a specific amount",
    fieldType: "textbox",
  },
  {
    key: "order_items_less_than",
    name: "Order items count less than",
    description: "Order items count is less than a specific amount",
    fieldType: "textbox",
  },
  {
    key: "cart_total_more_than",
    name: "Cart total value more than",
    description: "Cart total value is more than a specific amount",
    fieldType: "textbox",
  },
  {
    key: "cart_total_less_than",
    name: "Cart total value less than",
    description: "Cart total value less than a specific amount",
    fieldType: "textbox",
  },
  {
    key: "cart_items_more_than",
    name: "Cart items count more than",
    description: "Cart items count is more than a specific amount",
    fieldType: "textbox",
  },
  {
    key: "cart_items_less_than",
    name: "Cart items count less than",
    description: "Cart items count is less than a specific amount",
    fieldType: "textbox",
  },
];
export function getConditionsForOfferType(conditionKeys, onConditionSelect) {
  if (conditionKeys) {
    const items = [];
    for (const condition of conditionKeys) {
      const item = conditionData.find(({ key }) => key === condition);
      items.push({
        content: item.name,
        helpText: item.description,
        onAction: () => {
          onConditionSelect(item);
        },
      });
    }
    return items;
  }
}
