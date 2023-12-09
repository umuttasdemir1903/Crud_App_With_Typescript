//? Custom Hook
//* react hooklarına benzer şekilde görev yapan
//* projenin ihtiyacına göre kednimiz oluşturğumuz
//* ve görevini bizim belirlediğimiz hooklardır.
//* custom hooklar genelde verileri, ve veriyi
//* güncellemeye yarayan fonksiyonu dizi içerisinde döndürür.

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  //* 1) state'i in ilk değerini tanımla
  //* eğerki local'de bir değer varsa onu al
  //* yoksa gelen inital state'i kullan.
  const [value, setValue] = useState<T>(() => {
    //* Local'den ilgili değeri al
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === null) {
      //* local'de eleman yoksa initial value'yu ilk değer olsun
      return initialValue;
    } else {
      //* local'de eleman varsa lokaldeki veri ilk değer olsun
      return JSON.parse(jsonValue);
    }
  });

  //* 2) state her değiştiğinde local'i güncelle.

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //* 3) state'i ve güncellemeye yarayan fonksiyonu döndür.
  //* tuple ile tip tanımladık
  //* ilk elemanın tipi generic olarak gelen tipte
  //* ikinci elemanın tipi ise sabit olarak varsyılan tipi olucak

  return [value, setValue] as [T, typeof setValue];
}
