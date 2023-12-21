import ResultUserTable from "./ResultUserTable";

const data = [
    {
        id: 1,
        Date: "22.11.2023",
        User: "Eshmatov Toshmatvoy",
        UserName: "Eshmatvoy001",
        Result: "18/20",
        Persentage: "90",
    },
    {
        id: 2,
        Date: "22.11.2023",
        User: "Javohir To'lqinboyev",
        UserName: "Javohir001",
        Result: "15/20",
        Persentage: "75",
    },
    {
        id: 3,
        Date: "22.11.2023",
        User: "Qudratbek Adburahimov",
        UserName: "Qudratbek001",
        Result: "10/20",
        Persentage: "50",
    },
]

interface Props{
    readonly getDocument: (value: any) => void;
    readonly deleteDocuments: (value: any) => void;
}

export default function ResultUserTableWrapper({
    getDocument,
    deleteDocuments
}:Props){
    return  <ResultUserTable
                    data={data}
                    getDocument={getDocument}
                    deleteDocuments={deleteDocuments}
                    />
}