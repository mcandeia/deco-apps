import { Apps } from "$live/mod.ts";
import { MiddlewareConfig } from "$live/routes/_middleware.ts";

export interface Props {
  apps?: Apps[];
}

/**
 * @title Shared application State Loader.
 * @description Set the application state using resolvables.
 */
export default function StateLoader(
  { apps }: Props,
): MiddlewareConfig {
  return {
    state: {},
    apps,
  };
}
