export default function Footer() {
  return (
    <footer className="w-full z-50 p-2.5 px-10 border-t border-neutral-700">
      <div className="mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between text-neutral-500">
        <span className="text-sm  sm:text-center truncate">
          © {new Date().getFullYear()}{" "}
          <a href="/" className="hover:underline">
            knoWord.
          </a>
          <a
            href="https://opensource.org/license/mit"
            className="hover:underline"
          >
            &nbsp;The MIT License
          </a>
        </span>
        <ul className="hidden md:flex flex-wrap items-center text-sm mt-0 font-medium text-neutral-500 ">
          <li>
            <a href="/about" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a
              href="https://github.com/CabbitKheema/knoword"
              className="hover:underline me-4 md:me-6"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
