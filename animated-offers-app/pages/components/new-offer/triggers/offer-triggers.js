import {
  Tabs,
  Frame,
  Card,
  Page,
  Badge,
  Heading,
  TextField,
  Stack,
  Select,
  Popover,
  ActionList,
  RadioButton,
  FormLayout,
  Spinner,
  Button,
  TextContainer,
  Icon,
  Modal,
} from "@shopify/polaris";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useReducer,
} from "react";
import { useQuery } from "@apollo/client";
import { OfferContext } from "../../../../state/offer/offer-context";
import { AddProductMajor } from "@shopify/polaris-icons";
import { getTriggerListForOfferType } from "../../../../helpers/data";
import OfferTriggerProductAndCollection from "./offer-triggers-product-collection";
import OfferTriggerNoControl from "./offer-triggers-no-control";
import OfferConditionsText from "../conditions/offer-conditions-text";
import OfferConditionsBool from "../conditions/offer-conditions-bool";
import OfferTriggersText from "./offer-triggers-text";
import OfferTriggersBool from "./offer-triggers-bool";

const OfferTriggers = () => {
  const { offer, dispatch } = useContext(OfferContext);

  const [triggerListActive, setTriggerListActive] = useState(false);
  const toggleTriggerList = useCallback(
    () => setTriggerListActive((active) => !active),
    []
  );
  // used for Product / collection
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [resourceType, setResourceType] = useState("");

  const inputBasedTriggerReducer = (triggers, action) => {
    switch (action.type) {
      case "add":
        return [...triggers, action.item];
      case "remove":
        return triggers.filter((c) => c.key !== action.key);
      case "reset":
        return [];
    }
  };
  const [inputBasedTriggers, dispatchInputBasedTriggers] = useReducer(
    inputBasedTriggerReducer,
    []
  );

  const showTriggerControls = (item) => {
    toggleTriggerList();

    // this functions is used to show the UI to collect trigger data
    // if the trigger type required data entry like "product" or "order_total_more_than" we show the
    // control first, however, if there is no data entry like "exit_intent" we dispatch and add the trigger
    // directly to the offerReducer

    switch (item.key) {
      // product and collections are used with: 1- popups 2- post purchase 3- page embedded
      case "product":
      case "collection":
        setPickerIsOpen(true);
        setResourceType(item.name);
        break;
      // the following 4 are user events and used with: 1- popup offers
      case "exit_intent":
      case "new_visitor":
      case "inactive_cart":
      case "abandoned_checkout":
        dispatch({
          type: "setTrigger",
          value: {
            type: item.key,
          },
        });
        break;

      // input based conditions
      case "order_total_more_than":
      case "order_total_less_than":
      case "order_items_more_than":
      case "order_items_less_than":
        dispatchInputBasedTriggers({ type: "add", item });
        break;
    }
  };

  const triggerList = getTriggerListForOfferType(
    offer.offerType?.triggers,
    showTriggerControls
  );

  const triggerListActivator = (
    <Stack alignment="center">
      <Button size="large" primary onClick={toggleTriggerList}>
        <Stack>
          <TextContainer>Add trigger</TextContainer>
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
            active={triggerListActive}
            activator={triggerListActivator}
            onClose={toggleTriggerList}
          >
            <ActionList sections={[{ items: triggerList }]} />
          </Popover>
        </div>
      </Card>

      <OfferTriggerProductAndCollection
        pickerIsOpen={pickerIsOpen}
        setPickerIsOpen={setPickerIsOpen}
        resourceType={resourceType}
        setResourceType={setResourceType}
      />

      <OfferTriggerNoControl />

      {inputBasedTriggers.map((trigger) => {
        return trigger.fieldType === "textbox" ? (
          <OfferTriggersText
            key={trigger.key}
            dispatchInputBasedTriggers={dispatchInputBasedTriggers}
            trigger={trigger}
          />
        ) : (
          <OfferTriggersBool
            key={trigger.key}
            dispatchInputBasedTriggers={dispatchInputBasedTriggers}
            trigger={trigger}
          />
        );
      })}
    </>
  );
};

export default OfferTriggers;
