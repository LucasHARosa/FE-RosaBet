import { fetcher } from "@/hooks/useMiddleware";
import { ChangePassword, ReportIncomeI } from "@/interfaces/client";

const urlRoute = "/client";

const reportIncome = async (year: number) => {
  const response = await fetcher({
    url: `${urlRoute}/betting-income?year=${year}`,
    method: "GET",
    cache: "no-store",
  });

  return response as ReportIncomeI;
};

const active2FA = async (password: string) => {
  const response = await fetcher({
    url: `${urlRoute}/activate-2fa`,
    method: "PUT",
    data: {
      two_factor_auth: {
        enable: true,
      },
      password,
    },
  });

  return response;
};

const disable2FA = async (password: string) => {
  const response = await fetcher({
    url: `${urlRoute}/deactivate-2fa`,
    method: "PUT",
    data: {
      two_factor_auth: {
        enable: false,
      },
      password,
    },
  });

  return response;
};

const handlePassword = async (data: ChangePassword) => {
  const response = await fetcher({
    url: `${urlRoute}/password`,
    method: "PUT",
    data,
  });

  return response;
};

const deleteNotification = async (id: string) => {
  const response = await fetcher({
    url: `/client-notification/messages/${id}`,
    method: "DELETE",
  });

  return response;
};

export { reportIncome, active2FA, disable2FA, handlePassword, deleteNotification };
