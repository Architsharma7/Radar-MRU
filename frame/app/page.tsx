import { Frame, getFrame, getFrameFlattened } from "frames.js";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
  return {
    title: "Radar Frame",
    other: await fetchMetadata(
      new URL(
        "/api/frames",
        process.env.NEXT_PUBLIC_HOST
          ? `${process.env.NEXT_PUBLIC_HOST}`
          : "http://localhost:3000"
      )
    ),
  };
}

export default function Home() {
  return (
    <div className="flex items-center flex-col justify-normal mt-16 min-h-screen gap-10 w-[80vw] mx-auto pb-16"></div>
  );
}
