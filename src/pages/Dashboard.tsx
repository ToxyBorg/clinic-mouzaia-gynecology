import { Container, Title, Text } from "@mantine/core";

export default function Dashboard() {
	return (
		<Container>
			<Title
				order={2}
				mb='md'
			>
				Dashboard
			</Title>
			<Text>
				Welcome to the Gynecology Exam System dashboard. This page will contain
				an overview of all exam types and quick access to important features.
			</Text>
		</Container>
	);
}
