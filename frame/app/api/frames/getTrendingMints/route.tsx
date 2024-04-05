import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  // const response = await fetch(`${process.env.HOST}/api/findTrending`);
  // const data = await response.json();
  // console.log(data);

  const data = "hello";
  const arr = [1, 2, 3];

  if (!data) {
    fetch(`/api/findTrending`, {
      method: "POST",
    });

    return {
      image: (
        <div tw=" flex items-stretch  justify-between w-full h-full bg-[#ecf2ff]">
          <div tw="flex flex-col card-score items-center justify-center w-full">
            <h4 tw=" text-2xl font-semibold text-black mb-6">Radar</h4>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #4d21c9 0%, rgba(37, 33, 201, 0) 100%, rgba(37, 33, 201, 0) 100%)",
                border: "2px",
              }}
              tw=" flex items-center flex-col justify-center h-40 w-40 rounded-full text-black shadow-2xl	"
            >
              <img
                src="https://gateway.lighthouse.storage/ipfs/QmTyUxFsKXNwLfgGc5MLXXzcMGszDEKrCSGqNbC4HzNQqe"
                tw="rounded-full"
                alt="refreshimage"
              />
            </div>
            <p tw=" text-base font-medium text-black mt-6">
              Getting you the latest trending mints
            </p>
          </div>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target={`https://0bbc-110-235-234-28.ngrok-free.app/api/findTrending`}
          key={1}
        >
          Refresh
        </Button>,
      ],
    };
  } else {
    // show nft lists
    return {
      image: (
        <div tw="flex h-full w-full items-center justify-center flex-col bg-[#f9f7f2] ">
          {/* <img
            src="https://i.ibb.co/mGQKf0t/Grid.png"
            alt="Grid-Pattern-1711814234821"
            tw="absolute"
          /> */}
          <div
            style={{ fontWeight: "700", fontSize: "22px" }}
            tw="flex bg-black text-white p-4 rounded-xl rounded-tl-none"
          >
            {" "}
            Trending Mints on Farcaster
          </div>
          <div tw="flex mt-6 ">
            {arr.map((item, index) => (
              <div tw="flex flex-col items-center" key={index}>
                <img
                  src={
                    "https://images.ctfassets.net/ohcexbfyr6py/4oCGZKmzbQeYjfg2OtuPA7/c5ed5f9fd84e827e8b7a2b5423b95fb0/The_Ethereum_Merge__ETH_2.0__explained.png"
                  }
                  alt="nft"
                  tw="h-44 w-44 shadow-2xl rounded-2xl rounded-bl-none border-white border-2 mx-3"
                />
                <div
                  style={{ fontWeight: "700", fontSize: "12px" }}
                  tw="flex bg-black text-white p-3 rounded-none rounded-tl-lg rounded-br-lg items-center justify-center w-44 mt-3 shadom-xl border-white border-2"
                >
                  Token : {item}
                </div>
              </div>
            ))}
          </div>
        </div>
        // <img
        //   src={
        //     "https://pbs.twimg.com/profile_images/1732439974497394688/ezW7LwKq_400x400.jpg"
        //   }
        //   alt="nft"
        //   tw="h-56 w-44 shadow-2xl border-2 border-blue-400"
        // />
      ),
      buttons: [
        <Button
          action="post"
          target={`https://0bbc-110-235-234-28.ngrok-free.app/api/frames/nftFrame`}
          key={"9"}
        >
          Take me to NFT
        </Button>,
      ],
      textInput: "  NFT Index Number",
      accepts: [
        {
          id: "",
          version: "vNext",
        },
      ],
    };
  }
});

export const POST = handleRequest;
