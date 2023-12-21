import { CheckboxField } from "../form/CheckboxField";
import { InputField } from "../form/InputField";
import DeleteIcon from "../icons/DeleteIcon";
import Button, { BgColors } from "../ui/Button";

interface Props{
    readonly inputName: string;
    readonly checkName: string;
    readonly value: string;
    readonly checked: boolean;
    readonly onChange: (value: any) => void;
    readonly onChecked: () => void;
    readonly deleteF: () => void;
}

export default function TestAnswer({
    inputName,
    checkName,
    value,
    checked,
    onChange,
    onChecked,
    deleteF
}:Props){
    return (
        <div
            className="d-flex align-items-center mt-2"
            >
            <div
                style={{
                    border: "1px solid rgb(209, 206, 206)",
                    width: "34px",
                    height:"34px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "2px"
                }}
                >
                <CheckboxField
                    name={checkName}
                    onChange={onChecked}
                    checked={checked}
                    />
                </div>
                <div
                className="w-100"
                >
                <InputField
                    height={34}
                    name={inputName}
                    value={value}
                    onChange={onChange}
                />
                </div>
                <Button
                    className="px-2"
                    heigh="34px"
                    bgColor={BgColors.Red}
                    onClick={deleteF}
                    >
                    <DeleteIcon/>
                </Button>
        </div>
    )
}