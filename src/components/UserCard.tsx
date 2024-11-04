import prisma from "@/lib/prisma";

const UserCard = async ({ type }: { type: "admin" | "teacher" |"student"}) => {
    const modelMap: Record<typeof type, any> = {
        admin: prisma.admin,
        teacher: prisma.teacher,
        student: prisma.student,
    };

    const data = await modelMap[type].count();

    return (
        <div className="rounded-2xl odd:bg-Green1 even:bg-Yellow1 p-4 flex-1 min-w-[130px]">
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-gray-600">
                    2024/25
                </span>
            </div>
            <h1 className="text-2xl font-semibold my-4">{data}</h1>
            <h2 className="capitalize text-sm font-medium text-white">
                {type}s
            </h2>
        </div>
    );
};

export default UserCard;
