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
import ReactSelect from "react-select/creatable";

import { useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { Tag } from "../../types";
import { CreateNoteProps } from "./CreateNote";
import { v4 } from "uuid";

const NoteForm = ({
  onSubmit,
  availableTags,
  createTag,
  markdown = "",
  tags = [],
  title = "",
}: CreateNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, SetSelectedTags] = useState<Tag[]>(tags);

  const navigate = useNavigate();

  // Form gönderilince çalışır
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* Yeni not oluşturur.
    //* '!' hata engelleme operatörü
    //*yani eleman tanımsızsa hata vermesini engeller
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    //* Form gönderilince önceki sayfaya yönlendirir.
    navigate(-1);
  };
  return (
    <Form onSubmit={handleSubmit} className="mt-5">
      <Stack>
        {/* Üst Kısım */}
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Title</FormLabel>
              <FormControl
                defaultValue={title}
                ref={titleRef}
                required
                className="shadow"
              />
            </FormGroup>
          </Col>
          <Col>
            <Col>
              <FormGroup>
                <FormLabel>Tags</FormLabel>
                <ReactSelect
                  //* Seçilen elemanları göstermek için verdik
                  value={selectedTags}
                  //* Elemanlar silindiğinde state'i günceller.
                  // @ts-ignore
                  onChange={(all_tags) => SetSelectedTags(all_tags)}
                  //* Yeni etiket oluşturulduğunda
                  onCreateOption={(text) => {
                    //* etiketi id ekle ve state'e aktar.
                    const newTag: Tag = { label: text, value: v4() };

                    //* Local'e yeni etiketi kaydet
                    createTag(newTag);

                    //* State'i Günceller
                    SetSelectedTags([...selectedTags, newTag]);
                  }}
                  //* Daha önce oluşturulan etiketleri listele
                  options={availableTags}
                  className="shadow"
                  isMulti
                />
              </FormGroup>
            </Col>
          </Col>
        </Row>
        {/* İçerik Alanı */}
        <FormGroup className="mt-5">
          <FormLabel>Content Area</FormLabel>
          {/* as =>> textarea olarak davran anlamına gelir */}
          <FormControl
            defaultValue={markdown}
            ref={markdownRef}
            as={"textarea"}
            className="shadow"
            style={{ maxHeight: "300px", minHeight: "350px" }}
          />
        </FormGroup>

        {/* Buttonlar */}
        <Stack
          direction="horizontal"
          className="justify-content-end mt-3 "
          gap={2}
        >
          <Button type="submit">Save</Button>
          <Button
            //* Geçmişte bir sayfa geri gönderme
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
            Back
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
