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
  Spinner,
} from "@shopify/polaris";
import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_OFFER_TYPES } from "../../../graphql/mongodb";
import { OfferContext } from "../../../state/offer/offer-context";

const OfferTypes = ({ dbClient }) => {
  const { offer, dispatch } = useContext(OfferContext);

  const { loading, data, error } = useQuery(GET_OFFER_TYPES, {
    client: dbClient,
  });

  if (loading) {
    return <Spinner accessibilityLabel="Loading offer types" size="large" />;
  }

  if (error) return `Error! ${error.message}`;

  const options = data.offerTypeMany.map((item) => {
    return { label: item.name, value: item.id };
  });
  options.unshift({ value: 0, label: "Please select" });

  const handleSelectChange = (value) => {
    const id = parseInt(value);
    if (id > 0) {
      dispatch({
        type: "setOfferType",
        value: data.offerTypeMany.find((item) => item.id === id),
      });
    }
  };
  return (
    <Card sectioned>
      <Select
        options={options}
        onChange={handleSelectChange}
        value={offer.catId}
      />
    </Card>
  );
};

export default OfferTypes;
