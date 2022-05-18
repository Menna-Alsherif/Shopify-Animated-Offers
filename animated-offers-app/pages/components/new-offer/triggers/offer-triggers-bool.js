import {
  Tag,
  Card,
  Avatar,
  Icon,
  TextStyle,
  ResourceList,
  ResourceItem,
  TextField,
  Checkbox,
} from "@shopify/polaris";
import { useContext, useEffect, useReducer, useState } from "react";
import { OfferContext } from "../../../../state/offer/offer-context";

const OfferTriggersBool = ({ trigger, dispatchInputBasedTriggers }) => {
  const { offer, dispatch } = useContext(OfferContext);
  const [isChecked, setIsChecked] = useState(true);
  useEffect(() => {
    dispatch({
      type: "setTrigger",
      value: {
        type: trigger.key,
        value: isChecked.toString(), // this is to unify the offerSchema
      },
    });
  }, [isChecked]);

  return (
    <Card
      sectioned
      title="Discount code ???????"
      actions={[
        {
          content: "remove",
          onAction() {
            dispatch({
              type: "removeTrigger",
              value: {
                type: trigger.key,
              },
            });
            dispatchInputBasedTriggers({ type: "remove", key: trigger.key });
          },
        },
      ]}
    >
      <Checkbox
        label={trigger.name}
        helpText={trigger.description}
        checked={isChecked}
      />
    </Card>
  );
};

export default OfferTriggersBool;
