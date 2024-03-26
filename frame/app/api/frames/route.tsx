/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  return {
    image: `https://gateway.lighthouse.storage/ipfs/QmTyUxFsKXNwLfgGc5MLXXzcMGszDEKrCSGqNbC4HzNQqe`,
    buttons: [
      <Button
        action="post"
        target={`${process.env.HOST}/api/frames/getTrendingMints`}
      >
        Get the Trending Mints →
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;