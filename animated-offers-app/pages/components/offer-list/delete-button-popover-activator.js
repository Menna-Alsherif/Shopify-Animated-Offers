import React, { useCallback, useState } from "react";
import { Button, TextContainer, Modal, Icon } from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";

const DeleteButtonPopoverActivator = (props) => {
  const [active, setActive] = useState(false);

  const handleChange = () => {
    setActive(!active);
  };

  const deleteOffer = () => {
    props.actionName();
  };

  const activator = (
    <p style={{ flex: 1 }} onClick={handleChange}>
      <Icon source={DeleteMajor} color="base" />
    </p>
  );

  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Confirm Deletion"
        primaryAction={{
          content: "Confirm Delete",
          onAction: deleteOffer,
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>Are you sure you want to delete this offer?</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default DeleteButtonPopoverActivator;
