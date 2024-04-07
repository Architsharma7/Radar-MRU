import express, { Request, Response } from "express";
import { ActionEvents } from "@stackr/sdk";
import { Playground } from "@stackr/sdk/plugins";
import { schemas } from "./actions.ts";
import { RadarMachine, mru } from "./erc20.ts";
import { transitions } from "./reducers.ts";

console.log("Starting server...");

const radarMachine = mru.stateMachines.get<RadarMachine>("radar");

const app = express();
app.use(express.json());

const playground = Playground.init(mru);

playground.addGetMethod(
  "/custom/hello",
  async (_req: Request, res: Response) => {
    res.send("Hello World");
  }
);

const { actions, chain, events } = mru;

app.get("/actions/:hash", async (req: Request, res: Response) => {
  const { hash } = req.params;
  const action = await actions.getByHash(hash);
  if (!action) {
    return res.status(404).send({ message: "Action not found" });
  }
  return res.send(action);
});

app.get("/blocks/:hash", async (req: Request, res: Response) => {
  const { hash } = req.params;
  const block = await chain.getBlockByHash(hash);
  if (!block) {
    return res.status(404).send({ message: "Block not found" });
  }
  return res.send(block.data);
});

type ActionName = keyof typeof schemas;

app.get("/getEIP712Types/:action", (_req: Request, res: Response) => {
  //@ts-ignore
  const { action }: { action: ActionName } = _req.params;
  const eip712Types = schemas[action].EIP712TypedData.types;
  return res.send({ eip712Types });
});

app.post("/:actionName", async (req: Request, res: Response) => {
  const { actionName } = req.params;
  const actionReducer = transitions[actionName];

  if (!actionReducer) {
    res.status(400).send({ message: "no reducer for action" });
    return;
  }
  const action = actionName as keyof typeof schemas;

  const { msgSender, signature, inputs } = req.body as {
    msgSender: string;
    signature: string;
    inputs: any;
  };

  const schema = schemas[action];

  try {
    const newAction = schema.actionFrom({ msgSender, signature, inputs });
    const ack = await mru.submitAction(actionName, newAction);
    res.status(201).send({ ack });
    console.log(msgSender, signature, inputs);
    console.log(schema);
  } catch (e: any) {
    res.status(400).send({ error: e.message });
  }
  return;
});

events.subscribe(ActionEvents.SUBMIT, (args) => {
  console.log("Submitted an action", args);
});

events.subscribe(ActionEvents.EXECUTION_STATUS, async (action) => {
  console.log("Submitted an action", action);
});

app.get("/", (_req: Request, res: Response) => {
  return res.send({ state: radarMachine?.state });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
