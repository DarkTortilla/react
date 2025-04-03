import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoCurrency, CryptoPrice, Pair } from "../types";
import { getCryptos, getData } from "../services/CryptoService";

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  result: CryptoPrice;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
  loading: boolean;
};

export const useCryptoState = create<CryptoStore>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    result: {
      IMAGEURL: "",
      PRICE: "",
      HIGHDAY: "",
      LOWDAY: "",
      CHANGEPCT24HOUR: "",
      LASTUPDATE: "",
    } as CryptoPrice,
    loading: false,
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({
        cryptoCurrencies,
      }));
    },
    fetchData: async (pair: Pair) => {
      console.log(pair);
      set(() => ({
        loading: true,
      }));
      const result = await getData(pair);
      set(() => ({
        result,
        loading: false,
      }));
    },
  }))
);
