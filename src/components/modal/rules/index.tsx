/* eslint-disable react/display-name */
"use client";
import Text from "@/components/common/text";
import { forwardRef } from "react";
import Modal from "..";
import { Container, Detail, SubRule } from "./styles";
import useRules from "./useRules";
import Loading from "./loading";

const ModalRules = forwardRef((_, ref) => {
  const { closeModal, open, loading, data } = useRules(ref);

  return (
    <Modal title={"Detalhes"} onCancel={closeModal} visible={open}>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Text font="paragraph/m/bold" color="text.dynamic.whiteDynamic.100">
            {data.title_language?.portuguese}
          </Text>

          <SubRule>
            {data.items?.map((subrule) => (
              <Detail key={subrule._id}>
                <Text htmlTag="small" font="label/body/m/regular">
                  {subrule.title}
                </Text>
                <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.64">
                  {subrule.description}
                </Text>
              </Detail>
            ))}
          </SubRule>
        </Container>
      )}
    </Modal>
  );
});

export default ModalRules;
