import {
  Tabs,
  Frame,
  Card,
  Page,
  Badge,
  Heading,
  TextField,
  Stack,
  RadioButton,
  Spinner,
  Button,
  TextContainer,
  Icon,
  Popover,
  ActionList,
} from "@shopify/polaris";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_OFFER_TYPES } from "../../../../graphql/mongodb";
import { AddProductMajor } from "@shopify/polaris-icons";
import { getActionForOfferType } from "../../../../helpers/data";
import { OfferContext } from "../../../../state/offer/offer-context";
import OfferActionsDiscountCode from "./offer-actions-discount-code";
import OfferActionsRedirect from "./offer-actions-redirect";
import OfferTriggerProductAndCollection from "../triggers/offer-triggers-product-collection";
import OfferActionProducts from "./offer-actions-products";
import { act } from "react-dom/test-utils";

const OfferActions = () => {
  const { offer, dispatch } = useContext(OfferContext);
  const [actionListActive, setActionListActive] = useState(false);
  const toggleActionList = useCallback(
    () => setActionListActive((active) => !active),
    []
  );

  // discount
  const [showDiscountCode, setShowDiscountCode] = useState(false);

  // redirect
  const [showRedirectUrl, setShowRedirectUrl] = useState(false);

  // ATC
  // start checkout
  // ATO
  // replace in order
  const [productPickerIsOpen, setProductPickerIsOpen] = useState(false);
  const [productAction, setProductAction] = useState("");
  const onActionSelect = (action) => {
    toggleActionList();
    switch (action.key) {
      case "discount_code":
        setShowDiscountCode(true);
        break;
      case "redirect":
        setShowRedirectUrl(true);
        break;
      case "add_to_cart":
      case "start_checkout":
      case "add_to_order":
      case "replace_in_order":
        setProductPickerIsOpen(true);
        setProductAction(action);
        break;
    }
  };

  const actionList = getActionForOfferType(
    offer.offerType?.actions,
    onActionSelect
  );

  const actionListActivator = (
    <Stack alignment="center">
      <Button size="large" primary onClick={toggleActionList}>
        <Stack>
          <TextContainer>Add action</TextContainer>
          <Icon source={AddProductMajor} color="base" />
        </Stack>
      </Button>
      <Button plain>Demo video</Button>
    </Stack>
  );

  return (
    <>
      <Card sectioned>
        <div>
          <Popover
            active={actionListActive}
            activator={actionListActivator}
            onClose={toggleActionList}
          >
            <ActionList sections={[{ items: actionList }]} />
          </Popover>
        </div>
      </Card>
      <OfferActionsDiscountCode
        showDiscountCode={showDiscountCode}
        setShowDiscountCode={setShowDiscountCode}
      />

      <OfferActionsRedirect
        showRedirectUrl={showRedirectUrl}
        setShowRedirectUrl={setShowRedirectUrl}
      />
      <OfferActionProducts
        productAction={productAction}
        productPickerIsOpen={productPickerIsOpen}
        setProductPickerIsOpen={setProductPickerIsOpen}
      />
    </>
  );
};

export default OfferActions;
