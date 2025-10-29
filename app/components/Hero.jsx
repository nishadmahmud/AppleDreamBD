import Image from "next/image";
export default function Hero() {
  return (
    <section className="px-4 sm:px-8 lg:px-10 py-10">
      <div className="relative w-full @container bg-gray-900 rounded-xl overflow-hidden text-white min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            unoptimized
            src="https://media.macphun.com/img/uploads/customer/blog/3501/1749749510684b0f06056cb7.96384689.jpg?q=85&w=1680"
            alt="Premium tech gadgets displayed on a sleek background"
            className="w-full h-full object-cover opacity-30"
            width={1000}
            height={1000}
          />
        </div>
        <div className="relative z-10 p-8 @[768px]:p-12 @[1024px]:p-16">
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex flex-col gap-2">
              <p className="text-base font-bold text-primary uppercase tracking-widest">
                Next Gen Technology
              </p>
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl text-white">
                Unleash Your Potential.
              </h1>
              <h2 className="text-lg font-normal leading-normal @[480px]:text-xl text-gray-300">
                Discover the latest in premium tech. Cutting-edge performance
                and iconic design, all in one place.
              </h2>
            </div>
            <button className="self-start min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
              <span className="truncate">Explore Collection</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <button className="w-2 h-2 rounded-full bg-white"></button>
          <button className="w-2 h-2 rounded-full bg-white/50 hover:bg-white"></button>
          <button className="w-2 h-2 rounded-full bg-white/50 hover:bg-white"></button>
        </div>
      </div>
    </section>
  );
}
