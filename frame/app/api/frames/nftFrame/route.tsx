/* eslint-disable react/jsx-key */
import { createFrames, Button, types } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  const data = {
    address: "0x69697DdF8dB1cDbfA87Ad91D6E603aDb01493006",
    tokenMinted: "0xCa8c625f544A47c5FDa494Ef6e82D9BE860f860d",
    amountOfToken: 1,
  };

  if (ctx.message) {
    const input = ctx.message.inputText;
    console.log(input);

    return {
      image: (
        <div tw="flex h-full w-full items-center justify-center flex-col bg-[#f9f7f2] ">
          <div
            style={{ fontWeight: "700", fontSize: "22px" }}
            tw="flex p-3 rounded-xl w-44 justify-center"
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
              Mint NFT
            </div>
          </div>
          <div tw="flex mt-6 ">
            <div tw="flex flex-col items-center">
              <img
                src={
                  "https://images.ctfassets.net/ohcexbfyr6py/4oCGZKmzbQeYjfg2OtuPA7/c5ed5f9fd84e827e8b7a2b5423b95fb0/The_Ethereum_Merge__ETH_2.0__explained.png"
                }
                alt="nft"
                tw="h-44 w-44 shadow-2xl rounded-2xl border-white border-2 mx-3"
              />
            </div>
          </div>
        </div>
      ),
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
          target={`https://0bbc-110-235-234-28.ngrok-free.app/api/tx?tokenMinted=${encodeURIComponent(
            data.tokenMinted
          )}&address=${encodeURIComponent(
            data.address
          )}&amountOfToken=${encodeURIComponent(data.amountOfToken)}`}
          post_url={`https://0bbc-110-235-234-28.ngrok-free.app/api/txConfirmation?tokenMinted=${encodeURIComponent(
            data.tokenMinted
          )}&address=${encodeURIComponent(
            data.address
          )}&amountOfToken=${encodeURIComponent(data.amountOfToken)}`}
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
