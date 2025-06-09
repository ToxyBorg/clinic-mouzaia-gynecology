import { AppShell, Burger, Group, Title, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ColposcopyFormPage from "./pages/ColposcopyFormPage";
import ExamsList from "./pages/ExamsList";

function App() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<Router>
			<AppShell
				header={{ height: 60 }}
				navbar={{
					width: 300,
					breakpoint: "sm",
					collapsed: { mobile: !opened },
				}}
				padding='md'
			>
				<AppShell.Header>
					<Group
						h='100%'
						px='md'
					>
						<Burger
							opened={opened}
							onClick={toggle}
							hiddenFrom='sm'
							size='sm'
						/>
						<Title
							order={3}
							style={{ flexGrow: 1 }}
						>
							Colposcopy Exam System
						</Title>
					</Group>
				</AppShell.Header>

				<AppShell.Navbar p='md'>
					<Button
						variant='subtle'
						fullWidth
						mb='md'
						component={Link}
						to='/new-exam'
					>
						New Exam
					</Button>
					<Button
						variant='subtle'
						fullWidth
						mb='md'
						component={Link}
						to='/exams'
					>
						Exams List
					</Button>
				</AppShell.Navbar>

				<AppShell.Main>
					<Routes>
						<Route
							path='/new-exam'
							element={<ColposcopyFormPage />}
						/>
						<Route
							path='/exams'
							element={<ExamsList />}
						/>
					</Routes>
				</AppShell.Main>
			</AppShell>
		</Router>
	);
}

export default App;
