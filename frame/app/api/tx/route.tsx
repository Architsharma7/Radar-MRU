import { STORAGE_REGISTRY_ADDRESS } from "@farcaster/core";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData } from "viem";
import { sepolia, baseSepolia } from "viem/chains";
import { ABI, Tokenaddress } from "../../constants";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";

export async function getResponse(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const useraddress = searchParams.get('address') || '';
  const tokenMinted = searchParams.get('tokenMinted') || '';
  const amountOfToken = searchParams.get('amountOfToken') || '';

  if (! useraddress || ! tokenMinted || ! amountOfToken) {
    throw new Error("search params not transfered to tx route");
  }

  const address = "0x69697DdF8dB1cDbfA87Ad91D6E603aDb01493006";
  const amount = BigInt(1);
  const tokenaddress = Tokenaddress;

  const data = encodeFunctionData({
    abi: ABI,
    functionName: "mint",
    args: [address, amount],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: ABI,
      data: data,
      to: Tokenaddress,
      value: "0",
    },
  };
  console.log(data);
  console.log(txData);
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
