import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <>
      <Pagination itemCount={324} currentPage={33} pageSize={10} />
    </>
  );
}
