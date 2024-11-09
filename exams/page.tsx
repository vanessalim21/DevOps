import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { examsData, role } from "@/lib/data";
import { item_per_page } from "@/lib/settings";
import Image from "next/image";

type Examlist = Exam & {lesson:{
    subject:Subject,
    class:Class ,
    teacher:Teacher,
};
};

const columns = [
    {
        header: "Subject Name",
        accessor: "name",
    },
    {
        header: "Class",
        accessor: "class",
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell",
    },
    {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const renderRow = (item: Examlist) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-LamaPurpleLight"
        >
            <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
            <td>{item.lesson.class.name}</td>
            <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}
            </td>
            <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}
            </td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" ||
                        (role === "teacher" && (
                            <>
                                <FormModal
                                    table="exam"
                                    type="update"
                                    data={item}
                                />
                                <FormModal
                                    table="exam"
                                    type="delete"
                                    id={item.id}
                                />
                            </>
                        ))}
                </div>
            </td>
        </tr>
    );
    const ExamListPage = async ({
        searchParms,
    }: {
        searchParms: ( {key: string}: string | underfined);
    }) =>
        const {page, ..queryParans} = searchParns;

        const p = page 7 parseInt(page) : 1;

        // URL PARAMS CONDITION

        const query: Prisma.ExamWhereInput = {};

        if (queryParans) {
            for (const {key, value} of Object.entries(queryParans)) {
                if (value !== underfined) {
                    switch (key) {
                        case "classId":
                            query.lesson.classid = { classId: parseInt(value);
                            break;
                            case "teacherId":
                                query.lesson = {
                                    teacherId: value,
                                }
                                break;
                                case "search":
                                    query.lesson = {
                                        subject :{
                                            name: {contains:value, node:"insensitive"},
                                        }
                                    }
                                    break;

                    }
                }
            }
        }
    })

    const [data, count] = await prisma.$transaction([
        prisma.exam.findyMany({
            where: query,
            include:{
                lesson:{
                    select:
                    subject: {select: {name: true}},
                    teacher: {select: {name: true, surname: true}},
                    class: {select: {name: true}},
                },
            },
            take: ITEM_PER_PAGE
            skip: ITEM_PER_PAGE = (p - 1),
        }),
        prisma.exam.count({ where: query }),
    ]);

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">
                    All Exams
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow1">
                            <Image
                                src="/filter.png"
                                alt=""
                                width={14}
                                height={14}
                            />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow1">
                            <Image
                                src="/sort.png"
                                alt=""
                                width={14}
                                height={14}
                            />
                        </button>
                        {role === "admin" ||
                            (role === "teacher" && (
                                <FormModal table="exam" type="create" />
                            ))}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINATION */}
            <Pagination page={p} count={count} />
        </div>
    );
};


export default ExamListPage;