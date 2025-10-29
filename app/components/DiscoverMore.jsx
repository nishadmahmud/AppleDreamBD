export default function DiscoverMore() {
  return (
    <section className="px-4 sm:px-8 lg:px-10 py-16">
      <div className="text-center mb-10">
        <h2 className="text-gray-900  text-3xl font-bold leading-tight tracking-[-0.015em]">Discover More</h2>
        <p className="text-gray-600 mt-2">Explore our wide range of tech categories.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group overflow-hidden rounded-xl aspect-video md:aspect-auto">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Collection of smartwatches" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKs2p5lAueI9D6z-R03SLMiq8mm-cFbeXuDn94oF9XILmDiSgBqAEvSf0e62eZ7KBXvx2-5zsrlLWAER4ObLxsl27sAcc5I298LeArKf4yTJ2lPqeGWqiqsL3s93kzolOv55ax3uGGj5cK95jQ2a3WGhrnnz4IeYogHguRw3AH1zHG4DVyN1lvfesOLbsrG5BL5L5Mr0l9bBEUobJ3ilkiPQgz3t__SltvCfcb285cg_LKtE3udAuJREXwnC0xA_ceE0GILxqtsTr2" />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <h3 className="text-3xl font-bold">Smartwatches</h3>
          </div>
          <a className="absolute inset-0" href="#"></a>
        </div>
        <div className="relative group overflow-hidden rounded-xl aspect-video md:aspect-auto">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Premium headphones on a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLVn_xtiNefXKWcoe6NgI2B8GXNmcVsIwgU-BvywRIQ5WN4YxGnKNnkO5lcjMBw_hZdGjy_Aj6WyuVQ7ZiLO26jWsk2nfauTzZweVtI1EK0vn5cQdyc6dtqlGNM2DPFgmtHblRY5bV4y2T20w9u8DhK8kM4wXaXE8nz3nsZ77u4TqUrS7qfpAe-u3P881tlUQQkjx1MgQCW3esM3E1fepY5cvWAN-uDw6IVC7jSqMPlrPW9J1yb7ljBWvFy_RK3W0Qu6Np-dombikF" />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <h3 className="text-3xl font-bold">Headphones</h3>
          </div>
          <a className="absolute inset-0" href="#"></a>
        </div>
      </div>
    </section>
  );
}


