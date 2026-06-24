import { Promotion } from "@/interfaces/promotion";
import Loading from "./loading";
import _ from "lodash";
import CardPromotions from "../cardPromotions";

export default function ListPromotions({
  promotions,
  selectPromotion,
  handleSelectPromotion,
  loading,
}: ListPromotionsProps) {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {_.filter(promotions, "active").map((promotion) => (
            <CardPromotions
              key={promotion._id}
              promotion={promotion}
              handleSelectPromotion={handleSelectPromotion}
              select={selectPromotion === promotion}
            />
          ))}
        </>
      )}
    </>
  );
}

interface ListPromotionsProps {
  promotions: Promotion[];
  selectPromotion: Promotion | undefined;
  handleSelectPromotion: (type: string) => void;
  loading: boolean;
}
