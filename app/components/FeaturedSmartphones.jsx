export default function FeaturedSmartphones() {
  return (
    <section className="px-4 sm:px-8 lg:px-10 py-10">
      <div className="flex flex-col w-full">
        <div className="text-center mb-10">
          <h2 className="text-gray-900  text-3xl font-bold leading-tight tracking-[-0.015em]">Featured Smartphones</h2>
          <p className="text-gray-600 mt-2">The best of the best, from the brands you love.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group overflow-hidden rounded-xl">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="iPhone 15 Pro in natural titanium" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuxKnfL_88VwTYjnOdnDQf93pXS6vbbXTOb_9zsQjcjkzjANe9iWYQRsSnN7OVNlbScbBaUfudtTCOBWpL5Ekkmzjxn0Ra-OgOcQ0xaeDwUPg__yjLtSn71Lz5Lv8mY2SBzuIcT5ulrlHwcmaAhX96SSDU-OtANcI6-FQFtH86-8mJzvieh3lLkN7K07tSGgCd3NXolkhRON4y0pBSyafCpV53xXtQ0EBYiliJMfELe2Whu5u26F1ksrDX0RF88dErw-cx7L_FTCEr" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-2xl font-bold">iPhone 15 Pro</h3>
              <p className="mt-1">The ultimate iPhone experience.</p>
              <a href="#" className="mt-3 inline-block font-semibold text-primary hover:underline">Shop Now →</a>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-xl">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Samsung Galaxy S24 Ultra in titanium gray" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5EJOx7VnWcnyOHjROUZJ52faau-PoqbUHl59Pa7atb4bf1_KxRiVygVRl2MHoykvoiB0e5ngz7hSJfyRIM76oH6CBqs6ALGBUcgNLIq64CiI5_8CKvx2RwckoVXezR1Kk2Fd1bOKs4Lfu6h_JXqE3Q_Kk5xH1hwDt_j69bSxPTjucJPYfBhEkDcqYdSdElgtLyiiaeapUfL7neYw9kOZOoOK26KCfw3l7CPhaowUOZkctG5DSKpkNdkqwXXsskMBof_R8qSzZebz2" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-2xl font-bold">Samsung Galaxy S24 Ultra</h3>
              <p className="mt-1">Galaxy AI is here.</p>
              <a href="#" className="mt-3 inline-block font-semibold text-primary hover:underline">Shop Now →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


