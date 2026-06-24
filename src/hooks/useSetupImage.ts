import { Advertisement } from "@/interfaces/advertisement";
import _ from "lodash";

export function useSetupImage() {
  async function setup() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/config", {
        method: "GET",
        next: {
          revalidate: 60,
          tags: ["config"],
        },
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return { error: { status: 500, message: error.message } };
    }
  }

  async function getAdvertisements() {
    const response = await setup();
    const ads = _.sortBy(_.filter(response.advertisements, { type: "CASINO_TOP" }), ["position"]);

    return ads as Advertisement[];
  }

  return { getAdvertisements };
}
