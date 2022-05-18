import {
  ActionList,
  Banner,
  Button,
  ButtonGroup,
  DisplayText,
  IndexTable,
  Page,
  Popover,
  Spinner,
  Stack,
  Heading,
  SettingToggle,
  Tag,
  useIndexResourceState,
} from "@shopify/polaris";
import { useRouter } from "next/router";
import { useAppBridge } from "@shopify/app-bridge-react";
import React, { useCallback, useEffect, useState } from "react";
import * as appBridgeHelper from "../helpers/app-bridge";
import { FilterMajor, MobileCancelMajor } from "@shopify/polaris-icons";

import {
  GET_OFFERS,
  DELETE_MANY_OFFERS,
  DELETE_OFFER,
  EDIT_WEIGHT,
  TOGGLE_STATUS,
} from "../graphql/mongodb";

import ToggleButton from "./components/offer-list/loading-toggle-button";
import DeleteButtonPopOverActivator from "./components/offer-list/delete-button-popover-activator";
import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  useQuery,
  gql,
} from "@apollo/client";
import { getApolloClient } from "../helpers/graphql";

const dbClient = getApolloClient();

const OffersList = () => {
  const router = useRouter();
  const app = useAppBridge();
  const [shop, setShop] = useState("");
  const [resources, setResources] = useState([]);
  const [active, setActive] = useState("");
  const [activeFilter, setActiveFilter] = useState(false);

  const { loading, data, error } = useQuery(GET_OFFERS, {
    client: dbClient,
    variables: { shop },
  });

  const [
    MutationDeleteSelectedFunction,
    { deletedDataCount, deleteSelectedLoading, deleteSelectedError },
  ] = useMutation(DELETE_MANY_OFFERS, { client: dbClient });

  const [
    MutationEditWeightFunction,
    { dataEditWeight, loadingEditWeight, errorEditWeight },
  ] = useMutation(EDIT_WEIGHT, { client: dbClient });

  const [
    MutationFunction,
    { dataToggle, loadingToggle, errorToggle },
  ] = useMutation(TOGGLE_STATUS, { client: dbClient });
  const [
    MutationDeleteFunction,
    { dataDelete, loadingDelete, errorDelete },
  ] = useMutation(DELETE_OFFER, { client: dbClient });

  if (loadingToggle) return "Submitting...";
  if (errorToggle) return `Submission error! ${error.message}`;

  if (loadingDelete) return "Deleting...";
  if (errorDelete) return `Delete error! ${error.message}`;

  const resourceName = {
    singular: "offer",
    plural: "offers",
  };

  useEffect(() => {
    if (data) {
      setResources(data.offerMany);
    }
  }, [data]);

  const resourceIDResolver = (resources) => {
    return resources._id;
  };

  var {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(resources, {
    resourceIDResolver,
  });

  const [activeStatus, setActiveStatus] = useState(false);

  const toggleActiveStatus = useCallback(
    () => setActiveStatus((active) => !active),
    []
  );

  const [activeType, setActiveType] = useState(false);

  const toggleActiveType = useCallback(
    () => setActiveType((active) => !active),
    []
  );

  function ToggleOneOffer(id) {
    const foundOffer = resources.find((offer) => offer._id === id);
    MutationFunction({
      variables: { id: foundOffer._id, isActive: !foundOffer.isActive },
    });
  }

  function DeleteOneOffer(id) {
    const foundOffer = resources.find((offer) => offer._id === id);
    MutationDeleteFunction({ variables: { id: foundOffer._id } });
    selectedResources.filter((offer) => offer !== foundOffer._id);
    setResources(resources.filter((offer) => offer._id !== foundOffer._id));
  }

  function DeleteSelectedOffers() {
    MutationDeleteSelectedFunction({ variables: { ids: selectedResources } });
    setResources(
      resources.filter((resource) => !selectedResources.includes(resource._id))
    );
    selectedResources = [];
  }

  const promotedBulkActions = [
    {
      content: "Toggle Activate",
      onAction: () => {
        selectedResources.map((offer) => ToggleOneOffer(offer));
      },
    },
  ];
  const bulkActions = [
    {
      content: "Delete Offer/s",
      onAction: () => {
        DeleteSelectedOffers();
      },
    },
  ];

  useEffect(() => {
    async function getShop() {
      const shopUrl = await appBridgeHelper.getShopUrl(app);
      setShop(shopUrl);
    }

    getShop();
  }, []);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? "Active" : "Inactive";

  const [selectedTags, setSelectedTags] = useState([]);

  function removefilter(selectedTags, tag) {
    if (!selectedTags.isEmpty) {
      switch (tag) {
        case "Active":
          addFilters();
          break;
        case "InActive":
          addFilters();
          break;
        case "Pop Up Offer/s":
          setResources(resources.filter((offer) => offer.catId !== 1));
          break;
        case "Banner Offer/s":
          setResources(resources.filter((offer) => offer.catId !== 3));
          break;
        case "Post Purchase Offer/s":
          setResources(resources.filter((offer) => offer.catId !== 2));
          break;
        case "Page Embedded Offer/s":
          setResources(resources.filter((offer) => offer.catId !== 4));
          break;
      }
    }
    if (selectedTags.length == 1) {
      setResources(data.offerMany);
    }
  }

  function filterByActive(arr) {
    return arr.filter((offer) => offer.isActive === true);
  }

  function filterByInActive(arr) {
    return arr.filter((offer) => offer.isActive === false);
  }

  function filterByPopUp(arr) {
    return arr.filter((offer) => offer.catId === 1);
  }

  function filterByPostPurchase(arr) {
    return arr.filter((offer) => offer.catId === 2);
  }

  function filterByBanner(arr) {
    return arr.filter((offer) => offer.catId === 3);
  }

  function filterByPageEmbedded(arr) {
    return arr.filter((offer) => offer.catId === 4);
  }

  function addFilters() {
    var n = selectedTags.length;
    for (var i = 0; i < n, i++; ) {
      switch (selectedTags[i]) {
        case "Active":
          setResources(filterByActive(resources));
          break;
        case "InActive":
          setResources(filterByInActive(resources));
          break;
        case "Pop Up Offer/s":
          setResources([
            ...new Set(resources.concat(filterByPopUp(data.offerMany))),
          ]);
          break;
        case "Banner Offer/s":
          setResources([
            ...new Set(resources.concat(filterByBanner(data.offerMany))),
          ]);
          break;
        case "Post Purchase Offer/s":
          setResources([
            ...new Set(resources.concat(filterByPostPurchase(data.offerMany))),
          ]);
          break;
        case "Page Embedded Offer/s":
          setResources([
            ...new Set(resources.concat(filterByPageEmbedded(data.offerMany))),
          ]);
          break;
      }
    }
    return resources;
  }

  function removeTag(tag) {
    removefilter(selectedTags, tag);
    setSelectedTags(selectedTags.filter((previousTag) => previousTag !== tag));
  }

  if (loading)
    return <Spinner accessibilityLabel="Spinner example" size="large" />;

  if (error)
    return (
      <Banner title="Fetching Data Error" status="critical">
        <p>
          <DisplayText size="large"> {error.message} ! </DisplayText>
        </p>
      </Banner>
    );

  function renderSwitch(x) {
    switch (x) {
      case 1:
        return "Pop Up Offer";
        break;
      case 2:
        return "Post Purchase Offer";
        break;
      case 3:
        return "Banner Offer";
        break;
      case 4:
        return "Page Embedded Offer";
        break;
    }
  }

  function parseDate(input) {
    let parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]).toDateString();
  }

  const activatorStatus = (
    <Button onClick={toggleActiveStatus} disclosure>
      Offer Status
    </Button>
  );

  const activatorOfferTpe = (
    <Button onClick={toggleActiveType} disclosure>
      Offer Type
    </Button>
  );

  const tagMarkup = selectedTags.map((option) => (
    <Tag
      key={option}
      onRemove={() => {
        removeTag(option);
      }}
    >
      {option}
    </Tag>
  ));

  function FilterActive() {
    if (activeFilter === true && active === true) {
      setResources(filterByActive(resources));
    }
    if (activeFilter === true && active === false) {
      setResources(filterByInActiveActive(resources));
    }
  }

  return (
    <Page
      fullWidth
      title={<Heading>Offer List</Heading>}
      primaryAction={{
        content: "Create offer",
        onAction: () => {
          router.push("/new-offer");
        },
      }}
      divider
    >
      <div>
        <ButtonGroup>
          {/*  <Popover
            active={activeStatus}
            activator={activatorStatus}
            onClose={toggleActiveStatus}
          > */}
          {/*  <ActionList
              items={[
                {
                  content: "Active",
                  onAction: () => {
                    if (
                      !selectedTags.includes("Active") &&
                      !selectedTags.includes("InActive")
                    ) {
                      setResources(resources.filter((offer) => offer.isActive));
                      selectedTags.push("Active");
                    }
                    setActiveStatus(false);
                  },
                },
                {
                  content: "InActive",
                  onAction: () => {
                    if (
                      !selectedTags.includes("Active") &&
                      !selectedTags.includes("InActive")
                    ) {
                      setResources(
                        resources.filter((offer) => !offer.isActive)
                      );
                      selectedTags.push("InActive");
                    }
                    setActiveStatus(false);
                  },
                },
              ]}
            /> */}
          {/* </Popover> */}
          <Popover
            active={activeType}
            activator={activatorOfferTpe}
            onClose={toggleActiveType}
          >
            <ActionList
              items={[
                {
                  content: "Pop Up",
                  onAction: () => {
                    if (!selectedTags.includes("Pop Up Offer/s")) {
                      if (selectedTags.length === 0) {
                        setResources(filterByPopUp(data.offerMany));
                      } else {
                        setResources([
                          ...new Set(
                            resources.concat(filterByPopUp(data.offerMany))
                          ),
                        ]);
                      }

                      selectedTags.push("Pop Up Offer/s");
                      FilterActive();
                    }
                    setActiveType(false);
                  },
                },
                {
                  content: "Banner",
                  onAction: () => {
                    {
                      if (!selectedTags.includes("Banner Offer/s")) {
                        if (selectedTags.length === 0) {
                          setResources(filterByBanner(data.offerMany));
                        } else {
                          setResources([
                            ...new Set(
                              resources.concat(filterByBanner(data.offerMany))
                            ),
                          ]);
                        }
                        selectedTags.push("Banner Offer/s");
                        FilterActive();
                      }
                      setActiveType(false);
                    }
                  },
                },
                {
                  content: "Post Purchase",
                  onAction: () => {
                    {
                      if (!selectedTags.includes("Post Purchase Offer/s")) {
                        if (selectedTags.length === 0) {
                          setResources(filterByPostPurchase(data.offerMany));
                        } else {
                          setResources([
                            ...new Set(
                              resources.concat(
                                filterByPostPurchase(data.offerMany)
                              )
                            ),
                          ]);
                        }

                        selectedTags.push("Post Purchase Offer/s");
                        FilterActive();
                      }
                      setActiveType(false);
                    }
                  },
                },
                {
                  content: "Page Embedded",
                  onAction: () => {
                    {
                      if (!selectedTags.includes("Page Embedded Offer/s")) {
                        if (selectedTags.length === 0) {
                          setResources(filterByPageEmbedded(data.offerMany));
                        } else {
                          setResources([
                            ...new Set(
                              resources.concat(
                                filterByPageEmbedded(data.offerMany)
                              )
                            ),
                          ]);
                        }

                        selectedTags.push("Page Embedded Offer/s");
                        FilterActive();
                      }
                      setActiveType(false);
                    }
                  },
                },
              ]}
            />
          </Popover>
          <Stack spacing="tight">{tagMarkup}</Stack>;
          {activeFilter ? (
            <Tag
              key={active}
              onRemove={() => {
                setActiveFilter(false);

                setResources(data.offerMany);
              }}
            >
              {active}
            </Tag>
          ) : (
            ""
          )}
        </ButtonGroup>
      </div>
      <Page fullWidth>
        <IndexTable
          resourceName={resourceName}
          itemCount={resources.length}
          selectedItemsCount={selectedResources.length}
          onSelectionChange={handleSelectionChange}
          bulkActions={bulkActions}
          hasMoreItems
          promotedBulkActions={promotedBulkActions}
          headings={[
            { title: "Offer Type" },
            { title: "Start Date" },
            { title: "Activation" },
            { title: "Deletion" },
          ]}
        >
          {addFilters().map((offer, index) => {
            return (
              <IndexTable.Row
                id={offer._id}
                key={offer._id}
                selected={selectedResources.includes(offer._id)}
                position={index}
              >
                <IndexTable.Cell>{renderSwitch(offer.catId)}</IndexTable.Cell>
                <IndexTable.Cell>{parseDate(offer.startDate)}</IndexTable.Cell>
                <IndexTable.Cell>
                  <ToggleButton
                    isActive={offer.isActive}
                    actioName={() => ToggleOneOffer(offer._id)}
                  />
                  <a data-primary-link></a>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <DeleteButtonPopOverActivator
                    actionName={() => DeleteOneOffer(offer._id)}
                  />
                </IndexTable.Cell>
              </IndexTable.Row>
            );
          })}
        </IndexTable>
      </Page>
    </Page>
  );
};

export default OffersList;
