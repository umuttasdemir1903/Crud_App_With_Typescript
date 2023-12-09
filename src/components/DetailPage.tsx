import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useOutletContext, Link } from "react-router-dom";
import { Note } from "../types";
import ReactMarkDown from "react-markdown";

type DetailPageProps = {
  deleteNote: (id: string) => void;
};
const DetailPage = ({ deleteNote }: DetailPageProps) => {
  const data: Note = useOutletContext();

  return (
    <div className="container py-5">
      <Row>
        <Col>
          <h2>{data.title}</h2>

          <Stack direction="horizontal" gap={2} className="flex-wrap">
            {data.tags?.map((tag) => (
              <Badge key={tag.value} className="fs-6">
                {tag.label}
              </Badge>
            ))}
          </Stack>
        </Col>
        <Col>
          <Stack
            direction="horizontal"
            gap={2}
            className="align-items-center justify-content-end  "
          >
            <Link to={"edit"}>
              <Button variant="outline-warning">Edit</Button>
            </Link>

            <Button
              onClick={() => deleteNote(data.id)}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to={"/"}>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      {/* markdown içeriğini ekrana bas */}
      <ReactMarkDown className={"my-4"}>{data.markdown}</ReactMarkDown>
    </div>
  );
};

export default DetailPage;
