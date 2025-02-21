import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="my-20">
      <div>
        <Image
          src="/aryabhatta-search.jpeg"
          alt="Aryabhatta Search"
          width={200}
          height={200}
          className="mx-auto rounded-xl"
        />
        <p className="mt-8 text-center text-gray-600">
          &copy; 2025 Aryabhatta Search
        </p>
      </div>
    </footer>
  );
};
