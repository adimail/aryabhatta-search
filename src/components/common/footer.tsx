// import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
export const Footer = () => {
  return (
    <footer className="my-5 px-2 text-sm md:text-base">
      <div>
        {/* <Image
          src="/aryabhatta-search.jpeg"
          alt="Aryabhatta Search"
          width={200}
          height={200}
          className="mx-auto rounded-xl"
        /> */}
        <p className="mt-8 text-center text-gray-600">
          &copy; 2025{" "}
          <Link href="/about" className="hover:underline">
            Aryabhatta Search
          </Link>
        </p>
        <Separator className="mx-auto my-4 max-w-2xl bg-gray-400" />
        <p className="mx-auto max-w-xl text-center text-gray-600">
          Made with ❤️ by{" "}
          <a href="https:///adimail.github.io" className="text-blue-500">
            Aditya Godse
          </a>
          ,{" "}
          <a href="https://github.com/RishabhK103" className="text-blue-500">
            Rishabh Kothari
          </a>
          ,{" "}
          <a
            href="https://github.com/Shreyakulkarni132"
            className="text-blue-500"
          >
            Shreya Kulkarni
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/rohitkshirsagar19"
            className="text-blue-500"
          >
            Rohit Kshirsagar
          </a>
        </p>
      </div>
    </footer>
  );
};
