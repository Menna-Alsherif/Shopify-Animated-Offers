import {
  Tag,
  Card,
  Avatar,
  Icon,
  TextStyle,
  ResourceList,
  ResourceItem,
  TextField,
} from "@shopify/polaris";
import { useContext, useEffect, useReducer, useState } from "react";
import { OfferContext } from "../../../../state/offer/offer-context";

const OfferConditionsText = ({ condition, dispatchCondition }) => {
  const { offer, dispatch } = useContext(OfferContext);
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch({
      type: "setCondition",
      value: {
        type: condition.key,
        value: text,
      },
    });
  }, [text]);

  return (
    <Card
      sectioned
      title={condition.name}
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
      <TextField
        value={text}
        onChange={setText}
        type="number"
        helpText={<span>{condition.description}</span>}
      />
    </Card>
  );
};

export default OfferConditionsText;
