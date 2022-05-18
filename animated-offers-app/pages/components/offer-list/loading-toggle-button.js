import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@shopify/polaris";

const ToggleButton = (props) => {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(props.isActive);
  const subscribe = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 750);
    setActive(!active);
    if (active) {
    }
    props.actioName();
  };

  useEffect(() => {
    setActive(props.isActive);
  }, [props.isActive]);

  return (
    <>
      {!loading && active && (
        <Button onClick={subscribe}>DeActivate Offer</Button>
      )}

      {!loading && !active && (
        <Button primary onClick={subscribe}>
          Activate Offer
        </Button>
      )}

      {loading && (
        <Button onClick={subscribe}>
          <Spinner accessibilityLabel="Spinner example" size="small" />
        </Button>
      )}
    </>
  );
};

export default ToggleButton;
