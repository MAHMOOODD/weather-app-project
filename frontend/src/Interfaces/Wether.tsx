export interface WeatherData {
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
      icon: string;
      will_it_rain: number;
    };
  };

  location: {
    name: string;
    country: string;
    localtime: string;
    region: string;
  };
}