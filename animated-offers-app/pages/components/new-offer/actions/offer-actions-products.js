import {
  Tag,
  Card,
  Button,
  Select,
  TextField,
  Icon,
  FormLayout,
  Layout,
  ResourceList,
  ResourceItem,
  TextStyle,
  Thumbnail,
  SkeletonThumbnail,
} from "@shopify/polaris";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { OfferContext } from "../../../../state/offer/offer-context";

const OfferActionProducts = ({
  productPickerIsOpen,
  setProductPickerIsOpen,
  productAction,
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

  const [discountType, setDiscountType] = useState("percent");
  const handleDiscountTypeChange = useCallback(
    (value) => setDiscountType(value),
    []
  );
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleProductSelection = (resources) => {
    dispatchProduct({ type: "reset" });
    resources.selection.forEach((resource) => {
      dispatchProduct({ type: "add", selection: resource });
    });
  };

  useEffect(() => {
    if (productAction !== "" && productSelection.length > 0) {
      const products = productSelection.map(({ id, title }) => {
        return { id, title };
      });

      const discount = {
        type: discountType,
        amount: discountAmount,
      };

      const value = {
        type: productAction.key,
        products,
        discount,
      };
      dispatch({ type: "setAction", value });
    }
  }, [productSelection, discountType, discountAmount]);

  const getProductIcon = ({ image, title }) => {
    if (image) {
      return <Thumbnail source={image.originalSrc} size="small" alt={title} />;
    } else {
      return <SkeletonThumbnail size="small" />;
    }
  };
  return (
    <>
      {productPickerIsOpen && (
        <ResourcePicker
          resourceType="ProductVariant"
          showVariants={false}
          open={productPickerIsOpen}
          initialSelectionIds={productSelection}
          onSelection={(resources) => {
            handleProductSelection(resources);
            setProductPickerIsOpen(false);
          }}
          onCancel={() => {
            setProductPickerIsOpen(false);
          }}
        />
      )}

      {productSelection.length > 0 && (
        <Card
          sectioned
          title={productAction.name}
          actions={[
            {
              content: "edit",
              onAction() {
                setProductPickerIsOpen(true);
              },
            },
            {
              content: "remove",
              onAction() {
                dispatchProduct({ type: "reset" });
                dispatch({
                  type: "removeAction",
                  value: {
                    type: productAction,
                  },
                });
              },
            },
          ]}
        >
          <Layout sectioned>
            <Layout.AnnotatedSection
              title="Products"
              description="The products that will be added to the cart / order"
            >
              <ResourceList
                resourceName={{ singular: "customer", plural: "customers" }}
                items={productSelection}
                renderItem={(item) => {
                  console.log(item);
                  const { id, title, image } = item;
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
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
              title="Discount"
              description="How much discount will be applied"
            >
              <FormLayout>
                <Select
                  label="Discount type"
                  options={[
                    { label: "Percent", value: "percent" },
                    { label: "Amount", value: "amount" },
                  ]}
                  onChange={handleDiscountTypeChange}
                  value={discountType}
                />
                <TextField
                  type="number"
                  label="Discount amount"
                  value={discountAmount}
                  onChange={setDiscountAmount}
                />
              </FormLayout>
            </Layout.AnnotatedSection>
          </Layout>
        </Card>
      )}
    </>
  );
};

export default OfferActionProducts;
