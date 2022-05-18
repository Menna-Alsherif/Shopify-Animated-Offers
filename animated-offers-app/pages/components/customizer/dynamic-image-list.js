import { Caption, DropZone, Thumbnail, Stack } from "@shopify/polaris";
import { useState, useContext, useCallback, useEffect } from "react";
import { NoteMinor } from "@shopify/polaris-icons";
import * as cloudinary from "../../../helpers/cloudinary";
import { OfferContext } from "../../../state/offer/offer-context";

const DynamicImageList = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFileInfo, setUploadedFileInfo] = useState([]);

  const { offer, dispatch } = useContext(OfferContext);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setFiles((files) => [...files, ...acceptedFiles]);
    },
    []
  );

  function fileIsUploaded(file) {
    for (const info of uploadedFileInfo) {
      if (file.name === info.original_filename) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    async function upload() {
      for (const file of files) {
        if (!fileIsUploaded(file)) {
          //TODO: add loading on save button
          const {
            original_filename,
            format,
            secure_url,
          } = await cloudinary.uploadImage(file, offer);

          setUploadedFileInfo((existingData) => [
            ...existingData,
            { original_filename, format, secure_url },
          ]);
        }
      }
    }

    upload();
  }, [files]);

  useEffect(() => {
    // pass up only urls, no need for the rest of fields
    const data = uploadedFileInfo.map((file) => ({ url: file.secure_url }));

    dispatch({
      type: "setParamImages",
      data,
    });
  }, [uploadedFileInfo]);

  //TODO: confirm extensions
  const validImageTypes = ["image/jpeg", "image/png"];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop} type="image">
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
};

export default DynamicImageList;
