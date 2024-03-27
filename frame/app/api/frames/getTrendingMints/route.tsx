import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async () => {
  // const response = await fetch(`${process.env.HOST}/api/findTrending`);
  // const data = await response.json();
  // console.log(data);

  const data = "hello";

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
          target={`https://e594-110-235-234-38.ngrok-free.app/api/findTrending`}
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
        // <div tw="flex h-full w-full items-center justify-between bg-white">
        //   <div
        //     style={{
        //       backgroundImage: "linear-gradient(to top, #ffffff, #ebf4ff)",
        //       width: 410,
        //       height: 600,
        //     }}
        //     tw="flex flex-1 flex-col px-8"
        //   >
        //     <div tw="flex items-center justify-between mx-auto w-full">
        //       <h4 style={{ fontWeight: 600 }} tw=" text-4xl text-indigo-500">
        //         {"Trending Mints on Farcaster"}
        //       </h4>
        //     </div>
        //     <div tw="flex items-center justify-around mx-auto w-full ">
        //       <div tw="flex flex-col mx-auto justify-center items-center w-1/3 mx-1">
        //         <img
        //           src={
        //             "https://pbs.twimg.com/profile_images/1732439974497394688/ezW7LwKq_400x400.jpg"
        //           }
        //           alt="nft"
        //           tw="h-56 w-44 shadow-2xl border-2 border-blue-400"
        //         />
        //         <h5 style={{ fontWeight: 600 }} tw="text-blue-600">
        //           {"hello"}
        //         </h5>
        //         <h5 tw="">{"1"}</h5>
        //       </div>
        //       <div tw="flex flex-col mx-auto justify-center items-center w-1/3 mx-1">
        //         <img
        //           src={
        //             "https://pbs.twimg.com/profile_images/1732439974497394688/ezW7LwKq_400x400.jpg"
        //           }
        //           alt="nft"
        //           tw="h-56 w-44 shadow-2xl border-2 border-blue-400"
        //         />
        //         <h5 style={{ fontWeight: 600 }} tw="text-blue-600">
        //           {"hello"}
        //         </h5>
        //         <h5 tw="">{"2"}</h5>
        //       </div>
        //       <div tw="flex flex-col mx-auto justify-center items-center w-1/3 mx-1">
        //         <img
        //           src={
        //             "https://pbs.twimg.com/profile_images/1732439974497394688/ezW7LwKq_400x400.jpg"
        //           }
        //           alt="nft"
        //           tw="h-56 w-44 shadow-2xl border-2 border-blue-400"
        //         />
        //         <h5 style={{ fontWeight: 600 }} tw="text-blue-600">
        //           {"hello"}
        //         </h5>
        //         <h5 tw="">{"3"}</h5>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        "https://pbs.twimg.com/profile_images/1732439974497394688/ezW7LwKq_400x400.jpg"
      ),
      buttons: [
        <Button
        action="post"
        target={`https://e594-110-235-234-38.ngrok-free.app/api/frames/nftFrame`}
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
