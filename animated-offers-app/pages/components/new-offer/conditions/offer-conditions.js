import {
  ActionList,
  Button,
  Card,
  Icon,
  Popover,
  Stack,
  TextContainer,
} from "@shopify/polaris";
import React, { useCallback, useContext, useReducer, useState } from "react";
import { OfferContext } from "../../../../state/offer/offer-context";
import { getConditionsForOfferType } from "../../../../helpers/data";
import { AddProductMajor } from "@shopify/polaris-icons";
import OfferConditionsText from "./offer-conditions-text";
import OfferConditionsBool from "./offer-conditions-bool";

const OfferConditions = () => {
  const { offer, dispatch } = useContext(OfferContext);
  const [conditionListActive, setConditionListActive] = useState(false);
  const toggleConditionList = useCallback(
    () => setConditionListActive((active) => !active),
    []
  );

  const conditionReducer = (conditions, action) => {
    switch (action.type) {
      case "add":
        return [...conditions, action.condition];
      case "remove":
        return conditions.filter((c) => c.key !== action.key);
      case "reset":
        return [];
    }
  };
  const [conditions, dispatchCondition] = useReducer(conditionReducer, []);

  const onConditionSelect = (condition) => {
    toggleConditionList();
    dispatchCondition({ type: "add", condition });
  };

  const conditionList = getConditionsForOfferType(
    offer.offerType?.conditions,
    onConditionSelect
  );

  const conditionListActivator = (
    <Stack alignment="center">
      <Button size="large" primary onClick={toggleConditionList}>
        <Stack>
          <TextContainer>Add condition</TextContainer>
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
            active={conditionListActive}
            activator={conditionListActivator}
            onClose={toggleConditionList}
          >
            <ActionList sections={[{ items: conditionList }]} />
          </Popover>
        </div>
      </Card>

      {conditions.map((condition) => {
        return condition.fieldType === "textbox" ? (
          <OfferConditionsText
            key={condition.key}
            dispatchCondition={dispatchCondition}
            condition={condition}
          />
        ) : (
          <OfferConditionsBool
            key={condition.key}
            dispatchCondition={dispatchCondition}
            condition={condition}
          />
        );
      })}
    </>
  );
};

export default OfferConditions;
