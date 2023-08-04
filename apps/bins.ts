import { AppContext as AC, App, AppManifest } from "../deps.ts";
import * as binLoader from "../loaders/bin.ts";
export interface BinProps {
  url: string;
}

const manifest = {
  loaders: {
    "http://denopkg.com/mcandeia/deco-apps/loaders/bin.ts": binLoader,
  },
} satisfies AppManifest;

export default function BinApp(
  props: BinProps,
): App<typeof manifest, BinProps> {
  return {
    manifest,
    state: props,
  };
}

export type AppContext = AC<ReturnType<typeof BinApp>>;
