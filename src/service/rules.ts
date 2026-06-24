import { fetcher } from "@/hooks/useMiddleware";
import { RulesDetailI, RulesI } from "../interfaces/rules";

const rules = async () => {
  const response = await fetcher({
    url: "/rules/list",
    method: "GET",
    cache: "no-store",
  });

  return response as RulesI[];
};

const viewRule = async (id: string) => {
  const response = await fetcher({
    url: `/rules/${id}`,
    method: "GET",
    cache: "no-store",
  });

  return response as RulesDetailI;
};

export { rules, viewRule };
