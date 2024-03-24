import { init, fetchQuery } from "@airstack/node";
import {
  getFarcasterUserNFTMints,
  FarcasterUserNFTMintsInput,
  FarcasterUserNFTMintsOutput,
  TokenBlockchain,
  NFTType,
} from "@airstack/frames";

const getNFTMints = async () => {
    init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY as string);

  const input: FarcasterUserNFTMintsInput = {
    fid: 5650,
    chains: [TokenBlockchain.Base],
    tokenType: [NFTType.ERC721],
    limit: 10,
  };
  const {
    data,
    error,
    hasNextPage,
    hasPrevPage,
    getNextPage,
    getPrevPage,
  }: FarcasterUserNFTMintsOutput = await getFarcasterUserNFTMints(input);

  if (error) throw new Error(error);

  console.log(data);
};

async function fetchData(address: string) {
  const queryParameters = new URLSearchParams({
    k: "2",
    limit: "3",
  });

  const response = await fetch(
    `https://graph.cast.k3l.io/graph/neighbors/engagement/addresses?${queryParameters}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([address]),
    }
  );

  const data = await response.json();
  console.log(data);
  return data;
}

getNFTMints();
