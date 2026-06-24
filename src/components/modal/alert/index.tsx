/* eslint-disable react/display-name */
"use client";
import Text from "@/components/common/text";
import { forwardRef } from "react";
import Modal from "..";
import useAlert from "./useAlert";
import { Ball, Container } from "./styles";
import Icon from "@/utils/icon";
import { Link } from "@/components/common/button";

const ModalAlert = forwardRef(({ title, message, type, route, textRoute, iconRoute }: ModalAlertProps, ref) => {
  const { closeModal, open } = useAlert(ref);

  const mappers = {
    success: {
      bg: "success",
      Icon: <Icon name="success" size={62} color="brand.secondary.accent.green.100" />,
      color: "brand.secondary.accent.green.100",
    },
    alert: {
      bg: "alert",
      Icon: <Icon name="alert" size={62} color="brand.secondary.accent.textYellow" />,
      color: "brand.secondary.accent.textYellow",
    },
    info: {
      bg: "info",
      Icon: <Icon name="info" size={62} color="text.dynamic.whiteDynamic.64" />,
      color: "text.dynamic.whiteDynamic.100",
    },
    error: {
      bg: "error",
      Icon: <Icon name="error" size={62} color="brand.primary.100" />,
      color: "brand.primary.100",
    },
  };

  return (
    <Modal minHeight={150} title={title} onCancel={closeModal} visible={open}>
      <Container>
        {type && <Ball bg={mappers[type].bg}>{mappers[type].Icon}</Ball>}
        <Text htmlTag="small" font="paragraph/l/regular" color="text.dynamic.whiteDynamic.80">
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Text>
        {type &&route && textRoute && (
          <Link.Root bg="background.dynamic.whiteDynamic.4" href={route} onClick={closeModal} orientation="h" w="full" justifycontent="center">
            {iconRoute && <Icon name={iconRoute} size={12} color={mappers[type].color} />}
            <Link.Text font="label/body/s/regular" color={mappers[type].color} >
              {textRoute}
            </Link.Text>
          </Link.Root>
        )}
        
      </Container>
    </Modal>
  );
});

export default ModalAlert;

interface ModalAlertProps {
  title: string;
  message: string;
  type?: "success" | "error" | "alert" | "info";
  route?: string;
  textRoute?: string;
  iconRoute?: string;
}
