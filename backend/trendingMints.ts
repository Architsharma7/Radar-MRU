import { init, fetchQuery } from "@airstack/node";
const http = require("http");

export const getTrendingMintsOnFarcaster = async () => {
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

export async function processTrendingMints(data: any[]) {
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

export async function sortAndFilterTrendingMints(data: any[]) {
  const sortedData = data.sort((a, b) => b.criteriaCount - a.criteriaCount);
  const top3 = sortedData.slice(0, 3);
  return top3;
}

export async function extractImageFromTokenNfts(data: any[]) {
  const updatedData = data.map((item) => {
    if (item.token && item.token.tokenNfts && item.token.tokenNfts.length > 0) {
      const image = item.token.tokenNfts[0].metaData?.image || "";
      return { ...item, image };
    }
    return item;
  });
  return updatedData;
}

export async function fetchDataAndProcess() {
  const trendingMintsData = await getTrendingMintsOnFarcaster();
  const unsortedData = await processTrendingMints(trendingMintsData);
  const sortedData = await sortAndFilterTrendingMints(unsortedData);
  const data = await extractImageFromTokenNfts(sortedData);
  console.log(data);
  return data;
}

function fetchABI(address: string) {
  const apiUrl = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;

  return new Promise((resolve, reject) => {
    const req = http.get(apiUrl, (res: any) => {
      let data = "";

      res.on("data", (chunk: any) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          if (response.status === "1") {
            const abi = JSON.parse(response.result);
            resolve(abi);
          } else {
            reject(new Error("Failed to fetch ABI"));
          }
        } catch (error) {
          reject(error);
        }
      });
    });
    req.on("error", (error: any) => {
      reject(error);
    });

    req.end();
  });
}

// async function updateTrendingMintsWithABI() {
//   const updatedMints = [];
//   const contractsArray = await fetchDataAndProcess();
//   for (const contract of contractsArray) {
//     try {
//       const abi = await fetchABI(contract.address);
//       const updatedContract = { ...contract, abi };
//       updatedMints.push(updatedContract);
//     } catch (error) {
//       console.error("Error fetching ABI:", error);
//     }
//   }
//   console.log(updatedMints);
//   return updatedMints;
// }
