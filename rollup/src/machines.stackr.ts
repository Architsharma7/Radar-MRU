import { StateMachine } from "@stackr/sdk/machine";
import genesisState from "../genesis-state.json";
import { reducers } from "./reducers";
import { Radar } from "./state";

const STATE_MACHINES = {
  Radar: "radar",
};

const RadarStateMachine = new StateMachine({
  id: STATE_MACHINES.Radar,
  state: new Radar(genesisState.state),
  on: reducers,
});

export { STATE_MACHINES, RadarStateMachine };
