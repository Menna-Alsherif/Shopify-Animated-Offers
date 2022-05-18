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

const OfferTriggersText = ({ trigger, dispatchInputBasedTriggers }) => {
  const { offer, dispatch } = useContext(OfferContext);
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch({
      type: "setTrigger",
      value: {
        type: trigger.key,
        value: text,
      },
    });
  }, [text]);

  return (
    <Card
      sectioned
      title={trigger.name}
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
      <TextField
        value={text}
        onChange={setText}
        type="number"
        helpText={<span>{trigger.description}</span>}
      />
    </Card>
  );
};

export default OfferTriggersText;
