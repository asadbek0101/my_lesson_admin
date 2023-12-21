import React, { useCallback, useEffect, useState } from "react"
import Table from "../table/Table"
import Button, { BgColors } from "../ui/Button"
import EyeIcon from "../icons/EyeIcon";
import PencilIcon from "../icons/PencilIcon";
import { useI18n } from "../../i18n/I18nContext";
import StatusPicker from "../ui/StatusPecker";

interface Props{
  readonly loading: boolean;
  readonly getDocument: (value: any)=>void;
  readonly editDocument: (value: any)=>void;
  readonly editStatus: (row: any, status: any)=>void;
  readonly deleteDocuments: (value: any[])=>void;
  readonly data: any[];
}

export default function LessonsTable({
  loading,
  getDocument,
  editDocument,
  editStatus,
  deleteDocuments,
  data
}:Props){

  const { translate } = useI18n();

    const headers:any = [
        {
            header: translate("LESSONS_TABLE_ID_COLUMN_TITLE"),
            access: 'id',
            width: 100,
            searchHidden: true,
        },
        {
            header: translate("LESSONS_TABLE_ID_COLUMN_TITLE"),
            access: 'createdDate',
            width: 100,
            searchHidden: true,
        },
        {
            header: translate("LESSONS_TABLE_LESSON_NUMBER_COLUMN_TITLE"),
            access: 'lessonNumber',
            width: 200,
            searchHidden: true,
        },
        {
            header: translate("LESSONS_TABLE_LESSON_TITLE_COLUMN_TITLE"),
            access: 'lessonTitle',
            width: 200,
            searchHidden: true,
        },
        {
            header: "Status",
            access: "status",
            width: 200,
            searchHidden: true,
            ceil: (row: any)=>{
              return (
                <StatusPicker value={row.status} onChangeValue={(value)=>editStatus(row, value)}/>              
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
                      className="py-2 px-2 text-light" 
                      bgColor={BgColors.Green}
                      >
                        <EyeIcon/>
                    </Button>
                    <Button
                      onClick={()=>editDocument(row)}
                      className="py-2 px-2 text-light" 
                      bgColor={BgColors.Yellow}
                      >
                        <PencilIcon/>
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
              loading={loading}
              data={list}
              headers={headers} 
              searchHeader={(value, type)=>searchHandler(value, type)}
              withCheckbox={true}
              selectRowCheckbox={(value: any)=>deleteDocuments(value)}
            />
}