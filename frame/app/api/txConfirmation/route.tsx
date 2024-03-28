import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

export async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  console.log(body);
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
