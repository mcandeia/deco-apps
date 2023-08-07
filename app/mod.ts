import { buildApp } from "$live/blocks/app.ts";
import { Routes } from "$live/flags/audience.ts";
import { RedirectConfig } from "$live/handlers/redirect.ts";
import { context } from "$live/live.ts";
import { Apps } from "$live/mod.ts";
import { mergeRuntimes } from "$live/blocks/app.ts";
import type { AppRuntime, FnContext } from "../deps.ts";
import manifest, { Manifest, name } from "./manifest.gen.ts";
export { name };

/**
 * @title {{{from}}} -> {{{to}}}
 */
export interface Redirect extends RedirectConfig {
  from: string;
}

export interface State {
  apps: Apps[];
  routes: Routes[];
  redirects: Redirect[];
}

export default function App(
  state: State,
): AppRuntime {
  const { apps } = state;
  const runtime = buildApp({ manifest, state });
  const currentAppRuntime: AppRuntime = {
    resolvers: context.releaseResolver!.getResolvers(),
    manifest: context.manifest!,
  };
  return [...apps, runtime].reduce(mergeRuntimes, currentAppRuntime);
}

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
