export interface ICountry {
  id: string;
  countryName: string;
  countryCode: string;
  currencyString: string;
  conversionRateToPoints: number;
  flagEmoji: string;
  flagEmojiUnicode?: string;
  hasGiftCards?: boolean;
}

export const countryList: ICountry[] = [
  {
    id: "90f80d8c-40dc-4c43-b385-6f6fcf8e848c",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "USA",
    countryName: "United States of America",
    flagEmoji: "🇺🇸",
    flagEmojiUnicode: "U+1F1FA U+1F1F8",
    hasGiftCards: true
  },
  {
    id: "96d35219-4e09-44ea-a192-bf954b7b0208",
    currencyString: "AFN",
    conversionRateToPoints: 1,
    countryCode: "AFG",
    countryName: "Afghanistan",
    flagEmoji: "🇦🇫",
    flagEmojiUnicode: "U+1F1E6 U+1F1EB"
  },
  {
    id: "0d953099-3137-4023-936a-cada9510aa29",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "ALA",
    countryName: "Aland Islands",
    flagEmoji: "🇦🇽",
    flagEmojiUnicode: "U+1F1E6 U+1F1FD"
  },
  {
    id: "f6940555-967a-483a-b2f7-b6baacabe2fb",
    currencyString: "ALL",
    conversionRateToPoints: 1,
    countryCode: "ALB",
    countryName: "Albania",
    flagEmoji: "🇦🇱",
    flagEmojiUnicode: "U+1F1E6 U+1F1F1"
  },
  {
    id: "58d7a492-a292-4f88-9922-195c03e0195f",
    currencyString: "DZD",
    conversionRateToPoints: 100,
    countryCode: "DZA",
    countryName: "Algeria",
    flagEmoji: "🇩🇿",
    flagEmojiUnicode: "U+1F1E9 U+1F1FF"
  },
  {
    id: "ef41a3ed-3d8b-4541-af8c-a08e4054fdb3",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "ASM",
    countryName: "American Samoa",
    flagEmoji: "🇦🇸",
    flagEmojiUnicode: "U+1F1E6 U+1F1F8"
  },
  {
    id: "ed91dc39-0873-40bc-b97b-fd94c28ff4fc",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "AND",
    countryName: "Andorra",
    flagEmoji: "🇦🇩",
    flagEmojiUnicode: "U+1F1E6 U+1F1E9"
  },
  {
    id: "036302db-e976-4f58-8395-f802fa3d5da4",
    currencyString: "AOA",
    conversionRateToPoints: 100,
    countryCode: "AGO",
    countryName: "Angola",
    flagEmoji: "🇦🇴",
    flagEmojiUnicode: "U+1F1E6 U+1F1F4"
  },
  {
    id: "8a18659a-6bc2-4914-a72b-75e75f769c45",
    currencyString: "XCD",
    conversionRateToPoints: 100,
    countryCode: "AIA",
    countryName: "Anguilla",
    flagEmoji: "🇦🇮",
    flagEmojiUnicode: "U+1F1E6 U+1F1EE"
  },
  {
    id: "f4aaca57-a2c0-4b42-a47e-d1d267f594d0",
    currencyString: "XCD",
    conversionRateToPoints: 100,
    countryCode: "ATA",
    countryName: "Antarctica",
    flagEmoji: "🇦🇶",
    flagEmojiUnicode: "U+1F1E6 U+1F1F6"
  },
  {
    id: "8ae9aeca-d062-44bb-b496-ce8400619749",
    currencyString: "XCD",
    conversionRateToPoints: 100,
    countryCode: "ATG",
    countryName: "Antigua and Barbuda",
    flagEmoji: "🇦🇬",
    flagEmojiUnicode: "U+1F1E6 U+1F1EC"
  },
  {
    id: "8dc28bad-c728-4d6a-ba0e-039e3bf96d2b",
    currencyString: "ARS",
    conversionRateToPoints: 100,
    countryCode: "ARG",
    countryName: "Argentina",
    flagEmoji: "🇦🇷",
    flagEmojiUnicode: "U+1F1E6 U+1F1F7"
  },
  {
    id: "32ad3dd9-abed-4a78-a6f3-9813af3fb906",
    currencyString: "AMD",
    conversionRateToPoints: 1,
    countryCode: "ARM",
    countryName: "Armenia",
    flagEmoji: "🇦🇲",
    flagEmojiUnicode: "U+1F1E6 U+1F1F2"
  },
  {
    id: "1b79fa8c-3946-4347-93bc-ce1a5593c6cb",
    currencyString: "AWG",
    conversionRateToPoints: 100,
    countryCode: "ABW",
    countryName: "Aruba",
    flagEmoji: "🇦🇼",
    flagEmojiUnicode: "U+1F1E6 U+1F1FC"
  },
  {
    id: "45dad1b5-fbbb-4853-9dae-116139f7b0a8",
    currencyString: "AUD",
    conversionRateToPoints: 100,
    countryCode: "AUS",
    countryName: "Australia",
    flagEmoji: "🇦🇺",
    flagEmojiUnicode: "U+1F1E6 U+1F1FA"
  },
  {
    id: "fd208220-abd2-42e9-8aaa-ea46f432181a",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "AUT",
    countryName: "Austria",
    flagEmoji: "🇦🇹",
    flagEmojiUnicode: "U+1F1E6 U+1F1F9"
  },
  {
    id: "23c241af-36d5-4762-8e50-edf0bec78ba5",
    currencyString: "AZN",
    conversionRateToPoints: 100,
    countryCode: "AZE",
    countryName: "Azerbaijan",
    flagEmoji: "🇦🇿",
    flagEmojiUnicode: "U+1F1E6 U+1F1FF"
  },
  {
    id: "ac7698af-81c2-4541-aa9b-360f6ea61f10",
    currencyString: "BSD",
    conversionRateToPoints: 100,
    countryCode: "BHS",
    countryName: "Bahamas",
    flagEmoji: "🇧🇸",
    flagEmojiUnicode: "U+1F1E7 U+1F1F8"
  },
  {
    id: "63215b0a-e04b-4038-ab57-2d30a7440322",
    currencyString: "BHD",
    conversionRateToPoints: 1000,
    countryCode: "BHR",
    countryName: "Bahrain",
    flagEmoji: "🇧🇭",
    flagEmojiUnicode: "U+1F1E7 U+1F1ED"
  },
  {
    id: "d5abffba-9f3e-455f-b6f1-120b42603f76",
    currencyString: "BDT",
    conversionRateToPoints: 100,
    countryCode: "BGD",
    countryName: "Bangladesh",
    flagEmoji: "🇧🇩",
    flagEmojiUnicode: "U+1F1E7 U+1F1E9"
  },
  {
    id: "e804308a-89aa-45fd-98d3-a86b644d4561",
    currencyString: "BBD",
    conversionRateToPoints: 100,
    countryCode: "BRB",
    countryName: "Barbados",
    flagEmoji: "🇧🇧",
    flagEmojiUnicode: "U+1F1E7 U+1F1E7"
  },
  {
    id: "a807d9a6-69d2-463b-adc8-8029b304e48f",
    currencyString: "BYR",
    conversionRateToPoints: 1,
    countryCode: "BLR",
    countryName: "Belarus",
    flagEmoji: "🇧🇾",
    flagEmojiUnicode: "U+1F1E7 U+1F1FE"
  },
  {
    id: "a06b5ed9-d743-40eb-8c17-fd2802f93c8d",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "BEL",
    countryName: "Belgium",
    flagEmoji: "🇧🇪",
    flagEmojiUnicode: "U+1F1E7 U+1F1EA"
  },
  {
    id: "ab4225eb-40f6-4c3e-af0f-212be76d8180",
    currencyString: "BZD",
    conversionRateToPoints: 100,
    countryCode: "BLZ",
    countryName: "Belize",
    flagEmoji: "🇧🇿",
    flagEmojiUnicode: "U+1F1E7 U+1F1FF"
  },
  {
    id: "1a3c75bc-138a-4644-b56c-3e7a0f281ef1",
    currencyString: "XOF",
    conversionRateToPoints: 1,
    countryCode: "BEN",
    countryName: "Benin",
    flagEmoji: "🇧🇯",
    flagEmojiUnicode: "U+1F1E7 U+1F1EF"
  },
  {
    id: "fc79653b-406d-4cf5-b788-4bbf5601879c",
    currencyString: "BMD",
    conversionRateToPoints: 100,
    countryCode: "BMU",
    countryName: "Bermuda",
    flagEmoji: "🇧🇲",
    flagEmojiUnicode: "U+1F1E7 U+1F1F2"
  },
  {
    id: "cdc767a4-3cd6-4c59-a0a6-0e3cdc9303fb",
    currencyString: "BTN",
    conversionRateToPoints: 100,
    countryCode: "BTN",
    countryName: "Bhutan",
    flagEmoji: "🇧🇹",
    flagEmojiUnicode: "U+1F1E7 U+1F1F9"
  },
  {
    id: "70eb6ab6-f237-46e2-ad64-7c9d51d87640",
    currencyString: "BOB",
    conversionRateToPoints: 100,
    countryCode: "BOL",
    countryName: "Bolivia",
    flagEmoji: "🇧🇴",
    flagEmojiUnicode: "U+1F1E7 U+1F1F4"
  },
  {
    id: "a2acf910-a82a-464f-bc03-ca0febb07ffa",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "BES",
    countryName: "Bonaire, Saint Eustatius and Saba ",
    flagEmoji: "🇧🇶",
    flagEmojiUnicode: "U+1F1E7 U+1F1F6"
  },
  {
    id: "17e1d35e-6935-44da-aaca-1499e6d58184",
    currencyString: "BAM",
    conversionRateToPoints: 100,
    countryCode: "BIH",
    countryName: "Bosnia and Herzegovina",
    flagEmoji: "🇧🇦",
    flagEmojiUnicode: "U+1F1E7 U+1F1E6"
  },
  {
    id: "9fce3e71-5921-4d1d-a03d-069cc1a8c7a7",
    currencyString: "BWP",
    conversionRateToPoints: 100,
    countryCode: "BWA",
    countryName: "Botswana",
    flagEmoji: "🇧🇼",
    flagEmojiUnicode: "U+1F1E7 U+1F1FC"
  },
  {
    id: "8f1a112a-b587-48bb-94dc-0c8b3870de4d",
    currencyString: "NOK",
    conversionRateToPoints: 100,
    countryCode: "BVT",
    countryName: "Bouvet Island",
    flagEmoji: "🇧🇻",
    flagEmojiUnicode: "U+1F1E7 U+1F1FB"
  },
  {
    id: "339a6c8d-067a-4812-a0c9-96d5e4ad4a88",
    currencyString: "BRL",
    conversionRateToPoints: 100,
    countryCode: "BRA",
    countryName: "Brazil",
    flagEmoji: "🇧🇷",
    flagEmojiUnicode: "U+1F1E7 U+1F1F7"
  },
  {
    id: "e3f79cfb-0a29-407c-8d4d-ee68173d96c2",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "IOT",
    countryName: "British Indian Ocean Territory",
    flagEmoji: "🇮🇴",
    flagEmojiUnicode: "U+1F1EE U+1F1F4"
  },
  {
    id: "502ef4ef-cb41-4016-9f34-47ca1104c5e4",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "VGB",
    countryName: "British Virgin Islands",
    flagEmoji: "🇻🇬",
    flagEmojiUnicode: "U+1F1FB U+1F1EC"
  },
  {
    id: "6f810abd-f317-4800-9b3f-2a47bf7d804d",
    currencyString: "BND",
    conversionRateToPoints: 100,
    countryCode: "BRN",
    countryName: "Brunei",
    flagEmoji: "🇧🇳",
    flagEmojiUnicode: "U+1F1E7 U+1F1F3"
  },
  {
    id: "7bbdb2c1-3287-4096-abb0-45ffa8dc2294",
    currencyString: "BGN",
    conversionRateToPoints: 100,
    countryCode: "BGR",
    countryName: "Bulgaria",
    flagEmoji: "🇧🇬",
    flagEmojiUnicode: "U+1F1E7 U+1F1EC"
  },
  {
    id: "b54670ca-0ffb-430b-80f3-b856b7239e7a",
    currencyString: "XOF",
    conversionRateToPoints: 1,
    countryCode: "BFA",
    countryName: "Burkina Faso",
    flagEmoji: "🇧🇫",
    flagEmojiUnicode: "U+1F1E7 U+1F1EB"
  },
  {
    id: "beab2cc2-5cf3-4466-8e84-b28353e9a353",
    currencyString: "BIF",
    conversionRateToPoints: 1,
    countryCode: "BDI",
    countryName: "Burundi",
    flagEmoji: "🇧🇮",
    flagEmojiUnicode: "U+1F1E7 U+1F1EE"
  },
  {
    id: "6f1ecb67-e55b-4fa6-b963-d6ee2bd656fd",
    currencyString: "KHR",
    conversionRateToPoints: 100,
    countryCode: "KHM",
    countryName: "Cambodia",
    flagEmoji: "🇰🇭",
    flagEmojiUnicode: "U+1F1F0 U+1F1ED"
  },
  {
    id: "200f70ec-a64c-4f67-b591-e2c6bf9d24a9",
    currencyString: "XAF",
    conversionRateToPoints: 1,
    countryCode: "CMR",
    countryName: "Cameroon",
    flagEmoji: "🇨🇲",
    flagEmojiUnicode: "U+1F1E8 U+1F1F2"
  },
  {
    id: "4c3b3875-e5ad-4551-84d9-bdbe8b18fa27",
    currencyString: "CAD",
    conversionRateToPoints: 100,
    countryCode: "CAN",
    countryName: "Canada",
    flagEmoji: "🇨🇦",
    flagEmojiUnicode: "U+1F1E8 U+1F1E6"
  },
  {
    id: "91393197-b96c-4122-b092-ddb1079bac4b",
    currencyString: "CVE",
    conversionRateToPoints: 100,
    countryCode: "CPV",
    countryName: "Cape Verde",
    flagEmoji: "🇨🇻",
    flagEmojiUnicode: "U+1F1E8 U+1F1FB"
  },
  {
    id: "ad200841-520f-4111-ad8a-eb2e828b81ee",
    currencyString: "KYD",
    conversionRateToPoints: 100,
    countryCode: "CYM",
    countryName: "Cayman Islands",
    flagEmoji: "🇰🇾",
    flagEmojiUnicode: "U+1F1F0 U+1F1FE"
  },
  {
    id: "e0df6e28-71ee-4e16-884a-1912010f7e63",
    currencyString: "XAF",
    conversionRateToPoints: 1,
    countryCode: "CAF",
    countryName: "Central African Republic",
    flagEmoji: "🇨🇫",
    flagEmojiUnicode: "U+1F1E8 U+1F1EB"
  },
  {
    id: "6b5a5fe8-fa37-4f96-8f53-f5711fe2389f",
    currencyString: "XAF",
    conversionRateToPoints: 1,
    countryCode: "TCD",
    countryName: "Chad",
    flagEmoji: "🇹🇩",
    flagEmojiUnicode: "U+1F1F9 U+1F1E9"
  },
  {
    id: "d0ff5597-d9e8-407a-988b-844d93fb9662",
    currencyString: "CLP",
    conversionRateToPoints: 1,
    countryCode: "CHL",
    countryName: "Chile",
    flagEmoji: "🇨🇱",
    flagEmojiUnicode: "U+1F1E8 U+1F1F1"
  },
  {
    id: "61e52003-b970-41cc-b1a4-2cee8bd56585",
    currencyString: "CNY",
    conversionRateToPoints: 100,
    countryCode: "CHN",
    countryName: "China",
    flagEmoji: "🇨🇳",
    flagEmojiUnicode: "U+1F1E8 U+1F1F3"
  },
  {
    id: "3abcd10d-5798-4884-9fb5-75b99145a0ab",
    currencyString: "AUD",
    conversionRateToPoints: 100,
    countryCode: "CXR",
    countryName: "Christmas Island",
    flagEmoji: "🇨🇽",
    flagEmojiUnicode: "U+1F1E8 U+1F1FD"
  },
  {
    id: "c6ba4858-be79-480c-bf66-862e1769a112",
    currencyString: "AUD",
    conversionRateToPoints: 100,
    countryCode: "CCK",
    countryName: "Cocos Islands",
    flagEmoji: "🇨🇨",
    flagEmojiUnicode: "U+1F1E8 U+1F1E8"
  },
  {
    id: "324427ec-2e09-4346-8db3-bdb45c9c59c3",
    currencyString: "COP",
    conversionRateToPoints: 1,
    countryCode: "COL",
    countryName: "Colombia",
    flagEmoji: "🇨🇴",
    flagEmojiUnicode: "U+1F1E8 U+1F1F4"
  },
  {
    id: "c199f73e-8a36-406c-b2e1-954c87cca371",
    currencyString: "KMF",
    conversionRateToPoints: 1,
    countryCode: "COM",
    countryName: "Comoros",
    flagEmoji: "🇰🇲",
    flagEmojiUnicode: "U+1F1F0 U+1F1F2"
  },
  {
    id: "fa77f81c-5cf0-4bfb-bb39-e85d35c1600e",
    currencyString: "NZD",
    conversionRateToPoints: 100,
    countryCode: "COK",
    countryName: "Cook Islands",
    flagEmoji: "🇨🇰",
    flagEmojiUnicode: "U+1F1E8 U+1F1F0"
  },
  {
    id: "c0aad3cf-16a1-452a-acbd-86ccfa3b4c8a",
    currencyString: "CRC",
    conversionRateToPoints: 1,
    countryCode: "CRI",
    countryName: "Costa Rica",
    flagEmoji: "🇨🇷",
    flagEmojiUnicode: "U+1F1E8 U+1F1F7"
  },
  {
    id: "ccdddb74-a457-41f1-9dfd-bf6d67909269",
    currencyString: "HRK",
    conversionRateToPoints: 100,
    countryCode: "HRV",
    countryName: "Croatia",
    flagEmoji: "🇭🇷",
    flagEmojiUnicode: "U+1F1ED U+1F1F7"
  },
  {
    id: "52232a98-0b2b-49c4-a9b5-9a20e3399669",
    currencyString: "CUP",
    conversionRateToPoints: 100,
    countryCode: "CUB",
    countryName: "Cuba",
    flagEmoji: "🇨🇺",
    flagEmojiUnicode: "U+1F1E8 U+1F1FA"
  },
  {
    id: "7c7c8e37-4b55-48f3-856d-129545e8353a",
    currencyString: "ANG",
    conversionRateToPoints: 100,
    countryCode: "CUW",
    countryName: "Curacao",
    flagEmoji: "🇨🇼",
    flagEmojiUnicode: "U+1F1E8 U+1F1FC"
  },
  {
    id: "2247c05b-0cf7-4dc8-8815-9fa656999d4f",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "CYP",
    countryName: "Cyprus",
    flagEmoji: "🇨🇾",
    flagEmojiUnicode: "U+1F1E8 U+1F1FE"
  },
  {
    id: "590c7e73-f6ae-4dc6-a5ef-08e893c49fa8",
    currencyString: "CZK",
    conversionRateToPoints: 100,
    countryCode: "CZE",
    countryName: "Czech Republic",
    flagEmoji: "🇨🇿",
    flagEmojiUnicode: "U+1F1E8 U+1F1FF"
  },
  {
    id: "5bae4724-7fc3-4619-a3f6-401104cf5e83",
    currencyString: "CDF",
    conversionRateToPoints: 100,
    countryCode: "COD",
    countryName: "Democratic Republic of the Congo",
    flagEmoji: "🇨🇩",
    flagEmojiUnicode: "U+1F1E8 U+1F1E9"
  },
  {
    id: "9da49bc8-9cb7-43aa-af8c-2b33f4a37e45",
    currencyString: "DKK",
    conversionRateToPoints: 100,
    countryCode: "DNK",
    countryName: "Denmark",
    flagEmoji: "🇩🇰",
    flagEmojiUnicode: "U+1F1E9 U+1F1F0"
  },
  {
    id: "d060d76e-5f95-451d-8fd8-9b86c843004e",
    currencyString: "DJF",
    conversionRateToPoints: 1,
    countryCode: "DJI",
    countryName: "Djibouti",
    flagEmoji: "🇩🇯",
    flagEmojiUnicode: "U+1F1E9 U+1F1EF"
  },
  {
    id: "6cebe111-fa99-4ba9-a085-3e1534cbc2ce",
    currencyString: "XCD",
    conversionRateToPoints: 100,
    countryCode: "DMA",
    countryName: "Dominica",
    flagEmoji: "🇩🇲",
    flagEmojiUnicode: "U+1F1E9 U+1F1F2"
  },
  {
    id: "c8f985bf-17cd-4177-987d-b6826e27fee9",
    currencyString: "DOP",
    conversionRateToPoints: 100,
    countryCode: "DOM",
    countryName: "Dominican Republic",
    flagEmoji: "🇩🇴",
    flagEmojiUnicode: "U+1F1E9 U+1F1F4"
  },
  {
    id: "74c31636-3b5b-4099-a933-b965590e3e03",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "TLS",
    countryName: "East Timor",
    flagEmoji: "🇹🇱",
    flagEmojiUnicode: "U+1F1F9 U+1F1F1"
  },
  {
    id: "cab36a87-d60e-4fff-97e9-655bd0026ed4",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "ECU",
    countryName: "Ecuador",
    flagEmoji: "🇪🇨",
    flagEmojiUnicode: "U+1F1EA U+1F1E8"
  },
  {
    id: "528963b9-3e4b-4f44-8f39-97840194e681",
    currencyString: "EGP",
    conversionRateToPoints: 100,
    countryCode: "EGY",
    countryName: "Egypt",
    flagEmoji: "🇪🇬",
    flagEmojiUnicode: "U+1F1EA U+1F1EC"
  },
  {
    id: "9c9dd2fd-4815-4408-8b22-620ea7a4b290",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "SLV",
    countryName: "El Salvador",
    flagEmoji: "🇸🇻",
    flagEmojiUnicode: "U+1F1F8 U+1F1FB"
  },
  {
    id: "b8fee8df-7ad0-492f-9eb0-c3093ddb6105",
    currencyString: "XAF",
    conversionRateToPoints: 1,
    countryCode: "GNQ",
    countryName: "Equatorial Guinea",
    flagEmoji: "🇬🇶",
    flagEmojiUnicode: "U+1F1EC U+1F1F6"
  },
  {
    id: "d8b5069b-ee34-4117-8440-2ab74c6d7d43",
    currencyString: "ERN",
    conversionRateToPoints: 100,
    countryCode: "ERI",
    countryName: "Eritrea",
    flagEmoji: "🇪🇷",
    flagEmojiUnicode: "U+1F1EA U+1F1F7"
  },
  {
    id: "1b1a421a-f843-4772-a4c3-e6e253a9aa53",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "EST",
    countryName: "Estonia",
    flagEmoji: "🇪🇪",
    flagEmojiUnicode: "U+1F1EA U+1F1EA"
  },
  {
    id: "50e96b61-7957-4150-938a-39034847426b",
    currencyString: "ETB",
    conversionRateToPoints: 100,
    countryCode: "ETH",
    countryName: "Ethiopia",
    flagEmoji: "🇪🇹",
    flagEmojiUnicode: "U+1F1EA U+1F1F9"
  },
  {
    id: "1c2d4ebe-3e39-4448-8c33-3e97ac5f985e",
    currencyString: "FKP",
    conversionRateToPoints: 100,
    countryCode: "FLK",
    countryName: "Falkland Islands",
    flagEmoji: "🇫🇰",
    flagEmojiUnicode: "U+1F1EB U+1F1F0"
  },
  {
    id: "52699dc1-a1c9-4dba-b046-d2bdd9dfb744",
    currencyString: "DKK",
    conversionRateToPoints: 100,
    countryCode: "FRO",
    countryName: "Faroe Islands",
    flagEmoji: "🇫🇴",
    flagEmojiUnicode: "U+1F1EB U+1F1F4"
  },
  {
    id: "941607b5-3ec2-4694-8b23-da9979533873",
    currencyString: "FJD",
    conversionRateToPoints: 100,
    countryCode: "FJI",
    countryName: "Fiji",
    flagEmoji: "🇫🇯",
    flagEmojiUnicode: "U+1F1EB U+1F1EF"
  },
  {
    id: "3f9b33e4-75a6-480f-9a98-ab6c0eb5f24f",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "FIN",
    countryName: "Finland",
    flagEmoji: "🇫🇮",
    flagEmojiUnicode: "U+1F1EB U+1F1EE"
  },
  {
    id: "e988a545-00b9-4a37-8a70-17334f2941d9",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "FRA",
    countryName: "France",
    flagEmoji: "🇫🇷",
    flagEmojiUnicode: "U+1F1EB U+1F1F7"
  },
  {
    id: "0de54373-c14e-4da7-8358-3640998efbd0",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "GUF",
    countryName: "French Guiana",
    flagEmoji: "🇬🇫",
    flagEmojiUnicode: "U+1F1EC U+1F1EB"
  },
  {
    id: "25ce1339-6bc6-4ced-b19b-d9f8f8768a50",
    currencyString: "XPF",
    conversionRateToPoints: 1,
    countryCode: "PYF",
    countryName: "French Polynesia",
    flagEmoji: "🇵🇫",
    flagEmojiUnicode: "U+1F1F5 U+1F1EB"
  },
  {
    id: "672c5438-aed6-4865-815b-fb91a26596e4",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "ATF",
    countryName: "French Southern Territories",
    flagEmoji: "🇹🇫",
    flagEmojiUnicode: "U+1F1F9 U+1F1EB"
  },
  {
    id: "2840ab26-9b40-4c8c-aa90-4877f8688a31",
    currencyString: "XAF",
    conversionRateToPoints: 1,
    countryCode: "GAB",
    countryName: "Gabon",
    flagEmoji: "🇬🇦",
    flagEmojiUnicode: "U+1F1EC U+1F1E6"
  },
  {
    id: "231b9945-b202-4946-8f7b-d218e893a15c",
    currencyString: "GMD",
    conversionRateToPoints: 100,
    countryCode: "GMB",
    countryName: "Gambia",
    flagEmoji: "🇬🇲",
    flagEmojiUnicode: "U+1F1EC U+1F1F2"
  },
  {
    id: "059eed2d-0c92-48ac-a07e-373d2fce15d7",
    currencyString: "GEL",
    conversionRateToPoints: 100,
    countryCode: "GEO",
    countryName: "Georgia",
    flagEmoji: "🇬🇪",
    flagEmojiUnicode: "U+1F1EC U+1F1EA"
  },
  {
    id: "6720e96b-cf67-4e39-8448-888759e66258",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "DEU",
    countryName: "Germany",
    flagEmoji: "🇩🇪",
    flagEmojiUnicode: "U+1F1E9 U+1F1EA"
  },
  {
    id: "5183914e-1b16-4560-9379-6892eaf284bc",
    currencyString: "GHS",
    conversionRateToPoints: 100,
    countryCode: "GHA",
    countryName: "Ghana",
    flagEmoji: "🇬🇭",
    flagEmojiUnicode: "U+1F1EC U+1F1ED"
  },
  {
    id: "74e53e31-b7fa-4b9e-8412-001c9bffcc75",
    currencyString: "GIP",
    conversionRateToPoints: 100,
    countryCode: "GIB",
    countryName: "Gibraltar",
    flagEmoji: "🇬🇮",
    flagEmojiUnicode: "U+1F1EC U+1F1EE"
  },
  {
    id: "9128d7fb-7393-43aa-b1fc-44a30b5674b6",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "GRC",
    countryName: "Greece",
    flagEmoji: "🇬🇷",
    flagEmojiUnicode: "U+1F1EC U+1F1F7"
  },
  {
    id: "6dd9767b-8c12-419f-bf29-5f7350c0f5ba",
    currencyString: "DKK",
    conversionRateToPoints: 100,
    countryCode: "GRL",
    countryName: "Greenland",
    flagEmoji: "🇬🇱",
    flagEmojiUnicode: "U+1F1EC U+1F1F1"
  },
  {
    id: "e7e23c55-474c-426d-9b4e-94115239342a",
    currencyString: "XCD",
    conversionRateToPoints: 100,
    countryCode: "GRD",
    countryName: "Grenada",
    flagEmoji: "🇬🇩",
    flagEmojiUnicode: "U+1F1EC U+1F1E9"
  },
  {
    id: "2e70159c-1097-4903-8c81-3235c04b0cf0",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "GLP",
    countryName: "Guadeloupe",
    flagEmoji: "🇬🇵",
    flagEmojiUnicode: "U+1F1EC U+1F1F5"
  },
  {
    id: "1c674a06-b463-43e5-b3ff-7bdf67737a67",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "GUM",
    countryName: "Guam",
    flagEmoji: "🇬🇺",
    flagEmojiUnicode: "U+1F1EC U+1F1FA"
  },
  {
    id: "9b359326-35a0-414b-9904-826326253bdc",
    currencyString: "GTQ",
    conversionRateToPoints: 100,
    countryCode: "GTM",
    countryName: "Guatemala",
    flagEmoji: "🇬🇹",
    flagEmojiUnicode: "U+1F1EC U+1F1F9"
  },
  {
    id: "0e71550e-37a3-4d97-9a42-f731cb4eab4a",
    currencyString: "GBP",
    conversionRateToPoints: 100,
    countryCode: "GGY",
    countryName: "Guernsey",
    flagEmoji: "🇬🇬",
    flagEmojiUnicode: "U+1F1EC U+1F1EC"
  },
  {
    id: "d8de1c75-e5b7-4a34-b2e0-ed50a96c6f6a",
    currencyString: "GNF",
    conversionRateToPoints: 1,
    countryCode: "GIN",
    countryName: "Guinea",
    flagEmoji: "🇬🇳",
    flagEmojiUnicode: "U+1F1EC U+1F1F3"
  },
  {
    id: "3671dae6-0b62-4e18-8f63-cf8e3669cb62",
    currencyString: "XOF",
    conversionRateToPoints: 1,
    countryCode: "GNB",
    countryName: "Guinea-Bissau",
    flagEmoji: "🇬🇼",
    flagEmojiUnicode: "U+1F1EC U+1F1FC"
  },
  {
    id: "1c82ac14-4b22-47bc-968a-725ad07ab0c6",
    currencyString: "GYD",
    conversionRateToPoints: 100,
    countryCode: "GUY",
    countryName: "Guyana",
    flagEmoji: "🇬🇾",
    flagEmojiUnicode: "U+1F1EC U+1F1FE"
  },
  {
    id: "679f6cb4-892d-444c-81c8-413c8627bc48",
    currencyString: "HTG",
    conversionRateToPoints: 100,
    countryCode: "HTI",
    countryName: "Haiti",
    flagEmoji: "🇭🇹",
    flagEmojiUnicode: "U+1F1ED U+1F1F9"
  },
  {
    id: "3d4d061f-bdeb-4b2a-bd6f-0563a6568691",
    currencyString: "AUD",
    conversionRateToPoints: 100,
    countryCode: "HMD",
    countryName: "Heard Island and McDonald Islands",
    flagEmoji: "🇭🇲",
    flagEmojiUnicode: "U+1F1ED U+1F1F2"
  },
  {
    id: "bab3d58e-d286-491c-b83b-f6e83e07d251",
    currencyString: "HNL",
    conversionRateToPoints: 100,
    countryCode: "HND",
    countryName: "Honduras",
    flagEmoji: "🇭🇳",
    flagEmojiUnicode: "U+1F1ED U+1F1F3"
  },
  {
    id: "fc35d3d5-c0b8-496d-a8b3-ed88fc281379",
    currencyString: "HKD",
    conversionRateToPoints: 100,
    countryCode: "HKG",
    countryName: "Hong Kong",
    flagEmoji: "🇭🇰",
    flagEmojiUnicode: "U+1F1ED U+1F1F0"
  },
  {
    id: "7c02c52b-bc78-4f4b-8a07-fb3042eefa1d",
    currencyString: "HUF",
    conversionRateToPoints: 1,
    countryCode: "HUN",
    countryName: "Hungary",
    flagEmoji: "🇭🇺",
    flagEmojiUnicode: "U+1F1ED U+1F1FA"
  },
  {
    id: "13e49960-eacd-49d7-b0a8-c9f0ea89023b",
    currencyString: "ISK",
    conversionRateToPoints: 1,
    countryCode: "ISL",
    countryName: "Iceland",
    flagEmoji: "🇮🇸",
    flagEmojiUnicode: "U+1F1EE U+1F1F8"
  },
  {
    id: "4b5f74e9-37fc-4f1d-b2fc-ddca7269d19d",
    currencyString: "INR",
    conversionRateToPoints: 100,
    countryCode: "IND",
    countryName: "India",
    flagEmoji: "🇮🇳",
    flagEmojiUnicode: "U+1F1EE U+1F1F3",
    hasGiftCards: true
  },
  {
    id: "4add9800-f722-4dc2-afee-5876231f8d2b",
    currencyString: "IDR",
    conversionRateToPoints: 1,
    countryCode: "IDN",
    countryName: "Indonesia",
    flagEmoji: "🇮🇩",
    flagEmojiUnicode: "U+1F1EE U+1F1E9"
  },
  {
    id: "6033d656-4964-43f7-b738-7320659a7db9",
    currencyString: "IRR",
    conversionRateToPoints: 1,
    countryCode: "IRN",
    countryName: "Iran",
    flagEmoji: "🇮🇷",
    flagEmojiUnicode: "U+1F1EE U+1F1F7"
  },
  {
    id: "6f40e972-43e0-486e-abc6-a3a751a69a0c",
    currencyString: "IQD",
    conversionRateToPoints: 1,
    countryCode: "IRQ",
    countryName: "Iraq",
    flagEmoji: "🇮🇶",
    flagEmojiUnicode: "U+1F1EE U+1F1F6"
  },
  {
    id: "ec526ef2-f02a-4be4-b41c-472fc985032b",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "IRL",
    countryName: "Ireland",
    flagEmoji: "🇮🇪",
    flagEmojiUnicode: "U+1F1EE U+1F1EA"
  },
  {
    id: "82d9dd85-9f1c-402e-a1ac-665b5058ca91",
    currencyString: "GBP",
    conversionRateToPoints: 100,
    countryCode: "IMN",
    countryName: "Isle of Man",
    flagEmoji: "🇮🇲",
    flagEmojiUnicode: "U+1F1EE U+1F1F2"
  },
  {
    id: "609487c9-5357-4a05-9c9f-ab7971a77d0c",
    currencyString: "ILS",
    conversionRateToPoints: 100,
    countryCode: "ISR",
    countryName: "Israel",
    flagEmoji: "🇮🇱",
    flagEmojiUnicode: "U+1F1EE U+1F1F1"
  },
  {
    id: "b90867df-8d1d-4df9-b57c-89fb0a9f9503",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "ITA",
    countryName: "Italy",
    flagEmoji: "🇮🇹",
    flagEmojiUnicode: "U+1F1EE U+1F1F9"
  },
  {
    id: "78107303-52aa-4739-b24c-b1d553252cc0",
    currencyString: "XOF",
    conversionRateToPoints: 1,
    countryCode: "CIV",
    countryName: "Ivory Coast",
    flagEmoji: "🇨🇮",
    flagEmojiUnicode: "U+1F1E8 U+1F1EE"
  },
  {
    id: "ba60f090-57e7-464c-8ec5-6094253ed07a",
    currencyString: "JMD",
    conversionRateToPoints: 100,
    countryCode: "JAM",
    countryName: "Jamaica",
    flagEmoji: "🇯🇲",
    flagEmojiUnicode: "U+1F1EF U+1F1F2"
  },
  {
    id: "e6293c1c-fd4f-4da2-8ba6-28757f414008",
    currencyString: "JPY",
    conversionRateToPoints: 1,
    countryCode: "JPN",
    countryName: "Japan",
    flagEmoji: "🇯🇵",
    flagEmojiUnicode: "U+1F1EF U+1F1F5"
  },
  {
    id: "77643353-7b7c-48d3-9684-ae4460d36db3",
    currencyString: "GBP",
    conversionRateToPoints: 100,
    countryCode: "JEY",
    countryName: "Jersey",
    flagEmoji: "🇯🇪",
    flagEmojiUnicode: "U+1F1EF U+1F1EA"
  },
  {
    id: "103d9757-51f8-4078-bff0-4d8949e537de",
    currencyString: "JOD",
    conversionRateToPoints: 1000,
    countryCode: "JOR",
    countryName: "Jordan",
    flagEmoji: "🇯🇴",
    flagEmojiUnicode: "U+1F1EF U+1F1F4"
  },
  {
    id: "fd27e02d-7654-443a-b62d-3745fe7223de",
    currencyString: "KZT",
    conversionRateToPoints: 100,
    countryCode: "KAZ",
    countryName: "Kazakhstan",
    flagEmoji: "🇰🇿",
    flagEmojiUnicode: "U+1F1F0 U+1F1FF"
  },
  {
    id: "319aecd3-4063-40a7-a5c9-8585a82c6b88",
    currencyString: "KES",
    conversionRateToPoints: 100,
    countryCode: "KEN",
    countryName: "Kenya",
    flagEmoji: "🇰🇪",
    flagEmojiUnicode: "U+1F1F0 U+1F1EA"
  },
  {
    id: "526eb42e-91aa-4142-bcf4-83d1a48baff7",
    currencyString: "AUD",
    conversionRateToPoints: 100,
    countryCode: "KIR",
    countryName: "Kiribati",
    flagEmoji: "🇰🇮",
    flagEmojiUnicode: "U+1F1F0 U+1F1EE"
  },
  {
    id: "2a133c10-1236-436b-a676-83668716732f",
    currencyString: "KWD",
    conversionRateToPoints: 1000,
    countryCode: "KWT",
    countryName: "Kuwait",
    flagEmoji: "🇰🇼",
    flagEmojiUnicode: "U+1F1F0 U+1F1FC"
  },
  {
    id: "cfad0971-6056-42dd-a91e-56f2273d95b8",
    currencyString: "KGS",
    conversionRateToPoints: 100,
    countryCode: "KGZ",
    countryName: "Kyrgyzstan",
    flagEmoji: "🇰🇬",
    flagEmojiUnicode: "U+1F1F0 U+1F1EC"
  },
  {
    id: "158c4885-ce49-45ee-a7b1-91c3f58abcdc",
    currencyString: "LAK",
    conversionRateToPoints: 100,
    countryCode: "LAO",
    countryName: "Laos",
    flagEmoji: "🇱🇦",
    flagEmojiUnicode: "U+1F1F1 U+1F1E6"
  },
  {
    id: "c6fb108e-ac9f-43ec-8b2a-8e11bfb9e241",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "LVA",
    countryName: "Latvia",
    flagEmoji: "🇱🇻",
    flagEmojiUnicode: "U+1F1F1 U+1F1FB"
  },
  {
    id: "2f9e1a83-a6cc-40b0-9713-85fc912be9c6",
    currencyString: "LBP",
    conversionRateToPoints: 1,
    countryCode: "LBN",
    countryName: "Lebanon",
    flagEmoji: "🇱🇧",
    flagEmojiUnicode: "U+1F1F1 U+1F1E7"
  },
  {
    id: "bcd10641-11e2-495a-a4d4-69938ddc63b6",
    currencyString: "LSL",
    conversionRateToPoints: 100,
    countryCode: "LSO",
    countryName: "Lesotho",
    flagEmoji: "🇱🇸",
    flagEmojiUnicode: "U+1F1F1 U+1F1F8"
  },
  {
    id: "5a3ba922-dbf6-4985-8635-29780aaafde6",
    currencyString: "LRD",
    conversionRateToPoints: 100,
    countryCode: "LBR",
    countryName: "Liberia",
    flagEmoji: "🇱🇷",
    flagEmojiUnicode: "U+1F1F1 U+1F1F7"
  },
  {
    id: "9867571b-62d2-42f6-9cc4-68e21fee2ef6",
    currencyString: "LYD",
    conversionRateToPoints: 1000,
    countryCode: "LBY",
    countryName: "Libya",
    flagEmoji: "🇱🇾",
    flagEmojiUnicode: "U+1F1F1 U+1F1FE"
  },
  {
    id: "d891fca0-c299-4dac-89b4-47b975fefd4b",
    currencyString: "CHF",
    conversionRateToPoints: 100,
    countryCode: "LIE",
    countryName: "Liechtenstein",
    flagEmoji: "🇱🇮",
    flagEmojiUnicode: "U+1F1F1 U+1F1EE"
  },
  {
    id: "4819a885-99ff-4404-b97d-c9f5c13642e5",
    currencyString: "LTL",
    conversionRateToPoints: 100,
    countryCode: "LTU",
    countryName: "Lithuania",
    flagEmoji: "🇱🇹",
    flagEmojiUnicode: "U+1F1F1 U+1F1F9"
  },
  {
    id: "ccf92e9b-13d8-43ae-9967-364354ae8f72",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "LUX",
    countryName: "Luxembourg",
    flagEmoji: "🇱🇺",
    flagEmojiUnicode: "U+1F1F1 U+1F1FA"
  },
  {
    id: "48805e6b-c70f-4fbe-aa9a-64c791a1742b",
    currencyString: "MOP",
    conversionRateToPoints: 100,
    countryCode: "MAC",
    countryName: "Macao",
    flagEmoji: "🇲🇴",
    flagEmojiUnicode: "U+1F1F2 U+1F1F4"
  },
  {
    id: "61a98860-5d47-4965-ab2b-71e9b640cad3",
    currencyString: "MKD",
    conversionRateToPoints: 100,
    countryCode: "MKD",
    countryName: "Macedonia",
    flagEmoji: "🇲🇰",
    flagEmojiUnicode: "U+1F1F2 U+1F1F0"
  },
  {
    id: "8822d904-5141-47a2-8f12-d78c00e40402",
    currencyString: "MGA",
    conversionRateToPoints: 1,
    countryCode: "MDG",
    countryName: "Madagascar",
    flagEmoji: "🇲🇬",
    flagEmojiUnicode: "U+1F1F2 U+1F1EC"
  },
  {
    id: "b464ba83-1261-43d1-91c0-006c32bc619b",
    currencyString: "MWK",
    conversionRateToPoints: 100,
    countryCode: "MWI",
    countryName: "Malawi",
    flagEmoji: "🇲🇼",
    flagEmojiUnicode: "U+1F1F2 U+1F1FC"
  },
  {
    id: "374dd2cb-aca8-486e-8ce9-f73c3bd62126",
    currencyString: "MYR",
    conversionRateToPoints: 100,
    countryCode: "MYS",
    countryName: "Malaysia",
    flagEmoji: "🇲🇾",
    flagEmojiUnicode: "U+1F1F2 U+1F1FE"
  },
  {
    id: "46ae3709-87db-489f-af18-749c273dd26a",
    currencyString: "MVR",
    conversionRateToPoints: 100,
    countryCode: "MDV",
    countryName: "Maldives",
    flagEmoji: "🇲🇻",
    flagEmojiUnicode: "U+1F1F2 U+1F1FB"
  },
  {
    id: "c5e0bad1-b6e8-402d-9be1-9ba202445e3a",
    currencyString: "XOF",
    conversionRateToPoints: 1,
    countryCode: "MLI",
    countryName: "Mali",
    flagEmoji: "🇲🇱",
    flagEmojiUnicode: "U+1F1F2 U+1F1F1"
  },
  {
    id: "0721c1d7-aeee-47de-ac2c-478b17af8800",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "MLT",
    countryName: "Malta",
    flagEmoji: "🇲🇹",
    flagEmojiUnicode: "U+1F1F2 U+1F1F9"
  },
  {
    id: "cbe97851-745e-4652-a8c9-2749856022bc",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "MHL",
    countryName: "Marshall Islands",
    flagEmoji: "🇲🇭",
    flagEmojiUnicode: "U+1F1F2 U+1F1ED"
  },
  {
    id: "f185a700-51a6-4c5a-84ea-d2290797c5f4",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "MTQ",
    countryName: "Martinique",
    flagEmoji: "🇲🇶",
    flagEmojiUnicode: "U+1F1F2 U+1F1F6"
  },
  {
    id: "44675908-165c-4f9b-a4c1-99b9e95b78b9",
    currencyString: "MRO",
    conversionRateToPoints: 1,
    countryCode: "MRT",
    countryName: "Mauritania",
    flagEmoji: "🇲🇷",
    flagEmojiUnicode: "U+1F1F2 U+1F1F7"
  },
  {
    id: "294b4e6f-64ad-410d-b562-f8214a71eaa3",
    currencyString: "MUR",
    conversionRateToPoints: 1,
    countryCode: "MUS",
    countryName: "Mauritius",
    flagEmoji: "🇲🇺",
    flagEmojiUnicode: "U+1F1F2 U+1F1FA"
  },
  {
    id: "d6be0033-7b12-4ce6-8d7d-6bfdeedd4dcb",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "MYT",
    countryName: "Mayotte",
    flagEmoji: "🇾🇹",
    flagEmojiUnicode: "U+1F1FE U+1F1F9"
  },
  {
    id: "0268e718-8f26-4d29-8955-6fa96784bfb4",
    currencyString: "MXN",
    conversionRateToPoints: 100,
    countryCode: "MEX",
    countryName: "Mexico",
    flagEmoji: "🇲🇽",
    flagEmojiUnicode: "U+1F1F2 U+1F1FD",
    hasGiftCards: true
  },
  {
    id: "6be58265-6f37-4aae-85bb-cfcef1ee024f",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "FSM",
    countryName: "Micronesia",
    flagEmoji: "🇫🇲",
    flagEmojiUnicode: "U+1F1EB U+1F1F2"
  },
  {
    id: "051e95e3-5433-4d95-b513-3b27791264cb",
    currencyString: "MDL",
    conversionRateToPoints: 100,
    countryCode: "MDA",
    countryName: "Moldova",
    flagEmoji: "🇲🇩",
    flagEmojiUnicode: "U+1F1F2 U+1F1E9"
  },
  {
    id: "ad42b345-c24c-4ba8-a7b0-c26262dbc32b",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "MCO",
    countryName: "Monaco",
    flagEmoji: "🇲🇨",
    flagEmojiUnicode: "U+1F1F2 U+1F1E8"
  },
  {
    id: "f54c07fc-bf9c-4b0a-8d6d-8d896a27cc32",
    currencyString: "MNT",
    conversionRateToPoints: 100,
    countryCode: "MNG",
    countryName: "Mongolia",
    flagEmoji: "🇲🇳",
    flagEmojiUnicode: "U+1F1F2 U+1F1F3"
  },
  {
    id: "8a7aa32e-6cc0-4ff9-809d-b2f4a826829d",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "MNE",
    countryName: "Montenegro",
    flagEmoji: "🇲🇪",
    flagEmojiUnicode: "U+1F1F2 U+1F1EA"
  },
  {
    id: "483f4276-72c3-4415-8833-d4797a15b1f0",
    currencyString: "XCD",
    conversionRateToPoints: 100,
    countryCode: "MSR",
    countryName: "Montserrat",
    flagEmoji: "🇲🇸",
    flagEmojiUnicode: "U+1F1F2 U+1F1F8"
  },
  {
    id: "3d5a96b9-493e-4ba5-a8a4-d88cd0f7ab81",
    currencyString: "MAD",
    conversionRateToPoints: 100,
    countryCode: "MAR",
    countryName: "Morocco",
    flagEmoji: "🇲🇦",
    flagEmojiUnicode: "U+1F1F2 U+1F1E6"
  },
  {
    id: "cc98c84c-b83e-4d3c-80b9-5552b3490fa8",
    currencyString: "MZN",
    conversionRateToPoints: 100,
    countryCode: "MOZ",
    countryName: "Mozambique",
    flagEmoji: "🇲🇿",
    flagEmojiUnicode: "U+1F1F2 U+1F1FF"
  },
  {
    id: "0a880f24-fe98-4cf5-a194-a5f8163d9bde",
    currencyString: "MMK",
    conversionRateToPoints: 1,
    countryCode: "MMR",
    countryName: "Myanmar",
    flagEmoji: "🇲🇲",
    flagEmojiUnicode: "U+1F1F2 U+1F1F2"
  },
  {
    id: "09ff8f98-ad86-4535-ae0b-6329e1c33c1e",
    currencyString: "NAD",
    conversionRateToPoints: 100,
    countryCode: "NAM",
    countryName: "Namibia",
    flagEmoji: "🇳🇦",
    flagEmojiUnicode: "U+1F1F3 U+1F1E6"
  },
  {
    id: "360dcc1c-a0de-4d29-84c4-73233bc5a8c5",
    currencyString: "AUD",
    conversionRateToPoints: 100,
    countryCode: "NRU",
    countryName: "Nauru",
    flagEmoji: "🇳🇷",
    flagEmojiUnicode: "U+1F1F3 U+1F1F7"
  },
  {
    id: "37d03064-9d0c-4c5d-9111-e1f3f979d032",
    currencyString: "NPR",
    conversionRateToPoints: 100,
    countryCode: "NPL",
    countryName: "Nepal",
    flagEmoji: "🇳🇵",
    flagEmojiUnicode: "U+1F1F3 U+1F1F5"
  },
  {
    id: "4a78d813-4075-476d-a0b8-c87f1259c13e",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "NLD",
    countryName: "Netherlands",
    flagEmoji: "🇳🇱",
    flagEmojiUnicode: "U+1F1F3 U+1F1F1"
  },
  {
    id: "466ac1e8-f83c-4d0a-a1ff-73bf7ed635f0",
    currencyString: "XPF",
    conversionRateToPoints: 1,
    countryCode: "NCL",
    countryName: "New Caledonia",
    flagEmoji: "🇳🇨",
    flagEmojiUnicode: "U+1F1F3 U+1F1E8"
  },
  {
    id: "8e08b725-38ef-4519-88b1-42299d0453e8",
    currencyString: "NZD",
    conversionRateToPoints: 100,
    countryCode: "NZL",
    countryName: "New Zealand",
    flagEmoji: "🇳🇿",
    flagEmojiUnicode: "U+1F1F3 U+1F1FF"
  },
  {
    id: "7481d36b-c488-4757-9546-9e875a23b9f5",
    currencyString: "NIO",
    conversionRateToPoints: 100,
    countryCode: "NIC",
    countryName: "Nicaragua",
    flagEmoji: "🇳🇮",
    flagEmojiUnicode: "U+1F1F3 U+1F1EE"
  },
  {
    id: "6db61eed-27cb-47ec-bc6f-778691580720",
    currencyString: "XOF",
    conversionRateToPoints: 1,
    countryCode: "NER",
    countryName: "Niger",
    flagEmoji: "🇳🇪",
    flagEmojiUnicode: "U+1F1F3 U+1F1EA"
  },
  {
    id: "34976eaf-e393-433f-9eb7-b43eefcc92fc",
    currencyString: "NGN",
    conversionRateToPoints: 100,
    countryCode: "NGA",
    countryName: "Nigeria",
    flagEmoji: "🇳🇬",
    flagEmojiUnicode: "U+1F1F3 U+1F1EC"
  },
  {
    id: "c99097b8-0f6f-4408-b07f-e1ed369bb7f8",
    currencyString: "NZD",
    conversionRateToPoints: 100,
    countryCode: "NIU",
    countryName: "Niue",
    flagEmoji: "🇳🇺",
    flagEmojiUnicode: "U+1F1F3 U+1F1FA"
  },
  {
    id: "5ea79c20-153d-4155-9c05-9fc74d064712",
    currencyString: "AUD",
    conversionRateToPoints: 100,
    countryCode: "NFK",
    countryName: "Norfolk Island",
    flagEmoji: "🇳🇫",
    flagEmojiUnicode: "U+1F1F3 U+1F1EB"
  },
  {
    id: "4e4d89d0-d495-45c6-93e8-48e5f22e066d",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "MNP",
    countryName: "Northern Mariana Islands",
    flagEmoji: "🇲🇵",
    flagEmojiUnicode: "U+1F1F2 U+1F1F5"
  },
  {
    id: "ae76873b-a22a-4b40-950f-84f79d260e96",
    currencyString: "KPW",
    conversionRateToPoints: 100,
    countryCode: "PRK",
    countryName: "North Korea",
    flagEmoji: "🇰🇵",
    flagEmojiUnicode: "U+1F1F0 U+1F1F5"
  },
  {
    id: "1ea43e4a-7e5d-406a-8bb8-140188f45d6a",
    currencyString: "NOK",
    conversionRateToPoints: 100,
    countryCode: "NOR",
    countryName: "Norway",
    flagEmoji: "🇳🇴",
    flagEmojiUnicode: "U+1F1F3 U+1F1F4"
  },
  {
    id: "1efcacae-8f4d-4352-9b00-5c9641a9e72f",
    currencyString: "OMR",
    conversionRateToPoints: 1000,
    countryCode: "OMN",
    countryName: "Oman",
    flagEmoji: "🇴🇲",
    flagEmojiUnicode: "U+1F1F4 U+1F1F2"
  },

  {
    id: "c7a021a9-59fb-4885-b2a5-218518c0b955",
    currencyString: "PKR",
    conversionRateToPoints: 1,
    countryCode: "PAK",
    countryName: "Pakistan",
    flagEmoji: "🇵🇰",
    flagEmojiUnicode: "U+1F1F5 U+1F1F0"
  },
  {
    id: "e444b2ad-b848-4fdb-a1a5-737d442d24ed",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "PLW",
    countryName: "Palau",
    flagEmoji: "🇵🇼",
    flagEmojiUnicode: "U+1F1F5 U+1F1FC"
  },
  {
    id: "ae304f40-7800-460c-b923-f3276d7baf39",
    currencyString: "ILS",
    conversionRateToPoints: 100,
    countryCode: "PSE",
    countryName: "Palestinian Territory",
    flagEmoji: "🇵🇸",
    flagEmojiUnicode: "U+1F1F5 U+1F1F8"
  },
  {
    id: "d41aae79-281c-41dd-b509-06fd13de44a8",
    currencyString: "PAB",
    conversionRateToPoints: 100,
    countryCode: "PAN",
    countryName: "Panama",
    flagEmoji: "🇵🇦",
    flagEmojiUnicode: "U+1F1F5 U+1F1E6"
  },
  {
    id: "5dcd9808-1860-4fe2-b8d6-cecc25b43671",
    currencyString: "PGK",
    conversionRateToPoints: 100,
    countryCode: "PNG",
    countryName: "Papua New Guinea",
    flagEmoji: "🇵🇬",
    flagEmojiUnicode: "U+1F1F5 U+1F1EC"
  },
  {
    id: "7bdee0b3-b652-4eff-9efd-0fafdac7ceab",
    currencyString: "PYG",
    conversionRateToPoints: 1,
    countryCode: "PRY",
    countryName: "Paraguay",
    flagEmoji: "🇵🇾",
    flagEmojiUnicode: "U+1F1F5 U+1F1FE"
  },
  {
    id: "b40f082b-cd99-4e9c-b750-67ec79281c3a",
    currencyString: "PEN",
    conversionRateToPoints: 100,
    countryCode: "PER",
    countryName: "Peru",
    flagEmoji: "🇵🇪",
    flagEmojiUnicode: "U+1F1F5 U+1F1EA"
  },
  {
    id: "0dde51e0-08aa-4e37-ae12-ad96c448853e",
    currencyString: "PHP",
    conversionRateToPoints: 100,
    countryCode: "PHL",
    countryName: "Philippines",
    flagEmoji: "🇵🇭",
    flagEmojiUnicode: "U+1F1F5 U+1F1ED"
  },
  {
    id: "86578a55-40f8-4764-b6a6-6fae6a9baa7d",
    currencyString: "NZD",
    conversionRateToPoints: 100,
    countryCode: "PCN",
    countryName: "Pitcairn",
    flagEmoji: "🇵🇳",
    flagEmojiUnicode: "U+1F1F5 U+1F1F3"
  },
  {
    id: "5c1a0f73-3625-4e8d-bd23-d0dfb0229d99",
    currencyString: "PLN",
    conversionRateToPoints: 100,
    countryCode: "POL",
    countryName: "Poland",
    flagEmoji: "🇵🇱",
    flagEmojiUnicode: "U+1F1F5 U+1F1F1"
  },
  {
    id: "2f8925ea-b3c3-412d-8f47-1b4314b1628d",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "PRT",
    countryName: "Portugal",
    flagEmoji: "🇵🇹",
    flagEmojiUnicode: "U+1F1F5 U+1F1F9"
  },
  {
    id: "29583764-2add-4420-a6b2-711ded70660e",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "PRI",
    countryName: "Puerto Rico",
    flagEmoji: "🇵🇷",
    flagEmojiUnicode: "U+1F1F5 U+1F1F7"
  },
  {
    id: "cba14df2-d949-427b-83b3-5e93073d1e8b",
    currencyString: "QAR",
    conversionRateToPoints: 100,
    countryCode: "QAT",
    countryName: "Qatar",
    flagEmoji: "🇶🇦",
    flagEmojiUnicode: "U+1F1F6 U+1F1E6"
  },
  {
    id: "336c93fb-2a19-4968-81aa-f01ac979232b",
    currencyString: "XAF",
    conversionRateToPoints: 1,
    countryCode: "COG",
    countryName: "Republic of the Congo",
    flagEmoji: "🇨🇬",
    flagEmojiUnicode: "U+1F1E8 U+1F1EC"
  },
  {
    id: "f721764d-a615-4bc7-a839-997c51e0ebd3",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "REU",
    countryName: "Reunion",
    flagEmoji: "🇷🇪",
    flagEmojiUnicode: "U+1F1F7 U+1F1EA"
  },
  {
    id: "5ca30d1d-3339-4773-9759-0d31fca62a8b",
    currencyString: "RON",
    conversionRateToPoints: 100,
    countryCode: "ROU",
    countryName: "Romania",
    flagEmoji: "🇷🇴",
    flagEmojiUnicode: "U+1F1F7 U+1F1F4"
  },
  {
    id: "ad57dee3-82e5-4024-b854-877baed70791",
    currencyString: "RUB",
    conversionRateToPoints: 100,
    countryCode: "RUS",
    countryName: "Russia",
    flagEmoji: "🇷🇺",
    flagEmojiUnicode: "U+1F1F7 U+1F1FA"
  },
  {
    id: "43327aec-511d-43de-a161-150dd89a45e8",
    currencyString: "RWF",
    conversionRateToPoints: 1,
    countryCode: "RWA",
    countryName: "Rwanda",
    flagEmoji: "🇷🇼",
    flagEmojiUnicode: "U+1F1F7 U+1F1FC"
  },
  {
    id: "889c3492-7f7b-4f8b-9f1f-67861bcebf16",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "BLM",
    countryName: "Saint Barthelemy",
    flagEmoji: "🇧🇱",
    flagEmojiUnicode: "U+1F1E7 U+1F1F1"
  },
  {
    id: "3929a128-8b72-4bf2-bb55-2b4b3ba641e2",
    currencyString: "SHP",
    conversionRateToPoints: 100,
    countryCode: "SHN",
    countryName: "Saint Helena",
    flagEmoji: "🇸🇭",
    flagEmojiUnicode: "U+1F1F8 U+1F1ED"
  },
  {
    id: "de584249-cdb3-49c0-9bc6-7db1738e7e67",
    currencyString: "XCD",
    conversionRateToPoints: 100,
    countryCode: "KNA",
    countryName: "Saint Kitts and Nevis",
    flagEmoji: "🇰🇳",
    flagEmojiUnicode: "U+1F1F0 U+1F1F3"
  },
  {
    id: "f7fe9d51-da8d-4139-a66f-57270fa59d92",
    currencyString: "XCD",
    conversionRateToPoints: 100,
    countryCode: "LCA",
    countryName: "Saint Lucia",
    flagEmoji: "🇱🇨",
    flagEmojiUnicode: "U+1F1F1 U+1F1E8"
  },
  {
    id: "cba83e09-299b-4a9b-8cc7-0425eec0a65a",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "MAF",
    countryName: "Saint Martin",
    flagEmoji: "🇲🇫",
    flagEmojiUnicode: "U+1F1F2 U+1F1EB"
  },
  {
    id: "6c2bd138-f017-4413-93c8-ad8ff0aa0491",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "SPM",
    countryName: "Saint Pierre and Miquelon",
    flagEmoji: "🇵🇲",
    flagEmojiUnicode: "U+1F1F5 U+1F1F2"
  },
  {
    id: "1db63716-178a-4943-85bc-7320d53180c6",
    currencyString: "XCD",
    conversionRateToPoints: 100,
    countryCode: "VCT",
    countryName: "Saint Vincent and the Grenadines",
    flagEmoji: "🇻🇨",
    flagEmojiUnicode: "U+1F1FB U+1F1E8"
  },
  {
    id: "53a3eadd-142c-4a04-a88c-ac160c2b35cf",
    currencyString: "WST",
    conversionRateToPoints: 100,
    countryCode: "WSM",
    countryName: "Samoa",
    flagEmoji: "🇼🇸",
    flagEmojiUnicode: "U+1F1FC U+1F1F8"
  },
  {
    id: "72f7d395-feb5-444e-8226-2c486e625c30",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "SMR",
    countryName: "San Marino",
    flagEmoji: "🇸🇲",
    flagEmojiUnicode: "U+1F1F8 U+1F1F2"
  },
  {
    id: "e69de874-d9d1-45fb-9ae1-e297c8171ca1",
    currencyString: "STD",
    conversionRateToPoints: 100,
    countryCode: "STP",
    countryName: "Sao Tome and Principe",
    flagEmoji: "🇸🇹",
    flagEmojiUnicode: "U+1F1F8 U+1F1F9"
  },
  {
    id: "f0ba6efb-cf39-4ffc-824a-d0ea82723104",
    currencyString: "SAR",
    conversionRateToPoints: 100,
    countryCode: "SAU",
    countryName: "Saudi Arabia",
    flagEmoji: "🇸🇦",
    flagEmojiUnicode: "U+1F1F8 U+1F1E6"
  },
  {
    id: "0e63645a-4ee6-4eab-bd79-750869dd5593",
    currencyString: "XOF",
    conversionRateToPoints: 1,
    countryCode: "SEN",
    countryName: "Senegal",
    flagEmoji: "🇸🇳",
    flagEmojiUnicode: "U+1F1F8 U+1F1F3"
  },
  {
    id: "76a2e7f6-e202-4c99-95a6-08fb361b112d",
    currencyString: "RSD",
    conversionRateToPoints: 1,
    countryCode: "SRB",
    countryName: "Serbia",
    flagEmoji: "🇷🇸",
    flagEmojiUnicode: "U+1F1F7 U+1F1F8",
    hasGiftCards: true
  },
  {
    id: "b723d5cd-d21e-44a7-ab12-576b85126c9d",
    currencyString: "SCR",
    conversionRateToPoints: 100,
    countryCode: "SYC",
    countryName: "Seychelles",
    flagEmoji: "🇸🇨",
    flagEmojiUnicode: "U+1F1F8 U+1F1E8"
  },
  {
    id: "bc34bd6b-de3e-4ebd-bb48-ad3ef477ec11",
    currencyString: "SLL",
    conversionRateToPoints: 100,
    countryCode: "SLE",
    countryName: "Sierra Leone",
    flagEmoji: "🇸🇱",
    flagEmojiUnicode: "U+1F1F8 U+1F1F1"
  },
  {
    id: "d4b3926a-2937-4d8c-8153-201a3f3767b2",
    currencyString: "SGD",
    conversionRateToPoints: 100,
    countryCode: "SGP",
    countryName: "Singapore",
    flagEmoji: "🇸🇬",
    flagEmojiUnicode: "U+1F1F8 U+1F1EC"
  },
  {
    id: "a75bf0ef-8cb7-4ada-ac5e-4116ea54677b",
    currencyString: "ANG",
    conversionRateToPoints: 100,
    countryCode: "SXM",
    countryName: "Sint Maarten",
    flagEmoji: "🇸🇽",
    flagEmojiUnicode: "U+1F1F8 U+1F1FD"
  },
  {
    id: "45488fd8-bcda-493a-ab9f-e0a38b319318",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "SVK",
    countryName: "Slovakia",
    flagEmoji: "🇸🇰",
    flagEmojiUnicode: "U+1F1F8 U+1F1F0"
  },
  {
    id: "b9d73ca0-7bff-4fbc-bf66-d2cc00a532ac",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "SVN",
    countryName: "Slovenia",
    flagEmoji: "🇸🇮",
    flagEmojiUnicode: "U+1F1F8 U+1F1EE",
    hasGiftCards: true
  },
  {
    id: "2063ce61-0046-4d0a-be91-82f1656370f2",
    currencyString: "SBD",
    conversionRateToPoints: 100,
    countryCode: "SLB",
    countryName: "Solomon Islands",
    flagEmoji: "🇸🇧",
    flagEmojiUnicode: "U+1F1F8 U+1F1E7"
  },
  {
    id: "5d4f565e-015b-478d-bb47-88c64dd5cfd0",
    currencyString: "SOS",
    conversionRateToPoints: 1,
    countryCode: "SOM",
    countryName: "Somalia",
    flagEmoji: "🇸🇴",
    flagEmojiUnicode: "U+1F1F8 U+1F1F4"
  },
  {
    id: "ff24e610-c8c5-4bd8-8b4d-69f24c5073af",
    currencyString: "ZAR",
    conversionRateToPoints: 100,
    countryCode: "ZAF",
    countryName: "South Africa",
    flagEmoji: "🇿🇦",
    flagEmojiUnicode: "U+1F1FF U+1F1E6"
  },
  {
    id: "d6ee2b64-da8a-4a5e-be42-33e4c79b85ed",
    currencyString: "GBP",
    conversionRateToPoints: 100,
    countryCode: "SGS",
    countryName: "South Georgia and the South Sandwich Islands",
    flagEmoji: "🇬🇸",
    flagEmojiUnicode: "U+1F1EC U+1F1F8"
  },
  {
    id: "69680d2c-3a7b-4498-8580-173f6b30d4d0",
    currencyString: "KRW",
    conversionRateToPoints: 1,
    countryCode: "KOR",
    countryName: "South Korea",
    flagEmoji: "🇰🇷",
    flagEmojiUnicode: "U+1F1F0 U+1F1F7"
  },
  {
    id: "a3387055-d24b-4f62-b87e-1d9ae0123af0",
    currencyString: "SSP",
    conversionRateToPoints: 100,
    countryCode: "SSD",
    countryName: "South Sudan",
    flagEmoji: "🇸🇸",
    flagEmojiUnicode: "U+1F1F8 U+1F1F8"
  },
  {
    id: "e69b000d-7b61-4ef2-b1b6-7cfe03942709",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "ESP",
    countryName: "Spain",
    flagEmoji: "🇪🇸",
    flagEmojiUnicode: "U+1F1EA U+1F1F8"
  },
  {
    id: "853650a2-ecc0-45d0-b1ac-74be106c7ea4",
    currencyString: "LKR",
    conversionRateToPoints: 100,
    countryCode: "LKA",
    countryName: "Sri Lanka",
    flagEmoji: "🇱🇰",
    flagEmojiUnicode: "U+1F1F1 U+1F1F0"
  },
  {
    id: "d6074a4b-4093-45d2-8b1a-234b45ec0c63",
    currencyString: "SDG",
    conversionRateToPoints: 100,
    countryCode: "SDN",
    countryName: "Sudan",
    flagEmoji: "🇸🇩",
    flagEmojiUnicode: "U+1F1F8 U+1F1E9"
  },
  {
    id: "87eb2433-2832-417c-b252-88c955e3c319",
    currencyString: "SRD",
    conversionRateToPoints: 100,
    countryCode: "SUR",
    countryName: "Suriname",
    flagEmoji: "🇸🇷",
    flagEmojiUnicode: "U+1F1F8 U+1F1F7"
  },
  {
    id: "cd964efd-677b-40fc-92d8-7f4633a8b4fb",
    currencyString: "NOK",
    conversionRateToPoints: 100,
    countryCode: "SJM",
    countryName: "Svalbard and Jan Mayen",
    flagEmoji: "🇸🇯",
    flagEmojiUnicode: "U+1F1F8 U+1F1EF"
  },
  {
    id: "20148b07-a496-450c-ab9a-3b82db7f8b7c",
    currencyString: "SZL",
    conversionRateToPoints: 1,
    countryCode: "SWZ",
    countryName: "Swaziland",
    flagEmoji: "🇸🇿",
    flagEmojiUnicode: "U+1F1F8 U+1F1FF"
  },
  {
    id: "c54dd1d2-ea05-42d1-a538-30075a432374",
    currencyString: "SEK",
    conversionRateToPoints: 100,
    countryCode: "SWE",
    countryName: "Sweden",
    flagEmoji: "🇸🇪",
    flagEmojiUnicode: "U+1F1F8 U+1F1EA"
  },
  {
    id: "38992d33-e7cf-4a7f-9c49-ac5b9d9a5d2d",
    currencyString: "CHF",
    conversionRateToPoints: 100,
    countryCode: "CHE",
    countryName: "Switzerland",
    flagEmoji: "🇨🇭",
    flagEmojiUnicode: "U+1F1E8 U+1F1ED"
  },
  {
    id: "4a109b62-f460-4f3a-9893-3d8da2aa192c",
    currencyString: "SYP",
    conversionRateToPoints: 1,
    countryCode: "SYR",
    countryName: "Syria",
    flagEmoji: "🇸🇾",
    flagEmojiUnicode: "U+1F1F8 U+1F1FE"
  },
  {
    id: "4cd15f6b-a1b2-4d4e-90dc-953d58a8c76d",
    currencyString: "TWD",
    conversionRateToPoints: 100,
    countryCode: "TWN",
    countryName: "Taiwan",
    flagEmoji: "🇹🇼",
    flagEmojiUnicode: "U+1F1F9 U+1F1FC"
  },
  {
    id: "d450baee-7332-466d-8550-e6942f9397c3",
    currencyString: "TJS",
    conversionRateToPoints: 100,
    countryCode: "TJK",
    countryName: "Tajikistan",
    flagEmoji: "🇹🇯",
    flagEmojiUnicode: "U+1F1F9 U+1F1EF"
  },
  {
    id: "3524608b-18ce-4345-a9e5-75479892a29f",
    currencyString: "TZS",
    conversionRateToPoints: 1,
    countryCode: "TZA",
    countryName: "Tanzania",
    flagEmoji: "🇹🇿",
    flagEmojiUnicode: "U+1F1F9 U+1F1FF"
  },
  {
    id: "7c7a4e63-b7de-4c11-b1d3-53f901a437b2",
    currencyString: "THB",
    conversionRateToPoints: 100,
    countryCode: "THA",
    countryName: "Thailand",
    flagEmoji: "🇹🇭",
    flagEmojiUnicode: "U+1F1F9 U+1F1ED"
  },
  {
    id: "7bc01120-5364-4286-a05b-e7c0f5639dde",
    currencyString: "XOF",
    conversionRateToPoints: 1,
    countryCode: "TGO",
    countryName: "Togo",
    flagEmoji: "🇹🇬",
    flagEmojiUnicode: "U+1F1F9 U+1F1EC"
  },
  {
    id: "f3ff4e80-b6fa-4984-a129-b1ed5d20a635",
    currencyString: "NZD",
    conversionRateToPoints: 100,
    countryCode: "TKL",
    countryName: "Tokelau",
    flagEmoji: "🇹🇰",
    flagEmojiUnicode: "U+1F1F9 U+1F1F0"
  },
  {
    id: "b1d39ce7-d79f-47b6-aee2-1cac655f4ecc",
    currencyString: "TOP",
    conversionRateToPoints: 100,
    countryCode: "TON",
    countryName: "Tonga",
    flagEmoji: "🇹🇴",
    flagEmojiUnicode: "U+1F1F9 U+1F1F4"
  },
  {
    id: "16e69cd0-05e6-4c76-bc44-4ead8b6fcbfa",
    currencyString: "TTD",
    conversionRateToPoints: 100,
    countryCode: "TTO",
    countryName: "Trinidad and Tobago",
    flagEmoji: "🇹🇹",
    flagEmojiUnicode: "U+1F1F9 U+1F1F9"
  },
  {
    id: "2b01c9f0-03d9-4995-9f23-4a5ada07616a",
    currencyString: "TND",
    conversionRateToPoints: 1000,
    countryCode: "TUN",
    countryName: "Tunisia",
    flagEmoji: "🇹🇳",
    flagEmojiUnicode: "U+1F1F9 U+1F1F3"
  },
  {
    id: "08bba472-8503-4688-93c9-0f357fffb267",
    currencyString: "TRY",
    conversionRateToPoints: 100,
    countryCode: "TUR",
    countryName: "Turkey",
    flagEmoji: "🇹🇷",
    flagEmojiUnicode: "U+1F1F9 U+1F1F7"
  },
  {
    id: "83ba0656-83f2-4a32-bc14-d085fa47b98c",
    currencyString: "TMT",
    conversionRateToPoints: 100,
    countryCode: "TKM",
    countryName: "Turkmenistan",
    flagEmoji: "🇹🇲",
    flagEmojiUnicode: "U+1F1F9 U+1F1F2"
  },
  {
    id: "af8878e5-f8ef-4d7e-b793-78fa5dc0836f",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "TCA",
    countryName: "Turks and Caicos Islands",
    flagEmoji: "🇹🇨",
    flagEmojiUnicode: "U+1F1F9 U+1F1E8"
  },
  {
    id: "89a9e390-323b-4005-9fca-e3924a1fe486",
    currencyString: "AUD",
    conversionRateToPoints: 100,
    countryCode: "TUV",
    countryName: "Tuvalu",
    flagEmoji: "🇹🇻",
    flagEmojiUnicode: "U+1F1F9 U+1F1FB"
  },
  {
    id: "2af38ace-5145-496d-a200-440c3e7f1a33",
    currencyString: "UGX",
    conversionRateToPoints: 1,
    countryCode: "UGA",
    countryName: "Uganda",
    flagEmoji: "🇺🇬",
    flagEmojiUnicode: "U+1F1FA U+1F1EC"
  },
  {
    id: "6ef6c72a-4402-4b68-807d-6f915fe03ce3",
    currencyString: "UAH",
    conversionRateToPoints: 100,
    countryCode: "UKR",
    countryName: "Ukraine",
    flagEmoji: "🇺🇦",
    flagEmojiUnicode: "U+1F1FA U+1F1E6"
  },
  {
    id: "9a33c11a-9455-46c2-9af4-466e42874688",
    currencyString: "AED",
    conversionRateToPoints: 100,
    countryCode: "ARE",
    countryName: "United Arab Emirates",
    flagEmoji: "🇦🇪",
    flagEmojiUnicode: "U+1F1E6 U+1F1EA"
  },
  {
    id: "8589bb58-65e9-414d-923d-a5f751362572",
    currencyString: "GBP",
    conversionRateToPoints: 100,
    countryCode: "GBR",
    countryName: "United Kingdom",
    flagEmoji: "🇬🇧",
    flagEmojiUnicode: "U+1F1EC U+1F1E7"
  },
  {
    id: "edb25766-8dbb-4d70-9aa1-da297fffac13",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "UMI",
    countryName: "United States Minor Outlying Islands",
    flagEmoji: "🇺🇲",
    flagEmojiUnicode: "U+1F1FA U+1F1F2"
  },

  {
    id: "d952a9e4-cb23-4b2a-808d-e73daafb7e77",
    currencyString: "UYU",
    conversionRateToPoints: 100,
    countryCode: "URY",
    countryName: "Uruguay",
    flagEmoji: "🇺🇾",
    flagEmojiUnicode: "U+1F1FA U+1F1FE"
  },
  {
    id: "01d82fb1-68be-40c9-bdec-d5522dbf80b4",
    currencyString: "USD",
    conversionRateToPoints: 100,
    countryCode: "VIR",
    countryName: "U.S. Virgin Islands",
    flagEmoji: "🇻🇮",
    flagEmojiUnicode: "U+1F1FB U+1F1EE"
  },
  {
    id: "7b8d54c5-3b7a-461c-bf84-a3834815ecc3",
    currencyString: "UZS",
    conversionRateToPoints: 1,
    countryCode: "UZB",
    countryName: "Uzbekistan",
    flagEmoji: "🇺🇿",
    flagEmojiUnicode: "U+1F1FA U+1F1FF"
  },
  {
    id: "4c599e2d-06e6-4b34-9213-8607486568b2",
    currencyString: "VUV",
    conversionRateToPoints: 1,
    countryCode: "VUT",
    countryName: "Vanuatu",
    flagEmoji: "🇻🇺",
    flagEmojiUnicode: "U+1F1FB U+1F1FA"
  },
  {
    id: "5e5a3624-7005-4042-9f84-f2be41bf92e0",
    currencyString: "EUR",
    conversionRateToPoints: 100,
    countryCode: "VAT",
    countryName: "Vatican",
    flagEmoji: "🇻🇦",
    flagEmojiUnicode: "U+1F1FB U+1F1E6"
  },
  {
    id: "bf891bad-d1b2-4b25-860b-48499d3019eb",
    currencyString: "VEF",
    conversionRateToPoints: 100,
    countryCode: "VEN",
    countryName: "Venezuela",
    flagEmoji: "🇻🇪",
    flagEmojiUnicode: "U+1F1FB U+1F1EA"
  },
  {
    id: "7a79cf29-89d4-4fcc-8e7a-d31f0d271960",
    currencyString: "VND",
    conversionRateToPoints: 1,
    countryCode: "VNM",
    countryName: "Vietnam",
    flagEmoji: "🇻🇳",
    flagEmojiUnicode: "U+1F1FB U+1F1F3"
  },
  {
    id: "e7582bee-20cb-4ed9-a889-3561a66a3092",
    currencyString: "XPF",
    conversionRateToPoints: 1,
    countryCode: "WLF",
    countryName: "Wallis and Futuna",
    flagEmoji: "🇼🇫",
    flagEmojiUnicode: "U+1F1FC U+1F1EB"
  },
  {
    id: "edd489e1-2cc4-403e-bec3-56200b8afcf5",
    currencyString: "MAD",
    conversionRateToPoints: 100,
    countryCode: "ESH",
    countryName: "Western Sahara",
    flagEmoji: "🇪🇭",
    flagEmojiUnicode: "U+1F1EA U+1F1ED"
  },
  {
    id: "f1f8d48d-5ae3-4832-89d3-fc5ad42fdb9d",
    currencyString: "YER",
    conversionRateToPoints: 1,
    countryCode: "YEM",
    countryName: "Yemen",
    flagEmoji: "🇾🇪",
    flagEmojiUnicode: "U+1F1FE U+1F1EA"
  },
  {
    id: "8f2c6769-7a4e-4f28-9a16-86faa6cd926c",
    currencyString: "ZMK",
    conversionRateToPoints: 1,
    countryCode: "ZMB",
    countryName: "Zambia",
    flagEmoji: "🇿🇲",
    flagEmojiUnicode: "U+1F1FF U+1F1F2"
  },
  {
    id: "5ba97ae1-4ca3-455a-83a7-207e87eb5ce2",
    currencyString: "ZWL",
    conversionRateToPoints: 100,
    countryCode: "ZWE",
    countryName: "Zimbabwe",
    flagEmoji: "🇿🇼",
    flagEmojiUnicode: "U+1F1FF U+1F1FC"
  },
  {
    id: "7810e53a-048f-4efa-9a1a-1b8042e6fdca",
    currencyString: "N/A",
    conversionRateToPoints: 1,
    countryCode: "N/A",
    countryName: "Other",
    flagEmoji: ""
  }
];
