import {
  Stack,
  Page,
  Layout,
  Icon,
  Button,
  TextContainer,
  Modal,
  Card,
  Spinner,
} from "@shopify/polaris";
import React, { useState, useReducer } from "react";
import { ChevronRightMinor, SaveMinor } from "@shopify/polaris-icons";
import OffersCustomizer from "./components/customizer/offer-customizer";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { offerReducer } from "../state/offer/offer-reducer";
import { emptyOffer, OfferContext } from "../state/offer/offer-context";

import { useRouter } from "next/router";
import { useApolloClient, useMutation } from "@apollo/client";

import OfferTypes from "./components/new-offer/offer-types";
import OfferTriggers from "./components/new-offer/triggers/offer-triggers";
import OfferActions from "./components/new-offer/actions/offer-actions";
import OfferConditions from "./components/new-offer/conditions/offer-conditions";
import OfferTemplates from "./components/new-offer/templates/offer-templates";
import * as appBridgeHelper from "../helpers/app-bridge";
import * as dataHelper from "../helpers/data";
import { INSERT_OFFER } from "../graphql/mongodb";
import { GET_SCRIPTS, INSERT_SCRIPT } from "../graphql/shopify";
import { getApolloClient } from "../helpers/graphql";

const storeFrontUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL;
const dbClient = getApolloClient();

// test comment to be removed later
const NewOfferWizard = () => {
  const app = useAppBridge();
  const router = useRouter();
  const shopifyClient = useApolloClient();

  const [offer, dispatch] = useReducer(offerReducer, emptyOffer);

  const [currentStep, setCurrentStep] = useState(0);

  const [saveLoading, setSaveLoading] = useState(false);

  const getOffersAPIUrl = document.location.origin + "/api/rest/public";

  const validate = () => {
    // TODO: validate
    // validate customizer
    // validate triggers, actions, conditions

    return true;
  };

  const SaveOffer = async () => {
    if (validate()) {
      // todo: save

      setSaveLoading(true);

      const shop = await appBridgeHelper.getShopUrl(app);

      const { offerType, template, ...leanOffer } = offer; // removing offerType and template
      leanOffer.shop = shop;

      const { internalName: name, templatePath: path } = offer.template; // clean template object
      leanOffer.template = { name, path };

      console.log(leanOffer);

      const insertOfferResp = await dbClient.mutate({
        mutation: INSERT_OFFER,
        variables: { offer: leanOffer },
      });

      setSaveLoading(false);

      if (insertOfferResp?.data?.insertOneOffer?._id) {
        // insert successful?

        // retrieve existing scripts to see if the offer already exists
        const getScriptsResp = await shopifyClient.query({
          query: GET_SCRIPTS,
        });

        const existingScripts = getScriptsResp?.data?.scriptTags?.edges;

        if (getScriptsResp?.data) {
          console.log(getScriptsResp.data);

          if (!existingScripts || existingScripts.length === 0) {
            const insertVars = {
              input: {
                displayScope: "ONLINE_STORE",
                src: `${storeFrontUrl}/js/start.js?api_url=${getOffersAPIUrl}`,
              },
            };

            // insert the script inot the store database (shopify)
            // in order to be rendered in the storefront for users
            const insertScriptResp = await shopifyClient.mutate({
              mutation: INSERT_SCRIPT,
              variables: insertVars,
            });

            console.log(insertScriptResp);

            if (insertScriptResp.error) {
              // todo:  handle error of insertScriptResp
            }
          }

          // setSaveLoading(false);
          // setConfirmationActive(true);
        } else {
          // TODO: handle getScriptsResp error using bugsnag
        }
      } else {
        // TODO: handle insertOfferResp error using bugsnag
      }
    }
  };

  return (
    <OfferContext.Provider value={{ offer, dispatch }}>
      <Page
        fullWidth
        title="New Offer"
        subtitle=""
        breadcrumbs={[{ content: "New Offer", url: "/new-offer" }]}
      >
        <TitleBar title="New Offer" />
        <Layout>
          {currentStep === 0 && (
            <>
              <Layout.AnnotatedSection
                title="Offer Type"
                description="Please select an offer type"
              >
                <OfferTypes dbClient={dbClient} />
              </Layout.AnnotatedSection>

              <Layout.AnnotatedSection
                title="Triggers"
                description="Please select one or more triggers"
              >
                <OfferTriggers />
              </Layout.AnnotatedSection>

              <Layout.AnnotatedSection
                title="Actions"
                description="Please select one action to be executed when the user accepts the offer"
              >
                <OfferActions />
              </Layout.AnnotatedSection>

              {/*<Layout.AnnotatedSection*/}
              {/*  title="Conditions"*/}
              {/*  description="Please select one or more conditions"*/}
              {/*>*/}
              {/*  <OfferConditions />*/}
              {/*</Layout.AnnotatedSection>*/}

              <Layout.AnnotatedSection
                title="Template"
                description="Please select an offer template, an initial design"
              >
                <OfferTemplates />
              </Layout.AnnotatedSection>

              <Layout.AnnotatedSection>
                <Stack distribution="trailing">
                  <Button
                    size="large"
                    primary
                    onClick={() => {
                      // TODO: add validation
                      setCurrentStep(1);
                    }}
                  >
                    <Stack>
                      <TextContainer>Next - Customize</TextContainer>
                      <Icon source={ChevronRightMinor} color="base" />
                    </Stack>
                  </Button>
                </Stack>
              </Layout.AnnotatedSection>
            </>
          )}
          {currentStep === 1 && (
            <>
              <OffersCustomizer />

              <Layout.AnnotatedSection>
                <Stack distribution="trailing">
                  <Button
                    size="large"
                    primary
                    onClick={SaveOffer}
                    loading={saveLoading}
                  >
                    <Stack>
                      <TextContainer>Save offer</TextContainer>
                      <Icon source={SaveMinor} color="base" />
                    </Stack>
                  </Button>
                </Stack>
              </Layout.AnnotatedSection>
            </>
          )}
        </Layout>
      </Page>
    </OfferContext.Provider>
  );
};
export default NewOfferWizard;
