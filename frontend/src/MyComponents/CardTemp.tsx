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
import { fetchWeather } from "@/store/features/Weather/weatherSlice";

export default function CardTemp() {
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();
  const { value, status, error } = useAppSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  console.log("Weather Data:", value);

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

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [locale]);

  if (status === "loading") {
    return (
      <div className="p-8 text-center text-cyan-400 animate-pulse font-mono tracking-widest text-lg">
        [ SYSTEM LOADING WEATHER DATA... ]
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="p-8 text-center text-rose-500 font-mono tracking-wide">
        [ SYSTEM ERROR: {error} ]
      </div>
    );
  }

  return (
    <div className="relative group w-full max-w-2xl mx-auto p-1">
      <Card className="relative rounded-3xl w-full bg-slate-950/80 backdrop-blur-2xl text-slate-100 shadow-2xl p-6 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <CardHeader className="flex flex-row justify-between items-center gap-4 p-0 mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase opacity-80">
              {t("Lo")}
            </span>
            <CardTitle className="font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent hover:scale-105 transition-all cursor-pointer duration-300">
              {value?.location.name ?? "Unknown Location"}
            </CardTitle>
          </div>

          <div className="flex bg-slate-900/90 backdrop-blur-md px-5 py-2.5 rounded-2xl justify-center items-center flex-col gap-0.5 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] min-w-[160px]">
            <span className="font-bold text-base md:text-lg text-cyan-300 tracking-wide cursor-pointer hover:scale-105 transition-all duration-300">
              {dateAndTime.date}
            </span>
            <span className="font-mono text-xs md:text-sm text-slate-400 tracking-widest cursor-pointer hover:scale-105 transition-all duration-300">
              {dateAndTime.time}
            </span>
          </div>
        </CardHeader>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent my-4" />

        {/* Main Content */}
        <CardContent className="p-0 mt-6">
          <div className="flex justify-between items-center gap-6">
            <div className="flex flex-col gap-6 flex-1">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent drop-shadow-md">
                  {value?.current.temp_c ?? 0}{" "}
                  <span className="text-2xl md:text-3xl font-light text-cyan-400">
                    {t("Temp")}
                  </span>
                </h1>
                {value?.current.condition.icon && (
                  <div className="p-2 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-inner">
                    <img
                      src={`https:${value?.current.condition.icon}`}
                      alt={"Weather Icon"}
                      className="w-14 h-14 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 text-slate-400">
                <p className="font-semibold text-base md:text-lg text-cyan-300/90 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  {value?.current.condition.will_it_rain
                    ? `${t("cond2")} 🌧️`
                    : `${t("cond")}`}
                </p>

                <div className="flex flex-col gap-2.5 text-sm font-medium">
                  <div className="flex items-center gap-3 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80 w-fit">
                    <span className="text-slate-200">
                      {value?.current.condition.text ?? "Cloudy"}
                    </span>
                    <span className="text-cyan-500/50">|</span>
                    <span className="text-cyan-400">
                      {value?.current.humidity ?? 0}% 🌡
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80 w-fit">
                    <p className="text-emerald-400">
                      {t("min")}{" "}
                      <span className="font-bold">
                        {Math.floor(value?.current.temp_c ?? 0) - 5}
                      </span>{" "}
                      {t("Temp")}
                    </p>
                    <span className="text-slate-700">|</span>
                    <p className="text-rose-400">
                      {t("max")}{" "}
                      <span className="font-bold">
                        {Math.floor(value?.current.temp_c ?? 0) + 7}
                      </span>{" "}
                      {t("Temp")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center items-center p-4">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
              <FontAwesomeIcon
                icon={faCloud}
                className="text-8xl md:text-9xl text-cyan-400/90 "
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
