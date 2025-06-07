import { AppShell, Burger, Group, Title, Text, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import ColposcopyForm from "./components/ColposcopyForm";

function App() {
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
						Colposcopy Exam Form
					</Title>
					<Button
						onClick={() => window.print()}
						className='no-print'
					>
						Print Form (A4)
					</Button>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<Text>Navigation content</Text>
			</AppShell.Navbar>

			<AppShell.Main>
				<ColposcopyForm />
			</AppShell.Main>
		</AppShell>
	);
}

export default App;
