import React, { useEffect, useState } from "react";
import { Container, Title, List, Text, Alert } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { COLPOSCOPY_ENDPOINTS } from "../api/endpoints";
import { ExamListItem } from "../components/colposcopy/ExamListItem";
import { ExamListControls } from "../components/colposcopy/ExamListControls";

interface ColposcopyExam {
	id: string;
	patientName: string;
	examDate: string;
	doctorName: string;
	status: string;
}

interface PaginatedResponse {
	exams: ColposcopyExam[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		startIndex: number;
		endIndex: number;
	};
}

const ColposcopyExamsList: React.FC = () => {
	const [exams, setExams] = useState<ColposcopyExam[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch] = useDebouncedValue(searchQuery, 500); // 500ms delay
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [totalPages, setTotalPages] = useState(1);
	const [total, setTotal] = useState(0);
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchExams = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch(
					`${COLPOSCOPY_ENDPOINTS.LIST_EXAMS}?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data: PaginatedResponse = await response.json();
				setExams(data.exams);
				setTotalPages(data.pagination.totalPages);
				setTotal(data.pagination.total);
				setStartIndex(data.pagination.startIndex);
				setEndIndex(data.pagination.endIndex);
			} catch (error) {
				console.error("Error fetching colposcopy exams:", error);
				setError("Failed to load colposcopy exams. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchExams();
	}, [currentPage, limit, debouncedSearch]); // Changed from searchQuery to debouncedSearch

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
			<ExamListControls
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
				total={total}
				limit={limit}
				onLimitChange={setLimit}
				startIndex={startIndex}
				endIndex={endIndex}
			/>
			{exams.length === 0 ? (
				<Text>No colposcopy exams found.</Text>
			) : (
				<List spacing='md'>
					{exams.map((exam) => (
						<ExamListItem
							key={exam.id}
							exam={exam}
						/>
					))}
				</List>
			)}
		</Container>
	);
};

export default ColposcopyExamsList;
