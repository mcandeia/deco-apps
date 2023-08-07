import { Route } from "$live/flags/audience.ts";
import {
  default as router,
  SelectionConfig,
} from "$live/handlers/routesSelection.ts";
import { AppContext, Redirect } from "../mod.ts";
export type { SelectionConfig };

const redirectToRoute = ({ from, to, type }: Redirect): Route => {
  return {
    pathTemplate: from,
    handler: {
      value: {
        to,
        type,
        __resolveType: "deco/handlers/redirect.ts",
      },
    },
    isHref: true,
  };
};
export default function Router(
  { audiences }: SelectionConfig,
  ctx: AppContext,
) {
  const routes = [
    ...(Array.isArray(audiences) ? audiences : []),
    ...ctx.routes,
    ctx.redirects.map(redirectToRoute),
  ];
  return router({ audiences: routes }, ctx);
}
