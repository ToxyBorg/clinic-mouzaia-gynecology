import { AppShell, Burger, Group, Title, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useLocation,
} from "react-router-dom";
import ColposcopyFormPage from "./pages/ColposcopyFormPage";
import ExamsList from "./pages/ExamsList";
import Dashboard from "./pages/Dashboard";
import ColposcopyDashboard from "./pages/ColposcopyDashboard";

function Navigation() {
	const location = useLocation();
	const [opened, { toggle }] = useDisclosure();

	return (
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
						Gynecology Exam System
					</Title>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<NavLink
					label='Dashboard'
					component={Link}
					to='/'
					active={location.pathname === "/"}
				/>
				<NavLink
					label='Colposcopy'
					childrenOffset={28}
					defaultOpened
					active={location.pathname.startsWith("/colposcopy")}
				>
					<NavLink
						label='Overview'
						component={Link}
						to='/colposcopy'
						active={location.pathname === "/colposcopy"}
					/>
					<NavLink
						label='New Exam'
						component={Link}
						to='/colposcopy/new-exam'
						active={location.pathname === "/colposcopy/new-exam"}
					/>
					<NavLink
						label='Exams List'
						component={Link}
						to='/colposcopy/exams'
						active={location.pathname === "/colposcopy/exams"}
					/>
				</NavLink>
			</AppShell.Navbar>

			<AppShell.Main>
				<Routes>
					<Route
						path='/'
						element={<Dashboard />}
					/>
					<Route
						path='/colposcopy'
						element={<ColposcopyDashboard />}
					/>
					<Route
						path='/colposcopy/new-exam'
						element={<ColposcopyFormPage />}
					/>
					<Route
						path='/colposcopy/exams'
						element={<ExamsList />}
					/>
				</Routes>
			</AppShell.Main>
		</AppShell>
	);
}

function App() {
	return (
		<Router>
			<Navigation />
		</Router>
	);
}

export default App;
