import { HistoryLocation } from "@reach/router";
import React from "react";
import { Container, Row, Col } from "reactstrap";
import { H2, H3, P } from "../../components/typography";
import netlifyIdentity from "netlify-identity-widget";
import GoTrue from 'gotrue-js'

type Answer = {
  question_id: string;
  id: string;
  user_id: string;
  answer: string;
};
type SurveyQuestion = {
  question: string;
  answers: Answer[];
};


const Survey = () => {
  const [questions, setQuestions] = React.useState<SurveyQuestion[] | null>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      console.log(netlifyIdentity.currentUser())
      
      const res = await fetch("/.netlify/functions/survey");
      const data = await res.json();
      console.log(data)
      setLoading(false)
    };

    getQuestions();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <H2>Survey</H2>
        </Col>
      </Row>
      {loading && (
        <Row>
          <Col>
            <P>Loading...</P>
          </Col>
        </Row>
      )}
      {questions &&
        questions.map((q) => (
          <Row key={q.question}>
            <Col xs={12}>
              <H3>{q.question}</H3>
            </Col>
            <AnswerList answers={q.answers} />
          </Row>
        ))}
    </Container>
  );
};

interface IAnswers {
  answers: Answer[];
}

const AnswerList = ({ answers }: IAnswers) => {
  return (
    <>
      {answers.map((a) => (
        <Col xs={12}>
          <P>{a.answer}</P>
        </Col>
      ))}
    </>
  );
};

export default Survey;