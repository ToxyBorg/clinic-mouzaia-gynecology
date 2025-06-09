import { Container, Title } from "@mantine/core";
import ColposcopyForm from "../components/ColposcopyForm";

export default function ColposcopyFormPage() {
	return (
		<Container
			size='md'
			py='xl'
		>
			<Title
				order={1}
				mb='md'
			>
				New Colposcopy Exam
			</Title>
			<ColposcopyForm />
		</Container>
	);
}
