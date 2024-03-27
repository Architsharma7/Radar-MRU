import { MicroRollup } from "@stackr/sdk";
import { stackrConfig } from "../stackr.config.ts";

import { mintSchema, schemas } from "./actions.ts";
import { RadarStateMachine } from "./machines.stackr.ts";

type RadarMachine = typeof RadarStateMachine;

const mru = await MicroRollup({
  config: stackrConfig,
  actions: [mintSchema, ...Object.values(schemas)],
  isSandbox: true,
});

mru.stateMachines.add(RadarStateMachine);

await mru.init();

export { RadarMachine, mru };
