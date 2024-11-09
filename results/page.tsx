import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { resultsData, role } from "@/lib/data";
import Image from "next/image";

type ResultList = {
    id: number;
    title: string;
    studentName:string;
    studentsurName:string;
    teacherName:string;
    teachersurName:string;
    score:number;
    className: string;
    startTime: Date;
    };

const columns = [
    {
        header: "Title",
        accessor: "title",
    },
    {
        header: "Student",
        accessor: "student",
    },
    {
        header: "Score",
        accessor: "score",
        className: "hidden md:table-cell",
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell",
    },
    {
        header: "Class",
        accessor: "class",
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

const renderRow = (item: ResultList) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-Green1Light"
        >
            <td className="flex items-center gap-4 p-4">{item.title}</td>
            <td>{item.studentName + "" + item.studentName}</td>
            <td className="hidden md:table-cell">{item.score}</td>
            <td className="hidden md:table-cell">{item.teacherName + "" + item.teacherSurname}</td>
            <td className="hidden md:table-cell">{item.class}</td>
            <td className="hidden md:table-cell">{item.date}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" ||
                        (role === "teacher" && (
                            <>
                                <FormModal
                                    table="result"
                                    type="update"
                                    data={item}
                                />
                                <FormModal
                                    table="result"
                                    type="delete"
                                    id={item.id}
                                />
                            </>
                        ))}
                </div>
            </td>
        </tr>
    );
const ResultListPage = async ({
    searchParms,
}: {
    searchParms: ( {key: string}: string | underfined);
}) =>
    const {page, ..queryParans} = searchParns;

    const p = page 7 parseInt(page) : 1;

    // URL PARAMS CONDITION

    const query: Prisma.AssignmentWhereInput = {};

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
                                    },
                                };
                                break;

                }
            }
        }
    }
})

const [dataRes, count] = await prisma.$transaction([
    prisma.result.findyMany({
        where: query,
            include: {
                student: {select:{name:true,surname:true} },
                exam:{
                    include:{
                        lesson:{
                            select: {
                            class:{select:{name:true}}
                            teacher:{select:{name:true, surname: true}},
                        },
                    },
                },
            },
            assignments: {
                include: {
                    lesson: {
                        select: {
                            class: { select: { name:true}},
                            teacher: { select: { name: true, surname: true}},
                        }
                    }
                }
            }
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.exam.count({ where: query }),
]);

const data = dataRes.map(item=>{
    const assigments = item.exam || item.assignment;

    if(!assigments) return null;
    cont isExam = "startTime" in assigments;

    return{
        id:item.id,
        title:assessment.title,
        studentName:item.student.name,
        studentsurName:item.student.surname,
        teacherName:assessment.lesson.teacher.name,
        teachersurName:assessment.lesson.teacher.surname,
        score:item.score,
        className: assessment.lesson.class.name,
        startTime: isExam ? assessment.startTime : assessment.startDate,
    };
});

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">
                    All Results
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
                                <FormModal table="result" type="create" />
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

export default ResultListPage;
