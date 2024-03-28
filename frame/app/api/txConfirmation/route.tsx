import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { createMintActions } from "@/app/utils/rollup";

export async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  console.log(body);
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const useraddress = searchParams.get('address') || '';
  const tokenMinted = searchParams.get('tokenMinted') || '';
  const amountOfTokenStr = searchParams.get('amountOfToken') || '';
  const amountOfToken = parseFloat(amountOfTokenStr);

  if (! useraddress || ! tokenMinted || ! amountOfToken) {
    throw new Error("search params not transfered to tx route");
  }

  if (useraddress && tokenMinted && amountOfToken) {
    await createMintActions({ address: useraddress, tokenMinted:tokenMinted, amountOfToken:amountOfToken});
    console.log("Minted token added stored");
  }


  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Transaction`,
          action: "link",
          target: `https://sepolia.basescan.org/tx/${body.untrustedData.transactionId}`,
        },
      ],
      image: {
        src: `https://gateway.lighthouse.storage/ipfs/QmTyUxFsKXNwLfgGc5MLXXzcMGszDEKrCSGqNbC4HzNQqe`,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
