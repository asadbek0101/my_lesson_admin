import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import Button, { BgColors } from "../ui/Button";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback } from "react";
import { update } from "immupdate";

interface Props{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly getLessonList: () => void;
    readonly onSubmit: (value: any) => void;
}

export default function LessonsDetailsForm({
    initialValues,
    getLessonList,
    setInitialValues,
    onSubmit
}:Props){

    const { translate } = useI18n();

    const onChangeThemeTitle = useCallback((event: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            themeTitle: event.target.value
        }))
    },[setInitialValues])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={()=>onSubmit(initialValues)}            
            >
            {()=>(
                <Form>
                    <div className="row p-4">
                        <div className="col-6">
                            <GroupBox>
                                <div className="row">
                                    <div className="col-12">
                                        <InputField 
                                            name="themeTitle" 
                                            label="Theme Title"
                                            value={initialValues.themeTitle}
                                            onChange={onChangeThemeTitle}
                                            />
                                    </div>
                                    <div className="col-12 mt-4 d-flex w-100 align-items-end">
                                        <InputField 
                                            name="lessonOfTheme" 
                                            label="Lesson for Theme" 
                                            value={initialValues.lessonOfTheme}
                                            disabled={true}
                                            className="w-100"/>
                                        <Button 
                                            heigh="39px"
                                            className="px-3 text-light"
                                            bgColor={BgColors.Yellow}
                                            onClick={getLessonList}
                                            >
                                            Download
                                        </Button>
                                    </div>
                                    <div className="col-12 d-flex justify-content-end mt-4">
                                        <Button
                                            className="px-3 py-2 text-light"
                                            bgColor={BgColors.Green}
                                            type="submit"
                                            >
                                            {translate("SEND_BUTTON_TITLE")}
                                        </Button>
                                    </div>
                                </div>
                            </GroupBox>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}