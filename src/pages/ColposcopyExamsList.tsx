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
import { COLPOSCOPY_ENDPOINTS } from "../api/endpoints";

interface ColposcopyExam {
	id: string;
	patientName: string;
	examDate: string;
	doctorName: string;
	status: string;
}

const ColposcopyExamsList: React.FC = () => {
	const [exams, setExams] = useState<ColposcopyExam[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchExams = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch(COLPOSCOPY_ENDPOINTS.LIST_EXAMS);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setExams(data);
			} catch (error) {
				console.error("Error fetching colposcopy exams:", error);
				setError("Failed to load colposcopy exams. Please try again later.");
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
				<Text>Loading colposcopy exams...</Text>
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
				Colposcopy Exams
			</Title>
			{exams.length === 0 ? (
				<Text>No colposcopy exams found.</Text>
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
											COLPOSCOPY_ENDPOINTS.GET_EXAM_PDF(exam.id),
											"_blank"
										)
									}
								>
									View Report
								</Button>
							</Group>
						</Paper>
					))}
				</List>
			)}
		</Container>
	);
};

export default ColposcopyExamsList;
