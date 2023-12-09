//* Bu layout bileşeni sayesinde url'den alınan id
//* ile eşleşen note'un bilgilerini bulucaz
//* ve bu bilgileri bütün alt route'lara aktarıcaz

import { Outlet, useParams, Navigate } from "react-router-dom";
import { Note } from "../types";

type LayoutProps = {
  notes: Note[];
};

const Layout = ({ notes }: LayoutProps) => {
  //* 1- Url'den id'yi aldık
  const { id } = useParams();

  //* 2- Url'den alınan id ile eşeleşen note'u bul
  const found = notes.find((n) => n.id === id);

  //* 3- Note bulunmadıysa kullanıcıyı anasayfaya yönlendir.
  if (!found) return <Navigate to={"/"} />;

  //* 4- Bulunan route'u alt route'a aktar.


  return <Outlet context={found}/>;
};

export default Layout;
