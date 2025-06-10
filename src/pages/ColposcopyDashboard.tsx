import {
	Container,
	Title,
	Text,
	SimpleGrid,
	Card,
	Button,
	Group,
} from "@mantine/core";
import { Link } from "react-router-dom";

export default function ColposcopyDashboard() {
	return (
		<Container
			size='md'
			py='xl'
		>
			<Title
				order={2}
				mb='xl'
			>
				Colposcopy Exams
			</Title>

			<SimpleGrid
				cols={{ base: 1, sm: 2 }}
				spacing='lg'
			>
				<Card
					shadow='sm'
					padding='lg'
					radius='md'
					withBorder
				>
					<Text
						size='lg'
						fw={500}
						mb='md'
					>
						New Exam
					</Text>
					<Text
						size='sm'
						c='dimmed'
						mb='xl'
					>
						Create a new colposcopy examination report for a patient.
					</Text>
					<Group justify='flex-end'>
						<Button
							component={Link}
							to='/colposcopy/new-exam'
						>
							Create New Exam
						</Button>
					</Group>
				</Card>

				<Card
					shadow='sm'
					padding='lg'
					radius='md'
					withBorder
				>
					<Text
						size='lg'
						fw={500}
						mb='md'
					>
						View Exams
					</Text>
					<Text
						size='sm'
						c='dimmed'
						mb='xl'
					>
						Access and manage all colposcopy examination reports.
					</Text>
					<Group justify='flex-end'>
						<Button
							component={Link}
							to='/colposcopy/exams'
						>
							View All Exams
						</Button>
					</Group>
				</Card>
			</SimpleGrid>
		</Container>
	);
}
