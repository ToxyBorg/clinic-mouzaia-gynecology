import "@mantine/core/styles.css";
import { Container, MantineProvider, Title } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <Container>
        <Title>Hello World</Title>
      </Container>
    </MantineProvider>
  );
}

export default App;
