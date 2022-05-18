import {
  Tag,
  Card,
  Button,
  Stack,
  TextContainer,
  Icon,
  RadioButton,
  Layout,
  ResourceList,
  ResourceItem,
  TextStyle,
  Thumbnail,
  SkeletonThumbnail,
} from "@shopify/polaris";
import { useContext, useEffect, useReducer, useState } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { OfferContext } from "../../../../state/offer/offer-context";

const OfferTriggerProductAndCollection = ({
  resourceType,
  setResourceType,
  pickerIsOpen,
  setPickerIsOpen,
}) => {
  const { offer, dispatch } = useContext(OfferContext);
  const productSelectionReducer = (selection, action) => {
    switch (action.type) {
      case "add":
        return [...selection, action.selection];
      case "remove":
        const newSelection = [];
        selection.forEach((p) => {
          if (p.id !== action.id) newSelection.push(p);
        });
        return newSelection;
      case "reset":
        return [];
    }
  };
  const [productSelection, dispatchProduct] = useReducer(
    productSelectionReducer,
    []
  );

  const collectionSelectionReducer = (selection, action) => {
    switch (action.type) {
      case "add":
        return [...selection, action.selection];
      case "remove":
        const newSelection = [];
        selection.forEach((p) => {
          if (p.id !== action.id) newSelection.push(p);
        });
        return newSelection;
      case "reset":
        return [];
    }
  };
  const [collectionSelection, dispatchCollection] = useReducer(
    collectionSelectionReducer,
    []
  );

  const handleProductSelection = (resources) => {
    dispatchProduct({ type: "reset" });
    resources.selection.forEach((resource) => {
      dispatchProduct({ type: "add", selection: resource });
    });
  };

  const handleCollectionSelection = (resources) => {
    dispatchCollection({ type: "reset" });
    resources.selection.forEach((resource) => {
      dispatchCollection({ type: "add", selection: resource });
    });
  };

  useEffect(() => {
    if (productSelection.length > 0) {
      const value = {
        type: "product",
        products: productSelection.map(({ id, title }) => {
          return { id, title };
        }),
      };
      dispatch({ type: "setTrigger", value });
    } else {
      dispatch({
        type: "removeTrigger",
        value: "product",
      });
    }
  }, [productSelection]);

  useEffect(() => {
    if (collectionSelection.length > 0) {
      const value = {
        type: "collection",
        collections: collectionSelection.map(({ id, title }) => {
          return { id, title };
        }),
      };
      dispatch({ type: "setTrigger", value });
    } else {
      dispatch({
        type: "removeTrigger",
        value: "collection",
      });
    }
  }, [collectionSelection]);

  const getProductIcon = ({ images, title }) => {
    if (images.length > 0) {
      return (
        <Thumbnail source={images[0].originalSrc} size="small" alt={title} />
      );
    } else {
      return <SkeletonThumbnail size="small" />;
    }
  };
  const getCollectionIcon = ({ image, title }) => {
    if (image) {
      return <Thumbnail source={image.originalSrc} size="small" alt={title} />;
    } else {
      return <SkeletonThumbnail size="small" />;
    }
  };
  return (
    <>
      {pickerIsOpen && resourceType === "Product" && (
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={pickerIsOpen}
          initialSelectionIds={productSelection}
          onSelection={(resources) => {
            handleProductSelection(resources);
            setPickerIsOpen(false);
          }}
          onCancel={() => {
            setPickerIsOpen(false);
          }}
        />
      )}

      {pickerIsOpen && resourceType === "Collection" && (
        <ResourcePicker
          resourceType="Collection"
          showVariants={false}
          open={pickerIsOpen}
          initialSelectionIds={collectionSelection}
          onSelection={(resources) => {
            handleCollectionSelection(resources);
            setPickerIsOpen(false);
          }}
          onCancel={() => {
            setPickerIsOpen(false);
          }}
        />
      )}

      {productSelection.length > 0 && resourceType !== "" && (
        <Card
          sectioned
          title={"Product Triggers"}
          actions={[
            {
              content: "edit",
              onAction() {
                setResourceType("Product");
                setPickerIsOpen(true);
              },
            },
          ]}
        >
          <Layout>
            <Layout.Section>
              <ResourceList
                resourceName={{ singular: "customer", plural: "customers" }}
                items={productSelection}
                renderItem={(item) => {
                  const { id, title, images } = item;
                  const shortcutActions = [
                    {
                      content: "remove",
                      accessibilityLabel: title,
                      onClick: () => {
                        dispatchProduct({ type: "remove", id });
                      },
                    },
                  ];
                  return (
                    <ResourceItem
                      id={id}
                      media={getProductIcon(item)}
                      accessibilityLabel={title}
                      shortcutActions={shortcutActions}
                      persistActions
                    >
                      <h3>
                        <TextStyle variation="strong">{title}</TextStyle>
                      </h3>
                    </ResourceItem>
                  );
                }}
              />
            </Layout.Section>
          </Layout>
        </Card>
      )}
      {collectionSelection.length > 0 && resourceType !== "" && (
        <Card
          sectioned
          title={"Collection Triggers"}
          actions={[
            {
              content: "edit",
              onAction() {
                setResourceType("Collection");
                setPickerIsOpen(true);
              },
            },
          ]}
        >
          <Layout>
            <Layout.Section>
              <ResourceList
                resourceName={{ singular: "customer", plural: "customers" }}
                items={collectionSelection}
                renderItem={(item) => {
                  const { id, title, image } = item;
                  const shortcutActions = [
                    {
                      content: "remove",
                      accessibilityLabel: title,
                      onClick: () => {
                        dispatchCollection({ type: "remove", id });
                      },
                    },
                  ];
                  return (
                    <ResourceItem
                      id={id}
                      media={getCollectionIcon(item)}
                      accessibilityLabel={title}
                      shortcutActions={shortcutActions}
                      persistActions
                    >
                      <h3>
                        <TextStyle variation="strong">{title}</TextStyle>
                      </h3>
                    </ResourceItem>
                  );
                }}
              />
            </Layout.Section>
          </Layout>
        </Card>
      )}
    </>
  );
};

export default OfferTriggerProductAndCollection;
