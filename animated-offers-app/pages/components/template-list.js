import {Card, Image, RadioButton, Stack, Spinner, Modal} from "@shopify/polaris";
import * as realm from "../../helpers/mongodb-realm";
import {gql, useQuery} from "@apollo/client";
import {useCallback, useState} from "react";


const client = realm.getApolloClient();

const storeFrontUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL;

const TemplateList = ({catId, handleTemplateChange}) => {
  const GET_Templates = gql`
  query($catId: [Int]) {
  templates (query: {cats_in: $catId}) {
    _id
    cats
    internalName
    isActive
    jsonPath
    name
    previewPath
    thumb_img
    preview_img
    scriptPath
    templatePath
    params{
      text {
        id
        label
        type
        value
      }
      images {
        id
      }
    }
  }
}
`;
  const [previewPopupOpen, setPreviewPopupOpen] = useState(false);
  const [clickedTemplate, setClickedTemplate] = useState({});
  const handleThumbClick = useCallback((template) => {
    setPreviewPopupOpen(true);
    setClickedTemplate(template);
  }, [previewPopupOpen]);

  const {loading, error, data} = useQuery(GET_Templates, {client, variables: {catId}});

  if (loading) return <Spinner accessibilityLabel="loading templates" size="large"/>;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Card sectioned>
        <Stack distribution="fillEvenly">
          {data.templates.map(template => (
            <div key={template._id}>
              <Image width={200} style={{cursor: "pointer"}}
                     onClick={() => handleThumbClick(template)}
                     src={`${storeFrontUrl}/styles${template.thumb_img}`}/>
              <div style={{paddingLeft: 95}}>
                <RadioButton
                  id={JSON.stringify(template)} // weird!!!! why do we have to do this?!
                  name="template"
                  value={template._id}
                  onChange={handleTemplateChange}
                  label=""/>
              </div>
            </div>
          ))}
        </Stack>
      </Card>
        <Modal
          open={previewPopupOpen}
          onClose={() => {
            setPreviewPopupOpen(false)
          }}
          title="Offer template preview">
          <Modal.Section>
            <video width="500" height="500" autoPlay loop>
              <source src={`${storeFrontUrl}/styles${clickedTemplate.preview_img}`}
                      type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
          </Modal.Section>
        </Modal>

    </>
  )
};

export default TemplateList;
