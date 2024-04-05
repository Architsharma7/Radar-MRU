/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { framesjsMiddleware } from "frames.js/middleware";

const frames = createFrames();

const handleRequest = frames(async () => {
  return {
    image: (
      <div
        tw="flex h-full w-full items-center justify-center flex-col bg-[#f9f7f2] "
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        <div
          style={{ fontWeight: "700", fontSize: "220px" }}
          tw="flex p-3 rounded-xl  justify-center absolute opacity-90"
        >
          {" "}
          <div
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            RADAR
          </div>
        </div>
      </div>
    ),
    buttons: [
      <Button
        action="post"
        target={`https://0bbc-110-235-234-28.ngrok-free.app/api/frames/getTrendingMints`}
      >
        Get the Trending Mints →
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
