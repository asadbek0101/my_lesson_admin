import { useState } from "react";
import Button, { BgColors } from "../ui/Button";

import AddIcon from "../icons/AddIcon";
import ImageMenu from "../ui/ImageMenu";
import ShowImage from "../ui/ShowImage";

const data = [
    {
        id: 1,
        imageBytes: "data:image/jpeg;base64,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",
    },
    {
        id: 2,
        imageBytes: "data:image/jpeg;base64,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",
    },
    {
        id: 3,
        imageBytes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4dByqg_LrjKE6Z9_Yll7oRKM6u2Zb-TLig&usqp=CAU",
    },
    {
        id: 4,
        imageBytes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajsok9MtPi_Y9zCKfFHPwN5mIJWeboid2yw&usqp=CAU",
    },
    {
        id: 5,
        imageBytes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajsok9MtPi_Y9zCKfFHPwN5mIJWeboid2yw&usqp=CAU",
    },
    {
        id: 5,
        imageBytes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajsok9MtPi_Y9zCKfFHPwN5mIJWeboid2yw&usqp=CAU",
    }
]

interface Props{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
}

export default function LessonsPPTXForm({
    initialValues,
    setInitialValues
}:Props){

    const [index, setIndex] = useState(0);

    return (
        <div className="w-100 h-100">
            <div className="row">
                <div className="col-10">
                   <ShowImage imageLink={data[index].imageBytes}/>
                </div>
                <div className="col-2">
                   <ImageMenu imageMenuData={data} deleteImage={(value: any)=>console.log(value)} 
                    setImage={(value: any)=>{
                        const index = data.findIndex((d: any)=>d.id === value.id);
                        setIndex(index); 
                    }}/>
                   <Button 
                        className="w-100 mt-3 py-2 text-light"
                        bgColor={BgColors.Green}
                        icon={<AddIcon/>}
                        >
                        Add Image
                   </Button>
                </div>
            </div>
        </div>
    )
}