const API_BASE_URL = "http://localhost:3001";

export const COLPOSCOPY_ENDPOINTS = {
	LIST_FIELDS: `${API_BASE_URL}/colposcopy/list-fields`,
	GENERATE_PDF: `${API_BASE_URL}/colposcopy/generate-pdf`,
	GET_EXAM_PDF: (examId: string) =>
		`${API_BASE_URL}/colposcopy/exams/${examId}/pdf`,
	LIST_EXAMS: `${API_BASE_URL}/colposcopy/exams`,
	TEST_DB: `${API_BASE_URL}/colposcopy/test-db`,
} as const;
