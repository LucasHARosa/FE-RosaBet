"use client";

import {
  Badge,
  Box,
  Content,
  Group,
  GroupNotifications,
  Header,
  Messages,
  Notification,
} from "./styles";
import Text from "@/components/common/text";
import useNotifications from "./useNotifications";
import { dateAndHourConverter } from "@/utils/data-converter";
import ModalAlert from "@/components/modal/alert";
import Loading from "./loading";
import { Button } from "@/components/common/button";
import ModalPermission from "@/components/modal/permission";
import { IoSettingsSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Notifications() {
  const {
    messages,
    openNotification,
    messageDetail,
    modalAlertRef,
    modalPermissionRef,
    openSettings,
    loading,
    removeNotification,
  } = useNotifications();

  return (
    <Box>
      <Header>
        <Text htmlTag="h1" font="heading/m/bold">
          Notificações
        </Text>
        <Button.Root onClick={openSettings} bg="background.dynamic.whiteDynamic.4">
          <Button.Icon icon={IoSettingsSharp} size={19} />
        </Button.Root>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <Content>
          {messages.length === 0 ? (
            <Text htmlTag="small" font="label/body/m/bold" color="text.dynamic.whiteDynamic.64">
              Sem notificações
            </Text>
          ) : (
            <GroupNotifications>
              {messages.map((message) => (
                <Notification key={message._id} unread={message.status === "UNREAD"}>
                  <Messages onClick={() => openNotification(message._id)}>
                    {message.status === "UNREAD" && (
                      <Text htmlTag="small" font="label/body/m/bold">
                        <Badge unread={message.status === "UNREAD"} /> Nova mensagem
                      </Text>
                    )}
                    <Text htmlTag="small" font="paragraph/m/regular" color="text.dynamic.whiteDynamic.64">
                      {message.title}
                    </Text>
                  </Messages>
                  <Group>
                    <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
                      {message.date}
                    </Text>
                    {message.status !== "UNREAD" && (
                      <Button.Root onClick={() => removeNotification(message._id)}>
                        <Button.Icon icon={RiDeleteBin6Line} size={14} />
                      </Button.Root>
                    )}
                  </Group>
                </Notification>
              ))}
            </GroupNotifications>
          )}
        </Content>
      )}

      <ModalPermission ref={modalPermissionRef} />
      <ModalAlert
        ref={modalAlertRef}
        message={
          `<h6>${dateAndHourConverter(messageDetail.date)}</h6>` +
          messageDetail.notification?.message
        }
        title={messageDetail.title}
      />
    </Box>
  );
}
