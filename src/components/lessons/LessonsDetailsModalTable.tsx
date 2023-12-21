import { useI18n } from "../../i18n/I18nContext";

import Table from "../table/Table";

interface Props{
    readonly data: any[];
    readonly setRow: (value: any) => void;
}

export default function LessonsDetailsModalTable({
    data,
    setRow
}:Props){

    const { translate } = useI18n();

    const headers: any = [
        {
            header: translate("LESSONS_TABLE_LESSON_NUMBER_COLUMN_TITLE"),
            access: 'lessonNumber',
            width: 200,
            ceil: (row: any)=>{

                return (
                    <span
                        onClick={()=>setRow(row)} 
                        className="text-primary cursor-pointer" style={{
                        cursor: "pointer"                        
                    }}>{row.lessonNumber}</span>
                )
            }
        },
        {
            header: translate("LESSONS_TABLE_LESSON_TITLE_COLUMN_TITLE"),
            access: 'lessonTitle',
            width: 300,
        },
    ]

    return (
        <Table 
            headers={headers} 
            data={data}/>
    )
}