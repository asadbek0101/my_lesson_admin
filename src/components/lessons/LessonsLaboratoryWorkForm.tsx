import AppCreatePage from "../ui/CreatePage";

interface Props{
    readonly value: any;
    readonly setValue: (value: any) => void;
    readonly onSubmit: (value: any) => void;
}

export default function LessonsLaboratoryWorkForm({
    value,
    setValue,
    onSubmit,
}:Props){
    
    return <AppCreatePage 
                value={value} 
                onSubmit={onSubmit}
                setValue={setValue}/>
}