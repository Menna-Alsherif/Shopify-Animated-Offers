import {
  Card,
  Image,
  RadioButton,
  Stack,
  Spinner,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as dataHelper from "../../../helpers/data";
import { OfferContext } from "../../../state/offer/offer-context";

const DynamicInputList = () => {
  const { control, getValues } = useForm();
  const { offer, dispatch } = useContext(OfferContext);

  // nice to have as the template comes already with default values
  // first time load to handle default values from the template, no deps
  useEffect(() => {
    updateStateWithFormValues();
  }, []);

  const updateStateWithFormValues = () => {
    const data = dataHelper.convertObjectToKeyValueArray(getValues());
    dispatch({
      type: "setParamText",
      data,
    });
  };

  return (
    <Card sectioned>
      <FormLayout>
        {/*TODO: add context validation: i.e under each input in addition to the modal */}
        {offer.template.params.text.map((param) => (
          <Controller
            key={param.id}
            name={param.id}
            control={control}
            defaultValue={param.value}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label={param.label}
                value={field.value}
                style={{ height: 150 }}
                multiline={param.type === "textarea"}
                onChange={(value) => {
                  field.onChange(value);
                  updateStateWithFormValues();
                }}
              />
            )}
          />
        ))}
      </FormLayout>
    </Card>
  );
};

export default DynamicInputList;
