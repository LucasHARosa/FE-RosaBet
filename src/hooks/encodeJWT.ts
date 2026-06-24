import { UserI } from "@/interfaces/user";
import signJWT from "jwt-encode";

export const zendeskJWT = (user: UserI) => {
  return signJWT({
    "external_id": user._id,
    "email": user.email,
    "email_verified": (user.email_confirmation && user.email_confirmation.is_confirmed) || false,
    "name": user.username,
    "scope": "user"
  },
    process.env.NEXT_PUBLIC_JWT_SECRET_ZENDESK || '',
    { alg: 'HS256', typ: 'JWT', kid: 'app_66b4eedb97491feffd2576c5' }
  );
}