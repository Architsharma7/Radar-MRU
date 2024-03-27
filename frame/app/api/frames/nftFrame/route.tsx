/* eslint-disable react/jsx-key */
import { kv } from "@vercel/kv";
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  if (ctx.message) {
    const input = ctx.message.inputText;
    console.log(input);

    return {
      image: (
        // <div tw="flex">
        //   <h4 tw=" text-2xl font-semibold text-black mb-6">Radar</h4>
        // </div>
        "https://pbs.twimg.com/profile_images/1732439974497394688/ezW7LwKq_400x400.jpg"
      ),
      buttons: [
        <Button
          action="post"
          target={`https://e594-110-235-234-38.ngrok-free.app/api/frames/getTrendingMints`}
          key={"9"}
        >
          Change my choice
        </Button>,
        <Button
          action="tx"
          target={`https://e594-110-235-234-38.ngrok-free.app/api/tx`}
          post_url={`https://e594-110-235-234-38.ngrok-free.app/api/txConfirmation`}
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