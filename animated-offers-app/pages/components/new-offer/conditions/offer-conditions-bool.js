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

const OfferConditionsBool = ({ condition, dispatchCondition }) => {
  const { offer, dispatch } = useContext(OfferContext);
  const [isChecked, setIsChecked] = useState(true);
  useEffect(() => {
    dispatch({
      type: "setCondition",
      value: {
        type: condition.key,
        value: isChecked.toString(), // this is to unify the offerSchema
      },
    });
  }, [isChecked]);

  return (
    <Card
      sectioned
      title="Discount code"
      actions={[
        {
          content: "remove",
          onAction() {
            dispatch({
              type: "removeCondition",
              value: {
                type: condition.key,
              },
            });
            dispatchCondition({ type: "remove", key: condition.key });
          },
        },
      ]}
    >
      <Checkbox
        label={condition.name}
        helpText={condition.description}
        checked={isChecked}
      />
    </Card>
  );
};

export default OfferConditionsBool;
