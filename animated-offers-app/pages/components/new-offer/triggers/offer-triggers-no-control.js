import {
  Tag,
  Card,
  Avatar,
  Icon,
  TextStyle,
  ResourceList,
  ResourceItem,
} from "@shopify/polaris";
import { useContext, useEffect, useReducer, useState } from "react";
import {
  GiftCardMajor,
  ExitMajor,
  CustomerPlusMajor,
  AbandonedCartMajor,
  CartUpMajor,
} from "@shopify/polaris-icons";
import { OfferContext } from "../../../../state/offer/offer-context";
import { triggerData } from "../../../../helpers/data";

// this is used currently for `user events` with: 1- popup offers
const OfferTriggerNoControl = () => {
  const { offer, dispatch } = useContext(OfferContext);

  const userEvents = [
    "exit_intent",
    "new_visitor",
    "inactive_cart",
    "abandoned_checkout",
  ];

  const getUserEventTriggers = () => {
    return triggerData.filter(({ key }) => {
      let existInState = false;
      offer.triggers.map(({ type }) => {
        if (type === key) {
          existInState = true;
        }
      });
      return existInState && userEvents.includes(key);
    });
  };

  const userEventTriggers = getUserEventTriggers();

  const getIcon = (key) => {
    switch (key) {
      case "exit_intent":
        return <Icon backdrop={true} source={ExitMajor} />;
      case "new_visitor":
        return <Icon backdrop={true} source={CustomerPlusMajor} />;
      case "inactive_cart":
        return <Icon backdrop={true} source={AbandonedCartMajor} />;
      case "abandoned_checkout":
        return <Icon backdrop={true} source={CartUpMajor} />;
      default:
        return <Icon backdrop={true} source={GiftCardMajor} />;
    }
  };

  return (
    <>
      {userEventTriggers.length > 0 && (
        <>
          <Card sectioned title="User event Triggers">
            <ResourceList
              resourceName={{ singular: "customer", plural: "customers" }}
              items={userEventTriggers}
              renderItem={(item) => {
                const { key, name, description } = item;

                const shortcutActions = [
                  {
                    content: "remove",
                    accessibilityLabel: name,
                    onClick: () => {
                      dispatch({
                        type: "removeTrigger",
                        value: key,
                      });
                    },
                  },
                ];
                return (
                  <ResourceItem
                    id={key}
                    media={getIcon(key)}
                    accessibilityLabel={`View details for ${name}`}
                    shortcutActions={shortcutActions}
                    persistActions
                  >
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>{description}</div>
                  </ResourceItem>
                );
              }}
            />
          </Card>
          {/*<Card sectioned title="Additional Settings">*/}
          {/*</Card>*/}
        </>
      )}
    </>
  );
};

export default OfferTriggerNoControl;
