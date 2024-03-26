import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async () => {
  const response = await fetch(`${process.env.HOST}/api/findTrending`);
  const data = await response.json();
  console.log(data);

  if (!data) {
    fetch(`${process.env.HOST}/api/findTrending`, {
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
          target={`${process.env.HOST}/api/findTrending`}
          key= {1}
        >
          Refresh
        </Button>,
      ],
    }
  } else {
    // show nft lists
  }
});

export const POST = handleRequest;
