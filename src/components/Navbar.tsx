import Image from "next/image";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4">
            {/* SEARCH BAR */}
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <Image src="/search.png" alt="" width={16} height={16} />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[270px] p-2 bg-transparent outline-none"
                />
            </div>
            {/* USER */}
            <div className="flex items-center gap-6 justify-end w-full">
                <div className="flex flex-col">
                    <span className="text-s leading-3 font-medium">
                        John Doe
                    </span>
                    <span className="text-[14px] text-gray-500 text-right">
                        Admin
                    </span>
                </div>
                <Image
                    src="/avatar.png"
                    alt=""
                    width={45}
                    height={45}
                    className="rounded-full"
                />
            </div>
        </div>
    );
};

export default Navbar;
