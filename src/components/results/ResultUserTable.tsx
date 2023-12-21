import { useCallback, useEffect, useState } from "react";
import { useI18n } from "../../i18n/I18nContext";
import EyeIcon from "../icons/EyeIcon";
import Button, { BgColors } from "../ui/Button";
import Table from "../table/Table";
import CheckPersentage from "../ui/CheckPersentage";

interface Props{
    readonly data: any[];
    readonly getDocument: (value: any) => void;
    readonly deleteDocuments: (value: any[])=>void;
}

export default function ResultUserTable({
    data,
    deleteDocuments,
    getDocument
}:Props){
    
    const { translate } = useI18n();
    
    const headers:any = [
        {
            header: translate("LESSONS_TABLE_ID_COLUMN_TITLE"),
            access: 'id',
            width: 100,
        },
        {
            header: translate("LESSONS_TABLE_LESSON_NUMBER_COLUMN_TITLE"),
            access: 'Date',
            width: 100,
        },
        {
            header: translate("LESSONS_TABLE_LESSON_TITLE_COLUMN_TITLE"),
            access: 'UserName',
            width: 200,
        },
        {
            header: translate("LESSONS_TABLE_LESSON_TITLE_COLUMN_TITLE"),
            access: 'User',
            width: 400,
        },
        {
            header: translate("LESSONS_TABLE_LESSON_TITLE_COLUMN_TITLE"),
            access: 'Result',
            width: 100,
        },
        {
            header: translate("LESSONS_TABLE_LESSON_TITLE_COLUMN_TITLE"),
            access: 'Persentage',
            width: 200,
            searchHidden: true,
            ceil: (row: any)=>{
                return (
                    <CheckPersentage persentage={row.Persentage}/>
                )
            }
        },
        {
            header: "...",
            access: "details",
            width: 200,
            searchHidden: true,
            ceil: (row: any)=>{
                return (
                  <div className="d-flex gap-2">
                    <Button
                      onClick={()=>getDocument(row)}
                      className="py-2 px-3 text-light" 
                      bgColor={BgColors.Green}
                      >
                        <EyeIcon/>
                    </Button>
                  </div>
                    
                )
            }
        },
    ]

    const [list, setList] = useState(data);
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("");

    const searchHandler = useCallback((value: string, type: string)=>{
        setSearchValue(value);
        setSearchType(type)
    },[]);

    useEffect(()=>{
      if(searchValue){
        const searchValue2 = searchValue.trim().toUpperCase();
        const filterList = data.filter((pr: any)=>pr[searchType].toString().trim().toUpperCase().includes(searchValue2));
        setList(filterList);
      }else{
        setList(data)
      }
    },[data, searchType, searchValue])

    return <Table 
                headers={headers} 
                data={list} 
                withCheckbox 
                searchHeader={searchHandler} 
                selectRowCheckbox={(value: any)=>deleteDocuments(value)}/>
}