import { StateMachine } from "@stackr/sdk/machine";
import genesisState from "../genesis-state.json";
import { transitions } from "./reducers";
import { Radar } from "./state";

const STATE_MACHINES = {
  Radar: "radar",
};

const RadarStateMachine = new StateMachine({
  id: STATE_MACHINES.Radar,
  stateClass: Radar,
  on: transitions,
  initialState: genesisState.state,
});

export { STATE_MACHINES, RadarStateMachine };
