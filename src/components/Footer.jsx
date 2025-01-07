export default function Footer() {
  return (
    <footer className="w-full z-50 p-2.5 px-10 border-t border-neutral-700">
      <div className="mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between text-neutral-500">
        <span className="text-sm  sm:text-center ">
          © {new Date().getFullYear()}{" "}
          <a href="#" className="hover:underline">
            ReadAssist™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="hidden md:flex flex-wrap items-center text-sm mt-0 font-medium text-neutral-500 ">
          <li>
            <a href="/about" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
