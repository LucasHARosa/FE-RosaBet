import Text from "../common/text";
import ReactPortal from "../reactPortal";
import { ContainerModal, HeaderModal, ModalBody, OverlayModal } from "./styles";
import Icon from "@/utils/icon";
// import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";

export default function Modal({
  title,
  children,
  onCancel,
  visible,
  minHeight,
  minWidth,
  isHandleClose = false,
  bg,
}: ModalProps) {
  
  return (
    <ReactPortal containerId="modal_root">
      {visible && (
        <OverlayModal visible={visible}>
          <ContainerModal minHeight={minHeight} minWidth={minWidth} visible={visible} bg={bg}>
            <HeaderModal >
              <Text htmlTag="h1" font="heading/m/bold">
                {title}
              </Text>
              {isHandleClose === false && 
                <button type="button" onClick={onCancel}>
                  <Icon name="closeCircle" color="text.dynamic.whiteDynamic.40" size={24} />
                </button>
              }
              
            </HeaderModal>

            <div className=""></div>

            <ModalBody>{children}</ModalBody>
          </ContainerModal>
        </OverlayModal>
      )}
    </ReactPortal>
  );
}

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  visible: boolean;
  minHeight?: number;
  minWidth?: string;
  isHandleClose?: boolean;
  bg?: string;
}
