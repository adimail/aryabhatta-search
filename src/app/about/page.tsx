import { FaGithub } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">
          About Aryabhatta-Search
        </h1>
        <p className="mb-4 text-lg text-gray-700">
          Aryabhatta-Search is your smart educational companion that makes
          learning easier. We&apos;re an AI-powered platform that helps students
          find and understand educational content, from basic school topics to
          advanced college subjects.
        </p>
        <p className="mb-4 text-lg text-gray-700">
          In today&apos;s digital world, there&apos;s an overwhelming amount of
          study material online. We solve this by using AI to find exactly what
          you need, when you need it. Our platform includes interactive 3D
          models and carefully organized content to make learning more engaging
          and effective.
        </p>
        <p>
          <a
            href="https://github.com/adimail/aryabhatta-search"
            className="mt-5 inline-flex items-center gap-4 text-lg text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-xl" />
            aryabhatta-search
          </a>
        </p>
      </div>
    </div>
  );
}
