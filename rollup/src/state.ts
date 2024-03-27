import { State } from "@stackr/sdk/machine";
import { BytesLike, ZeroHash, solidityPackedKeccak256 } from "ethers";
import { MerkleTree } from "merkletreejs";

// export type Leaves = {
//   tokenMinted: string;
//   tokenData: {
//     amountOfToken: number;
//     address: string[];
//   };
// }[];

export type Leaves = {
  tokenMinted: string;
  tokenData: {
    TotalAmountToken: number;
    Transactions : {
      address: string;
      amountOfToken: number;
    }[];
  };
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
      return solidityPackedKeccak256(
        ["address"],
        [leaf.tokenMinted]
      );
    });
    return new MerkleTree(hashedLeaves);
  }
}

export class Radar extends State<Leaves, BetterMerkleTree> {
  constructor(state: Leaves) {
    super(state);
  }

  wrap(state: Leaves): BetterMerkleTree {
    const newTree = new BetterMerkleTree(state);
    return newTree;
  }

  clone(): State<Leaves, BetterMerkleTree> {
    return new Radar(this.unwrap());
  }

  unwrap(): Leaves {
    return this.wrappedState.leaves;
  }

  calculateRoot(): BytesLike {
    if (this.wrappedState.leaves.length === 0) {
      return ZeroHash;
    }
    return this.wrappedState.merkleTree.getHexRoot();
  }
}