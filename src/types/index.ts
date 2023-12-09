//* '&' işareti NoteData'nın tiplerini al ve üzerine id ekle
export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  label: string;
  value: string;
};

//* Verileri Local'de tutarken sadece id'sini tutacağız bu yüzden
//* bunun için yeni bir tip oluşturucaz

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[]; // Note'ların id'lerini local'de saklayacağımız için böyle bir kullanuım yaptık
};
