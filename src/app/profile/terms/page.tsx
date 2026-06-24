"use client";
import { useState, useEffect, useRef } from "react";
import { Box, Content, Header, Info, Item } from "./styles";
import Text from "@/components/common/text";
import { rules } from "@/service/rules";
import { RulesI } from "@/interfaces/rules";
import ModalRules from "@/components/modal/rules";
import Loading from "./loading";
import Icon from "@/utils/icon";

export default function Terms() {
  const [data, setData] = useState<RulesI[]>([] as RulesI[]);
  const [loading, setLoading] = useState<boolean>(true);
  const modalRulesRef = useRef<any>(null);

  const getRules = async () => {
    setLoading(true);

    try {
      const response = await rules();
      setData(response);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const openRule = async (id: string) => {
    modalRulesRef?.current.openModal(id);
  };

  useEffect(() => {
    getRules();
  }, []);

  return (
    <Box>
      <Header>
        <Text htmlTag="h1" font="heading/m/bold">
          Privacidade & Termos
        </Text>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <Content>
          {data.map((rule) => (
            <Item key={rule._id} onClick={() => openRule(rule._id)}>
              <Info>
                <Text htmlTag="h4" font="paragraph/m/bold">
                  {rule.title_language.portuguese}
                </Text>
              </Info>
              <Icon name="arrowRightIos" color="text.dynamic.whiteDynamic.64" size={18} />
            </Item>
          ))}
        </Content>
      )}

      <ModalRules ref={modalRulesRef} />
    </Box>
  );
}
