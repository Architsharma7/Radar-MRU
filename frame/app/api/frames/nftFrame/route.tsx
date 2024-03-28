/* eslint-disable react/jsx-key */
import { createFrames, Button, types } from "frames.js/next";
import { createMintActions } from "@/app/utils/rollup";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  const data = { address: "0x69697DdF8dB1cDbfA87Ad91D6E603aDb01493006", tokenMinted: "0xCa8c625f544A47c5FDa494Ef6e82D9BE860f860d", amountOfToken: 1 };
  if (data) {
    await createMintActions(data);
    console.log("Minted token added stored");
  }

  if (ctx.message) {
    const input = ctx.message.inputText;
    console.log(input);

    return {
      image:
        // <div tw="flex">
        //   <h4 tw=" text-2xl font-semibold text-black mb-6">Radar</h4>
        // </div>
        "https://pbs.twimg.com/profile_images/1732439974497394688/ezW7LwKq_400x400.jpg",
      buttons: [
        <Button
          action="post"
          target={`https://0bbc-110-235-234-28.ngrok-free.app/api/frames/getTrendingMints`}
          key={"9"}
        >
          Change my choice
        </Button>,
        <Button
          action="tx"
          target={`https://0bbc-110-235-234-28.ngrok-free.app/api/tx`}
          post_url={`https://0bbc-110-235-234-28.ngrok-free.app/api/txConfirmation`}
          key={"9"}
        >
          Mint NFT
        </Button>,
      ],
    };
  } else {
    return {
      image: (
        <div tw="flex">
          <h4 tw=" text-2xl font-semibold text-black mb-6">Radar</h4>
        </div>
      ),
    };
  }
});

export const POST = handleRequest;
