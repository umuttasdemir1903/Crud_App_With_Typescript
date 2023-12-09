import { Badge, Card, CardBody, Stack } from "react-bootstrap";
import { Note } from "../types";
//* Module css dosyaları geriye still objesi döndürür.
import styles from "./note-card.module.css";
import {useNavigate} from "react-router-dom";

type CardProps = {
  note: Note;
};

const NoteCard = ({ note }: CardProps) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`${note.id}`)} className={styles.noteCard}>
      <CardBody> 
        <Stack
          className="align-items-center justify-content-between h-100"
          gap={2}
        >
          <span>{note.title}</span>

          <Stack
            direction="horizontal"
            gap={1}
            className="justify-content-center "
          >
            {note.tags.map((tag) => (
              <Badge key={tag.value}>{tag.label}</Badge>
            ))}
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NoteCard;
