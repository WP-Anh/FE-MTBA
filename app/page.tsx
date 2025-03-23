import Image from "next/image";
import TopNavBar from "./ui/navbar/topnav";

export default function Home() {
  return (
    <div className="w-full">
      <div>
        {/* NavBar */}
        <TopNavBar />
      </div>

      <div>This is a homepage (-.-) </div>
    </div>
  );
}
