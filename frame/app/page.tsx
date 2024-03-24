import { getTrendingMintsOnFarcaster, processTrendingMints, sortAndFilterTrendingMints, extractImageFromTokenNfts } from "@/utils/trendingMints";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  getPreviousFrame,
  useFramesReducer,
  validateActionSignature,
} from "frames.js/next/server";
import Link from "next/link";
import { useState, useEffect } from "react";

type State = {
  page: number;
};

const initialState = { page: 1 };

const reducer: FrameReducer<State> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData.buttonIndex;
  return {
    page:
      state.page === 1 && buttonIndex === 1
        ? 2
        : buttonIndex === 1
        ? state.page - 1
        : buttonIndex === 2
        ? state.page + 1
        : 1,
  };
};

const lastPage = 4;

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const previousFrame = getPreviousFrame<State>(searchParams);

  const validMessage = await validateActionSignature(previousFrame.postBody);

  console.log(validMessage);

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  const [nftData, setNftData] = useState<string[]>([]);

  useEffect(() => {
    async function fetchDataAndProcess() {
      const trendingMintsData = await getTrendingMintsOnFarcaster();
      const unsortedData = await processTrendingMints(trendingMintsData);
      const sortedData = await sortAndFilterTrendingMints(unsortedData);
      const data = await extractImageFromTokenNfts(sortedData);
      setNftData(data);
    }
    fetchDataAndProcess();
  }, []);

  return (
    <div>
      <a href="">Radar frames</a>
      {process.env.NODE_ENV === "development" ? (
        <Link href="/debug">Debug</Link>
      ) : null}
      <FrameContainer
        postUrl="/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage
          src={
            state.page === 1
              ? "https://gateway.lighthouse.storage/ipfs/QmTyUxFsKXNwLfgGc5MLXXzcMGszDEKrCSGqNbC4HzNQqe"
              //@ts-ignore
              : `${nftData[state.page - 1]?.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`
          }
        />
        {state.page !== 1 ? (
          <FrameButton>←</FrameButton>
        ) : (
          <FrameButton action="link" target="">
            Start reviewing
          </FrameButton>
        )}
        {state.page < lastPage ? (
          <FrameButton>→</FrameButton>
        ) : (
          <FrameButton action="link" target="">
            Thanks for reviewing! 🎉
          </FrameButton>
        )}
      </FrameContainer>
    </div>
  );
}
