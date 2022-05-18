import { Card, FormLayout } from "@shopify/polaris";
import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as dataHelper from "../../../helpers/data";
import { OfferContext } from "../../../state/offer/offer-context";
import { SketchPicker } from "react-color";

const DynamicColorList = () => {
  const { control, getValues } = useForm();
  const { offer, dispatch } = useContext(OfferContext);
  const [display, setDisplay] = useState([]);

  // nice to have as the template comes already with default values
  // first time load to handle default values from the template, no deps
  useEffect(() => {
    var dis = [];
    for (var i = 0; i < offer.template.params.colors.length; i++) {
      dis[i] = false;
    }
    setDisplay(dis);
    updateStateWithFormValues();
  }, []);

  const updateStateWithFormValues = () => {
    const data = dataHelper.convertObjectToKeyValueArray(getValues());
    dispatch({
      type: "setParamColor",
      data,
    });
  };

  return (
    <Card sectioned>
      <FormLayout>
        {/*TODO: add context validation: i.e under each input in addition to the modal */}
        {offer.template.params.colors.map((param, index) => (
          <Controller
            key={param.id}
            name={param.id}
            control={control}
            defaultValue={param.value}
            rules={{ required: true }}
            render={({ field }) => (
              <div>
                <div
                  style={{
                    display: "inline-block",
                    textAlign: "right",
                    paddingRight: "50px",
                    verticalAlign: "top",
                  }}
                >
                  <label style={{ height: "80px" }}>{param.label}</label>
                </div>

                <div
                  style={{
                    display: "inline-block",
                    float: "right",
                    // paddingRight: "150px",
                  }}
                >
                  <div
                    style={{
                      padding: "5px",
                      background: "#fff",
                      borderRadius: "1px",
                      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setDisplay((prevState) =>
                        prevState.map((item, idx) =>
                          idx === index ? !item : item
                        )
                      )
                    }
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "14px",
                        borderRadius: "2px",
                        background: `${param.value}`,
                      }}
                    />
                  </div>
                  {display[index] ? (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "500",
                        right: "5%",
                      }}
                    >
                      <div
                        style={{
                          position: "fixed",
                          top: "0px",
                          right: "0px",
                          bottom: "0px",
                          left: "0px",
                        }}
                        onClick={() =>
                          setDisplay((prevState) =>
                            prevState.map((item, idx) =>
                              idx === index ? false : item
                            )
                          )
                        }
                      />
                      <SketchPicker
                        color={field.value}
                        onChange={(value) => {
                          field.onChange(value.hex);
                          param.value = value.hex;
                          updateStateWithFormValues();
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          />
        ))}
      </FormLayout>
    </Card>
  );
};

export default DynamicColorList;
