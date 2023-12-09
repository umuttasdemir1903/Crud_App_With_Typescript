import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import NoteCard from "./NoteCard";
import { Note, Tag } from "../types";
import { useState, useMemo } from "react";

type MainPageProps = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ availableTags, notes }: MainPageProps) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  //* filtreleme:
  //* 1- benim arttığım başlığı içeren note var mı
  //* 2- benim seçtiğim bütün etiketlere sahip note var mı
  const filtredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          //* Note'un başlığı arattığım metni içeriyorsa notları döndür
          title === "" ||
          (note.title.toLowerCase().includes(title.toLowerCase()) &&
            //* Seçtiğim eriketlerin tamamı note'da varsa note'u döndür.
            (selectedTags.length === 0 ||
              selectedTags.every((s_tag) =>
                note.tags.some((noteTag) => noteTag.value === s_tag.value) 
              )))
        );
      }),
    [title, selectedTags, notes]
  );
  return (
    <div className="container py-5">
      {/* Üst kısım */}
      <Stack direction="horizontal" className="justify-content-between ">
        <h1>Notes</h1>
        <Link to={"/new"}>
          <Button>Create</Button>
        </Link>
      </Stack>

      {/* Filtreleme alanı */}
      <Form className="mt-3">
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Search by title</FormLabel>
              <FormControl
                onChange={(e) => setTitle(e.target.value)}
                className="shadow"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Search by tags</FormLabel>
              <ReactSelect
                // @ts-ignore
                onChange={(all_tags) => setSelectedTags(all_tags)}
                options={availableTags}
                isMulti
                className="shadow"
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>

      {/* Not listesi */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
