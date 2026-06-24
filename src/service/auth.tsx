import { fetcher } from "@/hooks/useMiddleware";
import { UserI, VerifyCPFI } from "@/interfaces/user";
// https://nextjs.org/docs/app/building-your-application/caching#router-cache

const urlRoute = "/auth";

const login = async (data: any) => {
  const response = await fetcher({
    url: `${urlRoute}/login`,
    method: "POST",
    cache: "no-store",
    data,
  });

  

  return response.user as UserI;
};

const me = async () => {
  const response = await fetcher({
    url: `/user/me`,
    method: "GET",
    cache: "no-store",
  });

  

  return response as UserI;
};

const updateMe = async (data: any) => {
  const response = await fetcher({
    url: `/client/me`,
    method: "PUT",
    cache: "no-store",
    data,
  });

  return response as UserI;
};

const verifyCPF = async (cpf: string) => {
  const response = await fetcher({
    url: `/client/signup/firststep`,
    method: "POST",
    cache: "no-store",
    data: {
      cpf,
      currency: "BRL",
      country: "BR",
      document: "",
      document_type: "",
      address: {
        country: "Brazil",
      },
    },
  });

  return response as VerifyCPFI;
};

const registerUser = async (data: any) => {
  const response = await fetcher({
    url: `/client`,
    method: "POST",
    cache: "no-store",
    data: {
      accept: true,
      address: {
        country: "Brazil",
      },
      associate: data.associate,
      campaign: data.campaign,
      birthDate: data.birthDate,
      birth_date: data.birthDate,
      username: data.username,
      password: data.password,
      confirmPassword: "",
      country: "BR",
      cpf: data.cpf,
      currency: "BRL",
      document: "",
      document_type: "",
      email: data.email,
      name: data.name,
      notification: {
        email: true,
        sms: true,
      },
      phone: "",
      phoneDDI: "",
      phoneForeign: "",
      scratchoff_code: "",
    },
  });

  return response.token as string;
};

const validCode = async (code: string) => {
  const response = await fetcher({
    url: `/client/check-email-confirmation-code`,
    method: "PUT",
    cache: "no-store",
    data: {
      code,
    },
  });

  return response;
};

const resendCode = async () => {
  const response = await fetcher({
    url: `/client/confirmation-email`,
    method: "PUT",
    cache: "no-store",
  });

  return response;
};

const handleEmailUser = async (email: string, email_confirmation: string) => {
  const response = await fetcher({
    url: `/client/update-email`,
    method: "PUT",
    cache: "no-store",
    data: {
      email,
      email_confirmation,
    },
  });

  return response;
};

const breakPeriod = async (data: any) => {
  await fetcher({
    url: "/client/break-period",
    method: "PUT",
    cache: "no-store",
    data,
  });
};

const exclusionAccount = async (data: any) => {
  await fetcher({
    url: "/client/self-exclusion",
    method: "PUT",
    cache: "no-store",
    data,
  });
};

const forgotPassword = async (data: any) => {
  const response = await fetcher({
    url: "/client/forgot_password",
    method: "POST",
    cache: "no-store",
    data,
  });
  return response;
};

const passwordReset = async (data: any) => {
  const response = await fetcher({
    url: "/client/password",
    method: "POST",
    cache: "no-store",
    data,
  });
  return response;
};

const checkStatusEmail = async () => {
  const response = await fetcher({
    url: "/client/status-email-confirmation",
    method: "GET",
    cache: "no-store",
  });

  return response;
};

export {
  handleEmailUser,
  login,
  me,
  registerUser,
  resendCode,
  validCode,
  verifyCPF,
  updateMe,
  breakPeriod,
  exclusionAccount,
  forgotPassword,
  passwordReset,
  checkStatusEmail,
};
