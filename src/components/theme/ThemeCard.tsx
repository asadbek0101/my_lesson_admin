import "./assets/theme-card.scss";
import { LessonThemeTypes } from "../../api/appDTO";
import { useI18n } from "../../i18n/I18nContext";

interface Props{
    readonly themeType: LessonThemeTypes;
    readonly onSelectThemeType: () => void;
}

export default function ThemeCard({
    themeType,
    onSelectThemeType
}:Props){

    const { translate } = useI18n();

    if(!themeType) return null;

    return (
        <div className={`theme-card mb-4 ${themeType}`} 
              onClick={onSelectThemeType}>
            <div className="theme-card-tite">
                <span>{translate(`LESSON_THEME_${themeType}_TITLE`)}</span>
            </div>
            <div className="theme-card-line"/>
            <div
                 className="theme-card-logo-img"
                    style={{
                        backgroundImage: `url(${require(`../../images/${themeType}.png`)})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
            </div>
        </div>
    )
}