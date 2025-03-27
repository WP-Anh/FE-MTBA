import Image from "next/image";
import TopNavBar from "./ui/navbar/topnav";
import Footer from "./ui/footer/foot";

export default function Home() {
  return (
    <div className="w-full">
      <div>
        {/* NavBar */}
        <TopNavBar />
      </div>

      <div className="h-[100vh]">This is a homepage (-.-) </div>

      <div className="">
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
