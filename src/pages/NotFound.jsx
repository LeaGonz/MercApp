import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation()

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">{t("notfound.title")}</h1>
            <p>{t("notfound.message")}</p>
        </div>
    )
}