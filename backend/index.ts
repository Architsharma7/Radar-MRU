import { Wallet } from "ethers";
import { TrendingMint } from "./constants";

const domain = {
  name: "Stackr MVP v0",
  version: "1",
  chainId: 16,
  verifyingContract: "0xE54a0e018Fe5DA8746ECb49f44227E839B3e597d",
  salt: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
};

type tokenDataType = {
  token: string;
  criteriaCount: number;
  isSpam: boolean;
};

export const tokenAction = async (tokenData: tokenDataType) => {
  const wallet = Wallet.createRandom();
  const actionName = "token";
  const date = new Date();

  const inputs = {
    timestamp: Math.round(date.getTime() / 1000),
    ...tokenData,
  };
  console.log(`Payload: ${JSON.stringify(inputs, null, 2)}`);

  const response = await fetch(
    `http://localhost:3001/getEIP712Types/${actionName}`
  );

  const eip712Types = (await response.json()).eip712Types;
  console.log("eiptypes", eip712Types);
  const signature = await wallet.signTypedData(domain, eip712Types, inputs);
  console.log(`Signature: ${signature}`);
  const body = JSON.stringify({
    msgSender: wallet.address,
    signature,
    inputs,
  });

  const res = await fetch(`http://localhost:3001/${actionName}`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();
  console.log(`Response: ${JSON.stringify(json, null, 2)}`);
};

const main = async () => {
  TrendingMint.forEach(async (token) => {
    await tokenAction({
      token: token.address,
      criteriaCount: token.criteriaCount,
      isSpam: token.isSpam,
    });
  });
};

main();
