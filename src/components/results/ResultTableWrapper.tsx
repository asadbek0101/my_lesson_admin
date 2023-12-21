import ResultTable from "./ResultTable";

const data = [
    {
        id: 1,
        CreatedDate: "22.11.2023",
        CreatedBy: "Asadbek Rejabboyev",
        TestTitle: "Dasturlash asoslari"
    },
    {
        id: 2,
        CreatedDate: "23.11.2023",
        CreatedBy: "Asadbek Rejabboyev",
        TestTitle: "C# asoslari"
    },
]

interface Props{
    readonly getDocument: (value: any)=>void;
    readonly deleteDocuments: (value: any)=>void;
}

export default function ResultTableWrapper({
    getDocument,
    deleteDocuments
}:Props){
    return <ResultTable 
                data={data} 
                getDocument={getDocument}
                deleteDocuments={deleteDocuments}
                />
}