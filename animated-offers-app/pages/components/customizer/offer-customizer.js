import {
  Stack,
  Card,
  Layout,
  Frame,
  Icon,
  Button,
  TextContainer,
  Modal,
  Banner,
} from "@shopify/polaris";
import { useCallback, useContext, useEffect, useState } from "react";
import * as iframeHelpers from "../../../helpers/iframe";
import DynamicInputList from "./dynamic-input-list";
import DynamicImageList from "./dynamic-image-list";
import DynamicColorList from "./dynamic-color-list";
import { OfferContext } from "../../../state/offer/offer-context";

const OffersCustomizer = () => {
  const { offer, dispatch } = useContext(OfferContext);
  const storeFrontUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL;

  useEffect(() => {
    iframeHelpers.passDataToIframe("previewFrame", offer.params);
  }, [offer.params]);

  return (
    <>
      <Layout.Section>
        <Card sectioned>
          <iframe
            id="previewFrame"
            src={storeFrontUrl + offer.template.templatePath}
            style={{ width: 900, height: 500, border: 0, overflow: "hidden" }}
          />
        </Card>
      </Layout.Section>
      {offer.template.params.text != null &&
        offer.template.params.text.length > 0 && (
          <Layout.AnnotatedSection
            title="Offer Text"
            description="Please fill the inputs to customize the offer text"
          >
            <DynamicInputList />
          </Layout.AnnotatedSection>
        )}
      {offer.template.params.colors != null &&
        offer.template.params.colors.length > 0 && (
          <Layout.AnnotatedSection
            title="Offer Text Color"
            description="Please choose the color to customize the offer text color"
          >
            <DynamicColorList />
          </Layout.AnnotatedSection>
        )}
      {offer.template.params.images != null &&
        offer.template.params.images.length > 0 && (
          <Layout.AnnotatedSection
            title="Offer Images"
            description="Please upload the offer images"
          >
            {offer.catId == 2 && offer.template.params.images.length > 1 && (
              <Banner title="You can add up to three images."></Banner>
            )}
            <DynamicImageList />
          </Layout.AnnotatedSection>
        )}
    </>
  );
};

export default OffersCustomizer;
