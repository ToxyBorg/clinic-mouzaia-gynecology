import React from "react";
import { Paper, Group, Text, Button } from "@mantine/core";
import { COLPOSCOPY_ENDPOINTS } from "../../api/endpoints";

interface ExamListItemProps {
	exam: {
		id: string;
		patientName: string;
		examDate: string;
		doctorName: string;
		status: string;
	};
}

export const ExamListItem: React.FC<ExamListItemProps> = ({ exam }) => {
	return (
		<Paper
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
						window.open(COLPOSCOPY_ENDPOINTS.GET_EXAM_PDF(exam.id), "_blank")
					}
				>
					View Report
				</Button>
			</Group>
		</Paper>
	);
};
