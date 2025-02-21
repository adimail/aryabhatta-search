import { SearchBar } from "@/modules/home";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-20 text-4xl font-bold">404 - Page Not Found</h1>
      <SearchBar />
    </div>
  );
}
