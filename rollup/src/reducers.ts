import { Transitions, STF } from "@stackr/sdk/machine";
import { Radar, BetterMerkleTree as StateWrapper } from "./state";

// --------- Utilities ---------
const findIndexOfMintedToken = (state: StateWrapper, tokenMinted: string) => {
  return state.leaves.findIndex((leaf) => leaf.tokenMinted === tokenMinted);
};

type tokenInputs = {
  token: string;
  criteriaCount: number;
  isSpam: boolean;
};

// --------- State Transition Handlers ---------

const mintHandler: STF<Radar> = {
  handler: ({ inputs, state }) => {
    const { address, tokenMinted, amountOfToken } = inputs;
    const index = findIndexOfMintedToken(state, tokenMinted);
    if (state.leaves.find((leaf) => leaf.tokenMinted === tokenMinted)) {
      state.leaves[index].TotalAmountToken += amountOfToken;
      state.leaves[index].Transactions.push({
        address: address,
        amountOfToken: amountOfToken,
      });
    } else {
      state.leaves.push({
        tokenMinted: tokenMinted,
        TotalAmountToken: amountOfToken,
        Transactions: [
          {
            address: address,
            amountOfToken: amountOfToken,
          },
        ],
      });
    }
    return state;
  },
};

const tokenHandler: STF<Radar> = {
  handler: ({ inputs, state }) => {
    const { token, criteriaCount, isSpam } = inputs;
    if(isSpam === true){
      return state;
    }
    state.tokens.push({
      token: token,
      criteriaCount: criteriaCount,
      isSpam: isSpam,
    });
    state.tokens.sort((a, b) => a.criteriaCount - b.criteriaCount);
    return state;
  },
};

export const transitions: Transitions<Radar> = {
  mint: mintHandler,
  token: tokenHandler,
};
