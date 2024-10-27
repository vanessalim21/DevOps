import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex">
            {/* LEFT */}
            <div className="w-[14%] md:w-[10%] lg:w-[16%] xl:w-[14%] p-5">
                <Link
                    href="/"
                    className="flex items-center justify-center lg:justify-start gap-2"
                >
                    <Image src="/logo.png" alt="logo" width={45} height={45} />
                    <span className="hidden lg:block font-bold">
                        EDU School
                    </span>
                </Link>
                <Menu />
            </div>
            {/* RIGHT */}
            <div className="w-[84%] md:w-[90%] lg:w-[84%] xl:w-[86%] bg-[#f1f0ea] overflow-scroll flex flex-col">
                <Navbar />
                {children}
            </div>
        </div>
    );
}
