import React, { useEffect, useState } from "react";
import {
	Container,
	Title,
	List,
	Text,
	Paper,
	Group,
	Button,
	Alert,
} from "@mantine/core";

interface Exam {
	id: string;
	patientName: string;
	examDate: string;
	doctorName: string;
	status: string;
}

const ExamsList: React.FC = () => {
	const [exams, setExams] = useState<Exam[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchExams = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch("http://localhost:3001/exams");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setExams(data);
			} catch (error) {
				console.error("Error fetching exams:", error);
				setError("Failed to load exams. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchExams();
	}, []);

	if (loading) {
		return (
			<Container
				size='md'
				py='xl'
			>
				<Text>Loading exams...</Text>
			</Container>
		);
	}

	if (error) {
		return (
			<Container
				size='md'
				py='xl'
			>
				<Alert
					icon={"!"}
					title='Error'
					color='red'
				>
					{error}
				</Alert>
			</Container>
		);
	}

	return (
		<Container
			size='md'
			py='xl'
		>
			<Title
				order={1}
				mb='md'
			>
				Generated Exams
			</Title>
			{exams.length === 0 ? (
				<Text>No exams found.</Text>
			) : (
				<List spacing='md'>
					{exams.map((exam) => (
						<Paper
							key={exam.id}
							p='md'
							shadow='sm'
						>
							<Group justify='space-between'>
								<div>
									<Text fw={500}>{exam.patientName}</Text>
									<Text
										size='sm'
										c='dimmed'
									>
										Exam Date: {new Date(exam.examDate).toLocaleDateString()}
									</Text>
									<Text
										size='sm'
										c='dimmed'
									>
										Doctor: {exam.doctorName}
									</Text>
									<Text
										size='sm'
										c='dimmed'
									>
										Status: {exam.status}
									</Text>
								</div>
								<Button
									variant='light'
									color='blue'
									onClick={() =>
										window.open(
											`http://localhost:3001/exams/${exam.id}/pdf`,
											"_blank"
										)
									}
								>
									View
								</Button>
							</Group>
						</Paper>
					))}
				</List>
			)}
		</Container>
	);
};

export default ExamsList;
