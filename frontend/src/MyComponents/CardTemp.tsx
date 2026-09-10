import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchWeather,
} from "@/store/features/Weather/weatherSlice";

export default function CardTemp() {
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();
  const {
    value ,
    status,
    error,
    
  } = useAppSelector((state) => state.weather);
  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);
 

  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
  const [dateAndTime, setDateAndTime] = useState({
    date: new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
    }).format(new Date()),
    time: new Intl.DateTimeFormat(locale, {
      timeStyle: "short",
    }).format(new Date()),
  });

  useEffect(() => {
    const updateDateTime = () => {
      setDateAndTime({
        date: new Intl.DateTimeFormat(locale, {
          dateStyle: "long",
        }).format(new Date()),
        time: new Intl.DateTimeFormat(locale, {
          timeStyle: "short",
        }).format(new Date()),
      });
    };

    // تحديث فوري عند تغيير اللغة
    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, [locale]);
   if (status === 'loading') {
    return <div>جاري تحميل بيانات الطقس...</div>;
  }

  // عرض الخطأ
  if (status === 'failed') {
    return <div>خطأ: {error}</div>;
  }

  return (
    <Card className="rounded-lg w-full max-w-lg shadow-xl p-4 ">
      <CardHeader className="flex text-primary justify-between items-center gap-10 mt-3">
        <CardTitle className=" font-bold w-fit text-2xl hover:scale-105 hover:-translate-x-2 transition-all cursor-grab duration-300">
          {t("place")}
        </CardTitle>
        <div className=" flex flex-col gap-1">
          <CardTitle className="font-bold text-2xl cursor-pointer hover:translate-x-2 transition-all duration-300">
            {dateAndTime.date}
          </CardTitle>
          <CardTitle className="font-bold m-auto text-2xl cursor-pointer hover:translate-x-2 transition-all duration-300">
            {dateAndTime.time}
          </CardTitle>
        </div>
      </CardHeader>
      <hr />

      <CardContent>
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">
                {value?.current.temp_c ?? 0} {t("Temp")}
              </h1>
              <img
                src={`https:${value?.current.condition.icon}`}
                alt={"Weather Icon"}
              />
            </div>
            <div className="flex-col flex gap-2 text-muted-foreground">
              <p>
                {value?.current.condition.will_it_rain
                  ? `${t("cond2")} 🌧️`
                  : `${t("cond")}`}
              </p>
              <div className="flex flex-col justify-around h-15">
                <div className="flex  gap-2">
                  <p>{value?.current.condition.text ?? "Cloudy"}</p>
                  <p>|</p>
                  <p>{value?.current.humidity ?? 0}%🌡</p>
                </div>
                <div className="flex gap-2">
                  <p>
                    {t("min")}{" "}
                    {Math.floor(value?.current.temp_c ?? 0) - 5}{" "}
                    {t("Temp")}
                  </p>
                  <p>|</p>
                  <p>
                    {t("max")}{" "}
                    {Math.floor(value?.current.temp_c ?? 0) + 7}{" "}
                    {t("Temp")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/3  text-4xl">
            <FontAwesomeIcon
              icon={faCloud}
              className="w-full  text-8xl m-auto"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
