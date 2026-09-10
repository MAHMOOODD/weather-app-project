import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { WeatherData } from "@/Interfaces/Wether";
import i18n from "@/i18n";

// TypeScript Interface للحالة
interface WeatherState {
  value: WeatherData | null;
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
  lastUpdated: string | null;
}

// الحالة الابتدائية
const initialState: WeatherState = {
  value: null,
  status: "idle",
  error: null,
  lastUpdated: null,
};

// ✅ Async Thunk لجلب البيانات من API
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (_, { rejectWithValue }) => {
    const lang = i18n.language === "ar" ? "ar" : "en";
    const apikey = import.meta.env.VITE_WEATHER_API_KEY;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?q=30.033333%2C%2031.233334&lang=${lang}&key=${apikey}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      return data as WeatherData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// إنشاء الـ slice
export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeatherData: (state) => {
      state.value = null;
      state.status = "idle";
      state.lastUpdated = null;
      state.error = null;
    },
  },
  // ✅ 🔥 هنا بقى الـ extraReducers عشان تتعامل مع الـ Async Thunk
  extraReducers: (builder) => {
    builder
      // ⏳ حالة التحميل
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // ✅ تم الجلب بنجاح
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.status = "succeeded";
        state.value = action.payload;
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      // ❌ فشل الجلب
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string || "Failed to fetch weather data";
        state.value = null;
      });
  },
});

// تصدير الأكشنات
export const { clearWeatherData } = weatherSlice.actions;

// تصدير الـ reducer
export default weatherSlice.reducer;