import { useTranslation } from "react-i18next";
import CardTemp from "./MyComponents/CardTemp";
import LangChange from "./MyComponents/LangChange";

import Nav from "./MyComponents/Nav";
import { useEffect } from "react";
function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir =
      i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <div className="min-h-screen gap-2 flex-col flex justify-center items-center">
      <Nav />

      <CardTemp />
      <LangChange />
    </div>
  );
}

export default App;
