import { fetcher } from "@/hooks/useMiddleware";
import { MessagesProps, MessagesTypes } from "@/interfaces/messages";
// https://nextjs.org/docs/app/building-your-application/caching#router-cache

const urlRoute = "/client-notification";

const notifications = async (status?: MessagesTypes) => {
  let query = `${urlRoute}/messages`;

  if (status) {
    query += `?status=${status}`;
  }

  const response = await fetcher({
    url: query,
    method: "GET",
    next: {
      revalidate: 1,
    },
  });

  return response as MessagesProps[];
};

const openMessage = async (id: string) => {
  const response = await fetcher({
    url: `${urlRoute}/messages/${id}`,
    method: "GET",
  });

  return response;
};

export { notifications, openMessage };
