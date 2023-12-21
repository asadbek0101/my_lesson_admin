import { SelectPickerField } from "../form/SelectPrickerField";
import Button, { BgColors } from "../ui/Button";
import { TextAreaField } from "../form/TextAreaField";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import { LessonProps } from "../../api/lessons/LessonsDto";
import { InputField } from "../form/InputField";
import { GroupBox } from "../ui/GroupBox";
import { useI18n } from "../../i18n/I18nContext";
import { update } from "immupdate";

interface Props{
    readonly initialValues: LessonProps;
    readonly setInitialValues: (value: any) => void;
    readonly onSubmit: (value: any) => void;
}

export default function LessonsForm({
    initialValues,
    setInitialValues,
    onSubmit
}:Props){

    const { translate } = useI18n();

    const onChangeLessonTitle = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            lessonTitle: value.target.value
        }))
    },[setInitialValues]);

    const onChangeLessonNubmer = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            lessonNumber: value.target.value
        }))
    },[setInitialValues])

    const onChangeLessonDescription = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            lessonDescription: value.target.value
        }))
    },[setInitialValues]);
    
    const onChangeLessonThemes = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            lessonThemes: value
        }))
    },[setInitialValues])

    const themeOptions = [
        {
            label: translate("Amaliy Ish"),
            value: "AA"
        },
        {
            label: translate("Labaratoriya Ish"),
            value: "AB"
        },
        {
            label: translate("Maruza Matni"),
            value: "AC"
        },
        {
            label: translate("Video Dars"),
            value: "AD"
        },
        {
            label: translate("Test"),
            value: "AE"
        },
    ]

    return (
        <div className="p-3">
            <Formik
                initialValues={initialValues}
                onSubmit={()=>onSubmit(initialValues)}
                >
                    {()=>(
                        <Form>
                        <div className="row p-4">
                            <div className="col-6">
                                <GroupBox
                                    title="LESSON_FORM_CREATE_LESSON_TITLE"
                                    >
                                    <div className="row">
                                        <div className="col-6">
                                            <InputField 
                                                name="lessonTitle" 
                                                label="LESSON_FORM_LESSON_TITLE_FIELD_TITLE"
                                                value={initialValues.lessonTitle}
                                                onChange={onChangeLessonTitle}    
                                                />
                                        </div>
                                        <div className="col-6">
                                            <InputField 
                                                name="lessonNumber"
                                                label="LESSON_FORM_LESSON_NUMBER_FIELD_TITLE"
                                                value={initialValues.lessonNumber}
                                                onChange={onChangeLessonNubmer} 
                                                />
                                        </div>
                                        <div className="col-12">
                                            <SelectPickerField  
                                                label="LESSON_FORM_LESSON_THEMES_FIELD_TITLE"
                                                name="lessonThemes"
                                                className="mt-4"
                                                options={themeOptions}
                                                onChanges={onChangeLessonThemes}
                                                isMulti={true}
                                                />
                                        </div>
                                        <div className="col-12">
                                            <TextAreaField 
                                                label="LESSON_FORM_LESSON_DESCRIPTION_FIELD_TITLE" 
                                                name="lessonDescription" 
                                                className="mt-4"
                                                onChange={onChangeLessonDescription} 
                                                />
                                        </div>
                                        <div className="col-12 d-flex justify-content-end mt-3">
                                            <Button
                                                type="submit"
                                                className="px-3 py-2 text-light"
                                                bgColor={BgColors.Green}
                                                >
                                                {translate("SAVE_BUTTON_TITLE")}
                                            </Button>
                                        </div>
                                    </div>
                                </GroupBox>
                            </div>
                        </div>
                        </Form>
                    )}
            </Formik>
        </div>
    )
}