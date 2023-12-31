import { HandlerContext } from "$fresh/server.ts";
import { Handler } from "$live/blocks/handler.ts";
import { Workflow, WorkflowContext } from "$live/blocks/workflow.ts";
import { workflowHTTPHandler } from "$live/deps.ts";
import type { Manifest } from "$live/live.gen.ts";
import { LiveConfig, LiveState } from "$live/mod.ts";
import { ConnInfo } from "std/http/server.ts";
export interface Config {
  workflow: Workflow;
}

export default function WorkflowHandler({ workflow }: Config): Handler {
  return (req: Request, conn: ConnInfo) => {
    const ctx = conn as HandlerContext<
      unknown,
      LiveConfig<unknown, LiveState, Manifest>
    >;
    if (ctx?.state) {
      const handler = workflowHTTPHandler(
        workflow,
        (exec) => new WorkflowContext(ctx.state, exec),
      );
      return handler(req, conn);
    }
    return new Response(null, { status: 501 });
  };
}
