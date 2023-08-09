import { badRequest } from "$live/engine/errors.ts";
import { context } from "$live/live.ts";
import { ActionContext } from "$live/types.ts";
import { allowCorsFor } from "$live/utils/http.ts";
import { encryptToHex } from "../../commons.ts";

export interface Props {
  value: string;
}

export interface SignedMessage {
  value: string;
}

export default async function Encrypt(
  { value }: Props,
  req: Request,
  ctx: ActionContext,
): Promise<SignedMessage> {
  if (!context.isDeploy) {
    badRequest({
      message: "could not update secrets in development mode",
      code: "SECRET_ON_DEV_MODE_NOT_ALLOWED",
    });
  }
  try {
    Object.entries(allowCorsFor(req)).map(([name, value]) => {
      ctx.response.headers.set(name, value);
    });
    return { value: await encryptToHex(value) };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
