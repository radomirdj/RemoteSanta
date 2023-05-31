export interface ICountry {
  id: string;
  countryName: string;
  countryCode: string;
  currencyString: string;
  conversionRateToPoints: number;
  flag: string;
}

export const countryList: ICountry[] = [
  {
    id: "76a2e7f6-e202-4c99-95a6-08fb361b112d",
    countryName: "Serbia",
    countryCode: "SRB",
    currencyString: "RSD",
    conversionRateToPoints: 1,
    flag: require("./../assets/flags/serbia.png"),
  },
  {
    id: "90f80d8c-40dc-4c43-b385-6f6fcf8e848c",
    countryName: "United States of America",
    countryCode: "USA",
    currencyString: "USD",
    conversionRateToPoints: 100,
    flag: require("./../assets/flags/usa.png"),
  },
  {
    id: "0268e718-8f26-4d29-8955-6fa96784bfb4",
    countryName: "Mexico",
    countryCode: "MX",
    currencyString: "MXN",
    conversionRateToPoints: 10,
    flag: require("./../assets/flags/mexico.png"),
  },
  {
    id: "4b5f74e9-37fc-4f1d-b2fc-ddca7269d19d",
    countryName: "India",
    countryCode: "IN",
    currencyString: "INR",
    conversionRateToPoints: 1,
    flag: require("./../assets/flags/india.png"),
  },
  {
    id: "7810e53a-048f-4efa-9a1a-1b8042e6fdca",
    countryName: "Other",
    countryCode: "N/A",
    currencyString: "N/A",
    conversionRateToPoints: 1,
    flag: "",
  },
];
