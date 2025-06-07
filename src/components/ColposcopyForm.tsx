import {
	Group,
	Title,
	Text,
	Stack,
	Grid,
	TextInput,
	Textarea,
	Image,
	Button,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useState } from "react";

const ColposcopyForm: React.FC = () => {
	const [patientLastName, setPatientLastName] = useState("");
	const [patientFirstName, setPatientFirstName] = useState("");
	const [patientAge, setPatientAge] = useState<number | "">("");
	const [treatingDoctor, setTreatingDoctor] = useState("");
	const [lastMenstrualPeriod, setLastMenstrualPeriod] = useState<string | null>(
		null
	);
	const [examinationDate, setExaminationDate] = useState<string | null>(null);
	const [parity, setParity] = useState("");
	const [medicalHistory, setMedicalHistory] = useState("");
	const [indication, setIndication] = useState("");
	const [conclusion, setConclusion] = useState("");
	const [actionPlan, setActionPlan] = useState("");

	const handleGeneratePdf = async () => {
		const formData = {
			patientLastName: patientLastName,
			patientFirstName: patientFirstName,
			patientAge: patientAge,
			treatingDoctor: treatingDoctor,
			lastMenstrualPeriod: lastMenstrualPeriod
				? new Date(lastMenstrualPeriod).toLocaleDateString("fr-FR")
				: "",
			examinationDate: examinationDate
				? new Date(examinationDate).toLocaleDateString("fr-FR")
				: "",
			parity: parity,
			medicalHistory: medicalHistory,
			indication: indication,
			conclusion: conclusion,
			actionPlan: actionPlan,
		};

		console.log("Form data being sent to server:", formData);

		try {
			const response = await fetch("http://localhost:3001/generate-pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = "colposcopy_exam_report.pdf";
				document.body.appendChild(a);
				a.click();
				a.remove();
				window.URL.revokeObjectURL(url);
			} else {
				alert("Failed to generate PDF: " + (await response.text()));
			}
		} catch (error) {
			console.error("Error sending data to print server:", error);
			alert("Error connecting to print server.");
		}
	};

	return (
		<Stack>
			{/* Clinic Header */}
			<Group justify='space-between'>
				<Stack gap='xs'>
					<Title order={4}>CLINIQUE MOUZAIA</Title>
					<Text size='sm'>Tel/Fax: 025373768</Text>
					<Text size='sm'>contact@clinic-mouzaia.com</Text>
					<Text size='sm'>
						41 Rue Hattab Ameur, Mouzaia
						<br />
						Blida
					</Text>
				</Stack>
				<Title
					order={2}
					style={{ textAlign: "center", flexGrow: 1 }}
				>
					EXAMEN COLPOSCOPIQUE
				</Title>
				{/* Clinic Logo */}
				<Image
					src='/clinique CM Logo.png'
					alt='Clinic Logo'
					h={100}
					w='auto'
					fit='contain'
				/>
			</Group>

			{/* Patient Information */}
			<Grid
				gutter='md'
				mt='lg'
			>
				<Grid.Col span={{ base: 12, md: 5 }}>
					<TextInput
						label='Nom:'
						placeholder='Nom du patient'
						styles={{
							label: { display: "flex", justifyContent: "flex-start" },
						}}
						value={patientLastName}
						onChange={(event) => setPatientLastName(event.currentTarget.value)}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 5 }}>
					<TextInput
						label='Prénom:'
						placeholder='Prénom du patient'
						styles={{
							label: { display: "flex", justifyContent: "flex-start" },
						}}
						value={patientFirstName}
						onChange={(event) => setPatientFirstName(event.currentTarget.value)}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 2 }}>
					<TextInput
						label='Age:'
						placeholder='Age du patient'
						type='number'
						styles={{
							label: { display: "flex", justifyContent: "flex-start" },
						}}
						value={patientAge}
						onChange={(event) =>
							setPatientAge(Number(event.currentTarget.value))
						}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<TextInput
						label='Médecin traitant:'
						placeholder='Nom du médecin'
						styles={{
							label: { display: "flex", justifyContent: "flex-start" },
						}}
						value={treatingDoctor}
						onChange={(event) => setTreatingDoctor(event.currentTarget.value)}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<Grid gutter='md'>
						<Grid.Col span={6}>
							<DateInput
								label='DDR:'
								placeholder='JJ / MM / AAAA'
								valueFormat='DD/MM/YYYY'
								styles={{
									label: { display: "flex", justifyContent: "flex-start" },
								}}
								value={lastMenstrualPeriod}
								onChange={setLastMenstrualPeriod}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<DateInput
								label='Le:'
								placeholder='JJ / MM / AAAA'
								valueFormat='DD/MM/YYYY'
								styles={{
									label: { display: "flex", justifyContent: "flex-start" },
								}}
								value={examinationDate}
								onChange={setExaminationDate}
							/>
						</Grid.Col>
					</Grid>
				</Grid.Col>
				<Grid.Col span={12}>
					<TextInput
						label='Parité:'
						placeholder='Ex: 0, 1, 2...'
						styles={{
							label: { display: "flex", justifyContent: "flex-start" },
						}}
						value={parity}
						onChange={(event) => setParity(event.currentTarget.value)}
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<Textarea
						label='Antécédents:'
						placeholder='Antécédents médicaux'
						autosize
						minRows={2}
						styles={{
							label: { display: "flex", justifyContent: "flex-start" },
						}}
						value={medicalHistory}
						onChange={(event) => setMedicalHistory(event.currentTarget.value)}
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<Textarea
						label='Indication:'
						placeholder="Indication de l'examen"
						autosize
						minRows={2}
						styles={{
							label: { display: "flex", justifyContent: "flex-start" },
						}}
						value={indication}
						onChange={(event) => setIndication(event.currentTarget.value)}
					/>
				</Grid.Col>
			</Grid>

			{/* Examination Diagrams - Placeholders for now */}
			<Grid
				gutter='md'
				mt='lg'
			>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<Stack gap='md'>
						<Title
							order={5}
							styles={{ root: { textAlign: "left" } }}
						>
							Sans Prep.
						</Title>
						<div
							style={{
								border: "1px solid #ccc",
								height: 200,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Diagram Placeholder</Text>
						</div>
					</Stack>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<Stack gap='md'>
						<Title
							order={5}
							styles={{ root: { textAlign: "left" } }}
						>
							Ac. Acet.
						</Title>
						<div
							style={{
								border: "1px solid #ccc",
								height: 200,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Diagram Placeholder</Text>
						</div>
					</Stack>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<Stack gap='md'>
						<Title
							order={5}
							styles={{ root: { textAlign: "left" } }}
						>
							Lugol
						</Title>
						<div
							style={{
								border: "1px solid #ccc",
								height: 200,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Diagram Placeholder</Text>
						</div>
					</Stack>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<Stack gap='md'>
						<Title
							order={5}
							styles={{ root: { textAlign: "left" } }}
						>
							Vagin
						</Title>
						<div
							style={{
								border: "1px solid #ccc",
								height: 200,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Diagram Placeholder</Text>
						</div>
					</Stack>
				</Grid.Col>
			</Grid>

			{/* Conclusion and Conduct */}
			<Grid
				gutter='md'
				mt='lg'
			>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<Textarea
						label='Conclusion:'
						placeholder="Conclusion de l'examen"
						autosize
						minRows={4}
						styles={{
							label: { display: "flex", justifyContent: "flex-start" },
						}}
						value={conclusion}
						onChange={(event) => setConclusion(event.currentTarget.value)}
					/>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<Textarea
						label='Conduite à tenir:'
						placeholder='Conduite à tenir'
						autosize
						minRows={4}
						styles={{
							label: { display: "flex", justifyContent: "flex-start" },
						}}
						value={actionPlan}
						onChange={(event) => setActionPlan(event.currentTarget.value)}
					/>
				</Grid.Col>
			</Grid>

			<Button
				onClick={handleGeneratePdf}
				mt='xl'
			>
				Generate PDF Report
			</Button>
		</Stack>
	);
};

export default ColposcopyForm;
