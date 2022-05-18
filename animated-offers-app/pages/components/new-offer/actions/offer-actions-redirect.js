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
import {
  GiftCardMajor,
  ExitMajor,
  CustomerPlusMajor,
  AbandonedCartMajor,
  CartUpMajor,
} from "@shopify/polaris-icons";
import { OfferContext } from "../../../../state/offer/offer-context";

const OfferActionsRedirect = ({ showRedirectUrl, setShowRedirectUrl }) => {
  const { offer, dispatch } = useContext(OfferContext);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url !== "") {
      dispatch({
        type: "setAction",
        value: {
          type: "redirect",
          url,
        },
      });
    }
  }, [url]);

  return (
    <>
      {showRedirectUrl && (
        <Card
          sectioned
          title="Discount code"
          actions={[
            {
              content: "remove",
              onAction() {
                setShowRedirectUrl(false);
                dispatch({
                  type: "removeAction",
                  value: {
                    type: "redirect",
                  },
                });
              },
            },
          ]}
        >
          <TextField
            value={url}
            onChange={setUrl}
            label="Url"
            type="url"
            helpText={<span>the page URL</span>}
          />
        </Card>
      )}
    </>
  );
};

export default OfferActionsRedirect;
