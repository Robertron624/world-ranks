import Image from "next/image";

import MainBox from "./components/MainBox";

export default function Home() {
  return (
    <>
    <main className="flex min-h-screen flex-col items-center bg-hero-pattern bg-no-repeat bg-contain bg-top pt-20 bg-jet">
      <div className="logo-container w-full flex justify-center">
        <Image
          src="/Logo.svg"
          alt="World Ranks logo"
          width={200}
          height={100}
          className="w-auto"
        />
      </div>
      <MainBox />
    </main>
    </>
  );
}
