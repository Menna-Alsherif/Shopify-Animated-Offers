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

const OfferActionsDiscountCode = ({
  showDiscountCode,
  setShowDiscountCode,
}) => {
  const { offer, dispatch } = useContext(OfferContext);
  const [discountCode, setDiscountCode] = useState("");

  useEffect(() => {
    if (discountCode !== "") {
      dispatch({
        type: "setAction",
        value: {
          type: "discount_code",
          discountCode,
        },
      });
    }
  }, [discountCode]);

  return (
    <>
      {showDiscountCode && (
        <Card
          sectioned
          title="Discount code"
          actions={[
            {
              content: "remove",
              onAction() {
                dispatch({
                  type: "removeAction",
                  value: {
                    type: "discount_code",
                  },
                });
                setShowDiscountCode(false);
              },
            },
          ]}
        >
          <TextField
            value={discountCode}
            onChange={setDiscountCode}
            type="text"
            helpText={
              <span>
                the discount code that will be shown to customers when they
                accept the offer
              </span>
            }
          />
        </Card>
      )}
    </>
  );
};

export default OfferActionsDiscountCode;
