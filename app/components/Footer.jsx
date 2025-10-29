import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <div className="w-full mx-auto p-4 py-8 sm:px-8 lg:px-10">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center gap-3">
              <Image
                unoptimized
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple Dream BD"
                width={20}
                height={15}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white transition-colors duration-300">
                Apple Dream BD
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white uppercase transition-colors duration-300">
                Quick Links
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
                <li className="mb-4">
                  <a className="hover:underline" href="#">
                    About Us
                  </a>
                </li>
                <li className="mb-4">
                  <a className="hover:underline" href="#">
                    Contact
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white uppercase transition-colors duration-300">
                Support
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
                <li className="mb-4">
                  <a className="hover:underline" href="#">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white uppercase transition-colors duration-300">
                Newsletter
              </h2>
              <form action="#" className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="form-input w-full bg-gray-100 dark:bg-background-dark/50 border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-primary focus:border-primary transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="bg-primary text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-800 sm:mx-auto lg:my-8 transition-colors duration-300" />
        <div className="sm:flex sm:items-center sm:justify-between px-4 sm:px-8 lg:px-10">
          <span className="text-sm text-gray-600 dark:text-gray-400 sm:text-center transition-colors duration-300">
            © 2024{" "}
            <a href="#" className="hover:underline">
              Apple Dream BD™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-5">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44s-1.44-.645-1.44-1.44.645-1.44 1.44-1.44 1.44.645 1.44 1.44z"></path>
              </svg>
              <span className="sr-only">Instagram page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
