import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreeateNote from "./components/Form/CreateNote";
import EditNote from "./components/Form/EditNote";
import { NoteData, RawNote, Tag } from "./types";
import { v4 } from "uuid";
import MainPage from "./components/MainPage";
import { useLocalStorage } from "./components/utils/UseLocalStorage";
import { useMemo } from "react";
import DetailPage from "./components/DetailPage";
import Layout from "./components/Layout";

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  //* note verilerindeki etiket id'lerine göre etiketlerin isimlerini al
  //* her render sırasında tekrardan bütün notelar'ın
  //* etiketlerini terkrar hesaplamaması için useMemo kullanıcaz
  const noteWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.value)),
      })),
    [tags, notes]
  );

  //* Yeni not oluştur
  //* Local'e not'u eklerken notun etiketlerinin sadece id'sini eklicez
  const addNote = ({ tags, ...data }: NoteData) => {
    //* Yeni note'u oluşturma
    const newNote = {
      ...data,
      id: v4(),
      tagIds: tags.map((tag) => tag.value), //* etiketlerin sadece id'sini aldık.
    };

    //* State'e yeni notu ekleme >
    // setNotes([...notes, newNote]); //* 1. yöntem
    //* setState fonksiyonlarda fonksiyon tanımlayınca
    //* fonksiyon parametre olarak state'deki verileri alır.
    setNotes((prevNotes) => [...prevNotes, newNote]); //* 2. Yöntem
  };

  //* Yeni etiket oluşutur
  const createTag = (tag: Tag) => {
    setTags((PrevTags) => [...PrevTags, tag]);
  };

  //* note silme
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  //* note'u güncelleme

  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    //* Güncellenecek note'un state'de tuttuğumuz halini
    //* bulucaz onu kaldırıp yerine gönderilen yeni note'u koyacağız.
    //* Bunu yaparken etiketlerin sadece id'sini alacağız.
    const updated = notes.map((note) =>
      note.id === id
        ? {
            ...note, //* State'deki note'un bilgileri
            ...data, //* Yeni note'un güncel bilgileri
            tagIds: tags.map((tag) => tag.value), //* Note'un yeni id'leri
          }
        : note
    );
    //* state'i günceller
    setNotes(updated);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage availableTags={tags} notes={noteWithTags} />}
        />
        <Route
          path="/new"
          element={
            <CreeateNote
              availableTags={tags}
              createTag={createTag}
              onSubmit={addNote}
            />
          }
        />

        <Route element={<Layout notes={noteWithTags} />} path="/:id">
          {/* index >>>  kapsayıcı Route'a verdiğim yol ile alttaki Route
          eşleşirse devreye girecek alt Route'u söylememize yarar.
          */}
          <Route index element={<DetailPage deleteNote={deleteNote} />} />
          <Route path="edit" element={<EditNote availableTags={tags} createTag={createTag} onSubmit={updateNote}/>} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
