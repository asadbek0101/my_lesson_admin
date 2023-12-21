import { useI18n } from "../../i18n/I18nContext";

import PencilIcon from "../icons/PencilIcon";
import Button, { BgColors } from "../ui/Button";
import Table from "../table/Table";
import StatusPicker from "../ui/StatusPecker";

interface Props{
    readonly data: any;
    readonly loading: boolean;
    readonly editDocument: (value: any) => void;
    readonly deleteDocuments: (value: any) => void;
    readonly editStatus: (document: any, value: any) => void;
}

export default function LessonsDetailsTable({
    data,
    loading,
    editStatus,
    editDocument,
    deleteDocuments,
}:Props){

  const { translate } = useI18n();

  const headers:any = [
      {
        header: translate("LESSON_THEME_TABLE_ID_COLUMN_TITLE"),
        access: 'id',
        width: 100,
      },
      {
        header: translate("LESSON_THEME_TABLE_DATE_COLUMN_TITLE"),
        access: 'createdDate',
        width: 200,
      },
      {
        header: translate("LESSON_THEME_TABLE_LESSONS_NUMBER_COLUMN_TITLE"),
        access: 'lessonId',
        width: 200,
      },
      {
        header: translate("LESSON_THEME_TABLE_THEME_TITLE_COLUMN_TITLE"),
        access: 'themeTitle',
        width: 200,
      },
      {
        header: translate("LESSON_THEME_TABLE_STATUS_COLUMN_TITLE"),
        access: 'status',
        width: 200,
        searchHidden: true,
        ceil: (row: any)=>{

            return (
                <StatusPicker 
                    value={row.status} 
                    onChangeValue={(value)=>{
                        if(value !== row.status){
                          editStatus(row, value)
                        }
                    }}/>
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

  return <Table 
            loading={loading}
            data={data}
            headers={headers} 
            withCheckbox={true}
            selectRowCheckbox={(value: any)=>deleteDocuments(value)}
            />
}