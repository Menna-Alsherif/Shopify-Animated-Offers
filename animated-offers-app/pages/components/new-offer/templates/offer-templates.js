import {
  Card,
  Image,
  RadioButton,
  Stack,
  Spinner,
  Modal,
} from "@shopify/polaris";
import { gql, useQuery } from "@apollo/client";
import { useCallback, useContext, useEffect, useState } from "react";
import { OfferContext } from "../../../../state/offer/offer-context";
import { GET_TEMPLATES } from "../../../../graphql/mongodb";
import { getApolloClient } from "../../../../helpers/graphql";

const dbClient = getApolloClient();

const storeFrontUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL;

const OfferTemplates = () => {
  const { offer, dispatch } = useContext(OfferContext);
  const [previewPopupOpen, setPreviewPopupOpen] = useState(false);
  const [clickedTemplate, setClickedTemplate] = useState({});
  const handleThumbClick = useCallback(
    (template) => {
      setPreviewPopupOpen(true);
      setClickedTemplate(template);
    },
    [previewPopupOpen]
  );

  const { loading, error, data } = useQuery(GET_TEMPLATES, {
    client: dbClient,
    variables: { catId: offer.catId },
  });

  if (loading)
    return <Spinner accessibilityLabel="loading templates" size="large" />;
  if (error) return `Error! ${error.message}`;

  function handleTemplateChange(checked, templateString) {
    const template = JSON.parse(templateString); // weird!!!!
    dispatch({
      type: "setTemplate",
      template,
    });
  }

  return (
    <>
      <Card sectioned>
        <Stack distribution="fillEvenly">
          {data.templateMany.map((template) => (
            <div key={template._id}>
              <Image
                width={200}
                style={{ cursor: "pointer" }}
                onClick={() => handleThumbClick(template)}
                src={`${storeFrontUrl}/styles${template.thumb_img}`}
              />
              <div style={{ paddingLeft: 95 }}>
                <RadioButton
                  id={JSON.stringify(template)} // weird!!!! why do we have to do this?!
                  name="template"
                  value={template._id}
                  onChange={handleTemplateChange}
                  label=""
                />
              </div>
            </div>
          ))}
        </Stack>
      </Card>
      <Modal
        open={previewPopupOpen}
        onClose={() => {
          setPreviewPopupOpen(false);
        }}
        title="Offer template preview"
      >
        <Modal.Section>
          <video width="500" height="500" autoPlay loop>
            <source
              src={`${storeFrontUrl}/styles${clickedTemplate.preview_img}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Modal.Section>
      </Modal>
    </>
  );
};

export default OfferTemplates;
