import { Routes } from "$live/flags/audience.ts";
import type { App, FnContext } from "$live/mod.ts";
import { asResolved } from "$live/mod.ts";
import manifest, { Manifest, name } from "./manifest.gen.ts";

export interface State {
  /**
   * @title Site Map
   */
  routes: Routes[];
}

/**
 * @title Site
 */
export default function App(
  state: State,
): App<Manifest, State> {
  return {
    name,
    state,
    manifest,
    resolvables: {
      "./routes/[...catchall].tsx": {
        __resolveType: "site/handlers/router.ts",
      },
    },
  };
}

const deferPropsResolve = (
  routes: Routes,
): Routes => {
  if (Array.isArray(routes)) {
    const newRoutes = [];
    for (const route of routes) {
      newRoutes.push({
        ...route,
        handler: {
          value: asResolved(route.handler.value, true),
        },
      });
    }
    return newRoutes;
  }
  return routes;
};

export const onBeforeResolveProps = <T extends { routes?: Routes[] }>(
  props: T,
): T => {
  if (Array.isArray(props?.routes)) {
    const newRoutes: T = {
      ...props,
      routes: props.routes.map(deferPropsResolve),
    };
    return newRoutes;
  }
  return props;
};

export type AppContext = FnContext<State, Manifest>;

// await devApp()
// await runApp("fashion")
// tudo começa com dados e apps. inicialmente so começa com apps
// o admin vai la e configura uma app e da um nome
// uma app "serializada" é uma lista de resolvers, um schema pra configurar eles (baseado no manifest) e o proprio manifest
// qualquer request (no middleware) faz um ctx.resolve("appName") e isso retorna {resolvers, schema, manifest, resolvables}
// depois faz um ctx.with({resolvers, resolvables})
// ctx.state.manifest = manifest;
// ctx.state.schema = schema;
// deno task gen => gen local manifest only (dev purposes)
