import { useTranslation } from "react-i18next";

export default function Contact() {
    const { t } = useTranslation()

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">{t("contact.title")}</h1>
            <p>{t("contact.description")}</p>
        </div>

    )
}