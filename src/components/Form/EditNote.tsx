import { useOutletContext } from "react-router-dom";
import { Note, NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, createTag, availableTags }: EditNoteProps) => {
  const data: Note = useOutletContext();
  return (
    <div className="container py-5 ">
      <h2> Edit Note</h2>
      <NoteForm
        //* onSubmit'i NoteForm'da 1 parametre alan fonksiyon şeklinde
        //* tanımladık ama güncelleme fonksiyonu 2 parametre alıyor
        //* bu yüzden tek parametre alan bir fonksiyon tanımlayıp
        //* içerisinde güncelleme fonksiyonu çalıştırdık.
        onSubmit={(updatedNote) => {
          onSubmit(data.id, updatedNote);
        }}
        createTag={createTag}
        availableTags={availableTags}
        title={data.title}
        tags={data.tags}
        markdown={data.markdown}
      />
    </div>
  );
};

export default EditNote;
