import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

export type CreateNoteProps = {
  onSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
//* Partial >>
//* Partial sayesinde miras aldığımız NoteData'daki verileri
//* zorunlu olması yerine opsiyonel yaptık.
//*("?" ile tanımlanmış gibi olur)

const CreeateNote = ({
  onSubmit,
  createTag,
  availableTags,
}: CreateNoteProps) => {
  return (
    <div className="container py-5">
      <h1>Create New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        createTag={createTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default CreeateNote;
