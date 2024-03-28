import { Wallet } from "ethers";

const domain = {
  name: "Stackr MVP v0",
  version: "1",
  chainId: 16,
  verifyingContract: "0xE54a0e018Fe5DA8746ECb49f44227E839B3e597d",
  salt: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
};

type mintDataType = {
    address: string,
    tokenMinted: string,
    amountOfToken: number,
}

export const createMintActions = async(mintData:mintDataType) => {
  const wallet = Wallet.createRandom();
  const actionName = "mint";
  const date = new Date();

  const payload = {
    timestamp: Math.round(date.getTime() / 1000),
    ...mintData,
  };
  console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);

  const response = await fetch(
    `http://localhost:3001/getEIP712Types/${actionName}`
  );

  const eip712Types = (await response.json()).eip712Types;
  console.log("eiptypes",eip712Types);
  const signature = await wallet.signTypedData(
    domain,
    eip712Types,
    payload
  );
  console.log(`Signature: ${signature}`);
  const body = JSON.stringify({
    msgSender: wallet.address,
    signature,
    payload,
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
