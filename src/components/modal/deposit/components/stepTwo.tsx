"use client";
import { Button } from "@/components/common/button";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Amount, Country, Field, BoxButton, Money, Prize, Section, Promo } from "../styles";
import Image from "next/image";
import Text from "@/components/common/text";
import Brazil from "@/assets/brazil.svg";
import Input from "@/components/common/input";
import { GoChevronRight } from "react-icons/go";
import { DepositAvaliableI, DepositProps } from "@/interfaces/deposit";
import { currencyConverter } from "@/utils/data-converter";
import MessageError from "@/components/messageError";
import { verifyPromotionsAvailable } from "@/service/deposit";
import CheckBox from "@/components/common/checkbox";
import Radio from "@/components/common/radio";

export default function StepTwo({ handlePage, handleSubmit, handleData }: StepProps) {
  const [value, setValue] = useState<number>(0);
  const [valueDisplay, setValueDisplay] = useState<string>("0.00");
  const [promoChoose, setPromoChoose] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [promotions, setPromotions] = useState<DepositAvaliableI>({} as DepositAvaliableI);
  const [acceptBonusWelcome, setAcceptBonusWelcome] = useState<boolean>(true);
  const [codeError, setCodeError] = useState();

  const changeValue = (value: string) => {
    const numericValue = Number(value.replace(/\D/g, ""));
    setCodeError(undefined);

    const centValue = numericValue / 100;

    const formattedValue = currencyConverter(centValue);

    setValueDisplay(formattedValue);
    setValue(centValue);

    handleData((prev) => ({ ...prev, value: centValue }));
  };

  const onSubmit = async () => {
    setLoading(true);
    const e = await handleSubmit();
    if (e) {
      setCodeError(e.code);
    } else {
      handlePage(2);
    }
    setLoading(false);
  };

  const isDisabledDisplay = useMemo(
    () => valueDisplay === "0" || valueDisplay === "0.00" || valueDisplay === "0,00",
    [valueDisplay],
  );

  const BonusWelcome = () => {
    const handleAcceptBonusWelcome = () => {
      setAcceptBonusWelcome(!acceptBonusWelcome);
      handleData((prev) => ({ ...prev, receive_bonus: !acceptBonusWelcome }));
    };

    return (
      value >= 50 && (
        <CheckBox
          check={acceptBonusWelcome}
          handleCheck={handleAcceptBonusWelcome}
          title="Aceitar bônus de boas vindas"
          description="Ao usar o bônus de Boas Vindas, você automaticamente concorda com as regras de rollover do site para bonificação."
          disabled={loading}
        />
      )
    );
  };

  const BonusDeposit = () => {
    const isPromotionActive = useMemo(() => {
      const promoActives: PromoProps[] = [];
      promotions.general_promotions?.forEach((element) => {
        const isRangeValue =
          (element.min_deposit_value || 0) <= value && value <= (element.max_deposit_value || 0);

        if (element.type === "JACKPOT" && value >= 50) {
          promoActives.push(element);
        } else if (
          element.type === "CORRECT_SCORE" &&
          element.sports_to_select_qty === 3 &&
          isRangeValue
        ) {
          promoActives.push(element);
        } else if (
          element.type === "CORRECT_SCORE" &&
          element.sports_to_select_qty === 2 &&
          isRangeValue
        ) {
          promoActives.push(element);
        } else if (element.type === "FREE_ROUNDS" && isRangeValue) {
          promoActives.push(element);
        }
      });

      return promoActives;
    }, [value, promotions.general_promotions]);

    const calculatePrize = (promotion: PromoProps) => {
      if (promotion.type === "CORRECT_SCORE") {
        if (promotion.sports_to_select_qty === 2) {
          return `${promotion.max_tickets} Placar Exato de ${promotion.sports_to_select_qty} Jogos`;
        }
        if (promotion.sports_to_select_qty === 3) {
          return `${Math.floor(value / 50)} Placar(es) Exato(s) de ${promotion.sports_to_select_qty} Jogos`;
        }
      }
      if (promotion.type === "JACKPOT") {
        return `${Math.floor(value / 50)} bolão(ões) de ${promotion.sports_to_select_qty} Jogos`;
      }
      if (promotion.type === "FREE_ROUNDS") {
        return `1 Rodada Grátis de ${promotion.free_rounds_qtt} Giros no ILotery`;
      }
      return "";
    };

    const handleChoosePromo = (id: string) => {
      setPromoChoose(id);
      handleData((prev) => ({ ...prev, general_promotion: id }));
    };

    return (
      <>
        {isPromotionActive.length > 1 && (
          <Promo>
            <Text font="label/button/m/regular" color="text.dynamic.whiteDynamic.80">
              Escolha uma promoção
            </Text>
            {isPromotionActive.map((promotion) => (
              <Radio
                key={`promo-${promotion._id}`}
                check={promoChoose === promotion._id}
                value={promotion._id}
                handleCheck={({ target }) => handleChoosePromo(target.value)}
                title={calculatePrize(promotion)}
              />
            ))}
          </Promo>
        )}

        {isPromotionActive.length === 1 && (
          <p>Parabéns, você irá receber {calculatePrize(isPromotionActive[0])}</p>
        )}
      </>
    );
  };

  useEffect(() => {
    (async () => {
      const response = await verifyPromotionsAvailable();
      setPromotions(response);
    })();
  }, []);

  return (
    <Section>
      {codeError && <MessageError code={codeError} />}

      <Field>
        <Text htmlTag="small" font="paragraph/l/regular" color="text.dynamic.whiteDynamic.80">
          Digite a quantia desejada
        </Text>
        <Money>
          <Country>
            <Image src={Brazil} alt="country" width={24} height={24} />
          </Country>
          <Amount isValue={!isDisabledDisplay}>
            <Prize>
              <Input
                name="value"
                value={valueDisplay}
                handleValue={changeValue}
                height="auto"
                padding="0px"
                background="transparent"
                disabled={loading}
                autoFocus
                border={0}
              />
            </Prize>
            <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
              Quantia
            </Text>
          </Amount>
        </Money>
      </Field>

      {promotions.welcome_bonus_available ? <BonusWelcome /> : <BonusDeposit />}

      <BoxButton>
        <Button.Root type="button" onClick={() => handlePage(0)} disabled={loading}>
          Voltar
        </Button.Root>
        <Button.Root
          type="submit"
          onClick={onSubmit}
          w="full"
          bg="brand.primary.100"
          orientation="h"
          justifycontent="center"
          disabled={isDisabledDisplay || loading}
        >
          <Button.Text font="label/button/m/bold" color="text.absolute.whiteAbsolute.100">
            {loading ? "Carregando..." : "Continuar"}
          </Button.Text>
          <Button.Icon icon={GoChevronRight} size={14} color="text.absolute.whiteAbsolute.100" />
        </Button.Root>
      </BoxButton>
    </Section>
  );
}

interface StepProps {
  handlePage: Dispatch<SetStateAction<number>>;
  handleSubmit: () => Promise<any>;
  handleData: Dispatch<SetStateAction<DepositProps>>;
}

interface PromoProps {
  _id: string;
  prize_amount: number;
  sports_to_select_qty: number;
  type: string;
  validation: string;
  max_deposit_value?: number;
  min_deposit_value?: number;
  max_tickets?: number;
  free_rounds_qtt?: number;
}
