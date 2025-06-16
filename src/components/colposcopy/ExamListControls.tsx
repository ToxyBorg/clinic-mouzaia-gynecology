import React from "react";
import { TextInput, Group, Text, Select, Pagination } from "@mantine/core";

interface ExamListControlsProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	total: number;
	limit: number;
	onLimitChange: (limit: number) => void;
	startIndex: number;
	endIndex: number;
}

const PAGE_SIZE_OPTIONS = [
	{ value: "5", label: "5 per page" },
	{ value: "10", label: "10 per page" },
	{ value: "20", label: "20 per page" },
	{ value: "50", label: "50 per page" },
];

export const ExamListControls: React.FC<ExamListControlsProps> = ({
	searchQuery,
	onSearchChange,
	currentPage,
	totalPages,
	onPageChange,
	total,
	limit,
	onLimitChange,
	startIndex,
	endIndex,
}) => {
	return (
		<>
			<Group
				justify='space-between'
				mb='md'
			>
				<TextInput
					placeholder='Search by patient name, doctor, or status...'
					value={searchQuery}
					onChange={(event) => onSearchChange(event.currentTarget.value)}
					style={{ flex: 1 }}
				/>
				<Select
					value={limit.toString()}
					onChange={(value) => onLimitChange(parseInt(value || "10"))}
					data={PAGE_SIZE_OPTIONS}
					style={{ width: "150px" }}
				/>
			</Group>

			<Group
				justify='space-between'
				mb='md'
			>
				<Text
					size='sm'
					c='dimmed'
				>
					Showing {startIndex} to {endIndex} of {total} exams
				</Text>
				<Pagination
					total={totalPages}
					value={currentPage}
					onChange={onPageChange}
					withEdges
					withControls
					size='sm'
				/>
			</Group>
		</>
	);
};
