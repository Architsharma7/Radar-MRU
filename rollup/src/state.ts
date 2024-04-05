import { State } from "@stackr/sdk/machine";
import { BytesLike, ZeroHash, solidityPackedKeccak256 } from "ethers";
import { MerkleTree } from "merkletreejs";

export type Leaves = {
  tokenMinted: string;
  TotalAmountToken: number;
  Transactions: {
    address: string;
    amountOfToken: number;
  }[];
}[];

export class BetterMerkleTree {
  public merkleTree: MerkleTree;
  public leaves: Leaves;

  constructor(leaves: Leaves) {
    this.merkleTree = this.createTree(leaves);
    this.leaves = leaves;
  }

  createTree(leaves: Leaves) {
    const hashedLeaves = leaves.map((leaf) => {
      const hashedTransactions = leaf.Transactions.map((leaf) => {
        return solidityPackedKeccak256(
          ["address", "uint"],
          [leaf.address, leaf.amountOfToken]
        );
      });
      const transactionTree = new MerkleTree(
        hashedTransactions,
        solidityPackedKeccak256
      );
      const txTreeRoot = transactionTree.getHexRoot();
      console.log("txroot", txTreeRoot);
      return solidityPackedKeccak256(
        ["address", "uint", "bytes"],
        [leaf.tokenMinted, leaf.TotalAmountToken, txTreeRoot]
      );
    });
    return new MerkleTree(hashedLeaves, solidityPackedKeccak256);
  }
}

export class Radar extends State<Leaves, BetterMerkleTree> {
  constructor(state: Leaves) {
    super(state);
  }

  transformer() {
    return {
      wrap: () => {
        const newTree = new BetterMerkleTree(this.state);
        return newTree;
      },
      unwrap: (wrappedState: BetterMerkleTree) => {
        return wrappedState.leaves;
      },
    };
  }

  getRootHash(): BytesLike {
    if (this.state.length === 0) {
      return ZeroHash;
    }
    return this.transformer().wrap().merkleTree.getHexRoot();
  }
}
