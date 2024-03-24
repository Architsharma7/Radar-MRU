import { init, fetchQuery } from "@airstack/node";

const getTrendingMintsOnFarcaster = async () => {
  init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY as string);

  const query = `query {
    TrendingMints(
      input: {timeFrame: seven_days, audience: farcaster, blockchain: base, criteria: unique_wallets}
    ) {
      TrendingMint {
        address
        erc1155TokenID
        criteriaCount
        timeFrom
        timeTo
        token {
          baseURI
          isSpam
          name
          type
          tokenNfts {
            token {
              tokenNfts {
                id
              }
            }
            metaData {
              image
            }
          }
        }
      }
    }
  }`;

  const { data, error } = await fetchQuery(query);
  if (error) {
    console.error(error);
  }
  return data?.TrendingMints?.TrendingMint;
};

async function processTrendingMints(data: any[]) {
  const result: any[] = [];
  for (const mint of data) {
    if (
      mint.token.type === "ERC721" &&
      !mint.token.isSpam &&
      mint.token.tokenNfts.length > 0 &&
      mint.token.tokenNfts[0].metaData?.image?.startsWith("ipfs://")
    ) {
      result.push(mint);
    }
  }
  return result;
}

async function sortAndFilterTrendingMints(data: any[]) {
  const sortedData = data.sort((a, b) => b.criteriaCount - a.criteriaCount);
  const top3 = sortedData.slice(0, 3);
  return top3;
}

async function extractImageFromTokenNfts(data: any[]) {
  const updatedData = data.map((item) => {
    if (item.token && item.token.tokenNfts && item.token.tokenNfts.length > 0) {
      const image = item.token.tokenNfts[0].metaData?.image || "";
      return { ...item, image };
    }
    return item;
  });
  return updatedData;
}

async function fetchDataAndProcess() {
  const trendingMintsData = await getTrendingMintsOnFarcaster();
  const unsortedData = await processTrendingMints(trendingMintsData);
  const sortedData = await sortAndFilterTrendingMints(unsortedData);
  const data = await extractImageFromTokenNfts(sortedData);
  console.log(data);
}

fetchDataAndProcess();
