export default function DealOfDay() {
  return (
    <section className="px-4 sm:px-8 lg:px-10 py-16">
      <div className="bg-gray-100 dark:bg-background-dark/50 rounded-xl p-8 flex flex-col lg:flex-row items-center gap-8 transition-colors duration-300">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img className="max-w-xs md:max-w-sm rounded-lg" alt="Apple Watch Ultra 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQeMqxDvk9cDu01zKqKg5LHKI20ktPYWaluale0LTt94JKzm9I5cy-H8DSzHOFX-9SH46v-6MihVk6CuzbpU0rBa6wg9w5Ke2Q6jackJXdHHGxDb008dbCwjcZEhoKUPsBEyi8Y6J60Pu7_Fr4NhA-t2Rtu6h2XsEgJlAy6QNSunw3oXb5Du3D-zCDWgzCHWVH2WRvGga38wbF5Sx1ims6XNgZylHAqcuuIL4--6SqAhO5fWITj3Qg0--2i0aFXGp_8eU_8pp-_2-t" />
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-primary font-bold uppercase tracking-wider">Deal of the Day</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-300">Apple Watch Ultra 2</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 transition-colors duration-300">Next-level adventure. The most rugged and capable Apple Watch pushes limits again. Featuring an all-new S9 SiP and a magical new way to use your watch without touching the screen.</p>
          <div className="flex justify-center lg:justify-start gap-4 my-6">
            <div className="text-center bg-background-light dark:bg-background-dark p-3 rounded-lg w-20 transition-colors duration-300">
              <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">12</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Hours</p>
            </div>
            <div className="text-center bg-background-light dark:bg-background-dark p-3 rounded-lg w-20 transition-colors duration-300">
              <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">45</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Mins</p>
            </div>
            <div className="text-center bg-background-light dark:bg-background-dark p-3 rounded-lg w-20 transition-colors duration-300">
              <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">32</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Secs</p>
            </div>
          </div>
          <button className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
            <span className="truncate">Shop Deal</span>
          </button>
        </div>
      </div>
    </section>
  );
}


