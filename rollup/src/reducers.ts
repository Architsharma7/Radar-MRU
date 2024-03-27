import { Reducers, STF } from "@stackr/sdk/machine";
import { Radar, BetterMerkleTree as StateWrapper } from "./state";

// --------- Utilities ---------
const findIndexOfMintedToken = (state: StateWrapper, tokenMinted: string) => {
  return state.leaves.findIndex((leaf) => leaf.tokenMinted === tokenMinted);
};

// --------- State Transition Handlers ---------
// const createHandler: STF<Radar> = {
//   handler: ({ inputs, state }) => {
//     const { address, tokenMinted } = inputs;
//     if (state.leaves.find((leaf) => leaf.tokenMinted === tokenMinted)) {
//       throw new Error("Account already exists in directory");
//     }
//     state.leaves.push({
//       address,
//       tokenMinted: [],
//       amountOfToken: 0,
//     });
//     return state;
//   },
// };

const mintHandler: STF<Radar> = {
  handler: ({ inputs, state }) => {
    const { address, tokenMinted, amountOfToken } = inputs;
    const index = findIndexOfMintedToken(state, tokenMinted);
    if (state.leaves.find((leaf) => leaf.tokenMinted === tokenMinted)) {
      state.leaves[index].tokenData.TotalAmountToken += amountOfToken;
      state.leaves[index].tokenData.Transactions.push({
        address: address,
        amountOfToken: amountOfToken
      })
    } else {
      state.leaves.push({
        tokenMinted: tokenMinted,
        tokenData: {
          TotalAmountToken: amountOfToken,
          Transactions: [{
            address: address,
            amountOfToken: amountOfToken
          }]
        },
      });
    }
    return state;
  },
};

// const burnHandler: STF<ERC20> = {
//   handler: ({ inputs, state, msgSender }) => {
//     const { from, amount } = inputs;

//     const index = findIndexOfAccount(state, from);

//     if (state.leaves[index].address !== msgSender) {
//       throw new Error("Unauthorized");
//     }
//     state.leaves[index].balance -= amount;
//     return state;
//   },
// };

// const transferHandler: STF<ERC20> = {
//   handler: ({ inputs, state, msgSender }) => {
//     const { to, from, amount } = inputs;

//     const fromIndex = findIndexOfAccount(state, from);
//     const toIndex = findIndexOfAccount(state, to);

//     // check if the sender is the owner of the account
//     if (state.leaves[fromIndex]?.address !== msgSender) {
//       throw new Error("Unauthorized");
//     }

//     // check if the sender has enough balance
//     if (state.leaves[fromIndex]?.balance < inputs.amount) {
//       throw new Error("Insufficient funds");
//     }

//     // check if to account exists
//     if (!state.leaves[toIndex]) {
//       throw new Error("Account does not exist");
//     }

//     state.leaves[fromIndex].balance -= amount;
//     state.leaves[toIndex].balance += amount;
//     return state;
//   },
// };

// const approveHandler: STF<ERC20> = {
//   handler: ({ inputs, state, msgSender }) => {
//     const { from, to, amount } = inputs;

//     const index = findIndexOfAccount(state, from);
//     if (state.leaves[index].address !== msgSender) {
//       throw new Error("Unauthorized");
//     }

//     state.leaves[index].allowances.push({ address: to, amount });
//     return state;
//   },
// };

// const transferFromHandler: STF<ERC20> = {
//   handler: ({ inputs, state, msgSender }) => {
//     const { to, from, amount } = inputs;

//     // check if the msgSender has enough allowance from the owner
//     const toIndex = findIndexOfAccount(state, to);
//     const fromIndex = findIndexOfAccount(state, from);

//     const allowance = state.leaves[fromIndex].allowances.find(
//       (allowance) => allowance.address === msgSender
//     );
//     if (!allowance || allowance.amount < inputs.amount) {
//       throw new Error("Insufficient allowance");
//     }

//     // check if the sender has enough balance
//     if (state.leaves[fromIndex].balance < inputs.amount) {
//       throw new Error("Insufficient funds");
//     }

//     state.leaves[fromIndex].balance -= amount;
//     state.leaves[toIndex].balance += amount;
//     state.leaves[fromIndex].allowances = state.leaves[fromIndex].allowances.map(
//       (allowance) => {
//         if (allowance.address === msgSender) {
//           allowance.amount -= amount;
//         }
//         return allowance;
//       }
//     );
//     return state;
//   },
// };

export const reducers: Reducers<Radar> = {
  // create: createHandler,
  mint: mintHandler,
  // burn: burnHandler,
  // transfer: transferHandler,
  // approve: approveHandler,
  // transferFrom: transferFromHandler,
};
