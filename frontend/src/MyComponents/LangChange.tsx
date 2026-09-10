import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function LangChange() {
  const { i18n } = useTranslation();

  const isEnglish = i18n.resolvedLanguage?.startsWith("en");
  function handleChangeLanguage() {
    i18n.changeLanguage(i18n.resolvedLanguage?.startsWith("en") ? "ar" : "en");
  }

  return (
    <div className="ml-2 flex justify-start w-full max-w-md">
      <Button
        variant="ghost"
        className="font-bold"
        onClick={handleChangeLanguage}
      >
        {isEnglish ? "Arabic" :"إنجليزي"}
      </Button>
    </div>
  );
}
