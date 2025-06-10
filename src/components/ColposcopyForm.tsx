import {
	Group,
	Title,
	Text,
	Stack,
	Grid,
	TextInput,
	Textarea,
	Image,
	FileInput,
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

	const [sansPrepImage, setSansPrepImage] = useState<File | null>(null);
	const [acAcetImage, setAcAcetImage] = useState<File | null>(null);
	const [lugolImage, setLugolImage] = useState<File | null>(null);
	const [vaginImage, setVaginImage] = useState<File | null>(null);

	const fileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const handleGeneratePdf = async () => {
		const formattedLastMenstrualPeriod = lastMenstrualPeriod
			? new Date(lastMenstrualPeriod).toLocaleDateString("fr-FR")
			: "";
		const formattedExaminationDate = examinationDate
			? new Date(examinationDate).toLocaleDateString("fr-FR")
			: "";

		const formData = {
			patientLastName: patientLastName,
			patientFirstName: patientFirstName,
			patientAge: patientAge,
			treatingDoctor: treatingDoctor,
			lastMenstrualPeriod: formattedLastMenstrualPeriod,
			examinationDate: formattedExaminationDate,
			parity: parity,
			medicalHistory: medicalHistory,
			indication: indication,
			conclusion: conclusion,
			actionPlan: actionPlan,
			sansPrepImage: sansPrepImage ? await fileToBase64(sansPrepImage) : null,
			acAcetImage: acAcetImage ? await fileToBase64(acAcetImage) : null,
			lugolImage: lugolImage ? await fileToBase64(lugolImage) : null,
			vaginImage: vaginImage ? await fileToBase64(vaginImage) : null,
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
				const data = await response.json();
				if (data.success) {
					// Open the PDF in a new tab
					window.open(
						`http://localhost:3001/exams/${data.examId}/pdf`,
						"_blank"
					);
				} else {
					alert("Failed to generate PDF: " + data.error);
				}
			} else {
				const errorData = await response.json();
				alert(
					"Failed to generate PDF: " + (errorData.error || "Unknown error")
				);
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
						<FileInput
							label='Upload image'
							placeholder='No file selected'
							value={sansPrepImage}
							onChange={setSansPrepImage}
						/>
						{sansPrepImage && (
							<Image
								src={URL.createObjectURL(sansPrepImage)}
								alt='Sans Prep Preview'
								h={200}
								fit='contain'
							/>
						)}
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
						<FileInput
							label='Upload image'
							placeholder='No file selected'
							value={acAcetImage}
							onChange={setAcAcetImage}
						/>
						{acAcetImage && (
							<Image
								src={URL.createObjectURL(acAcetImage)}
								alt='Ac. Acet Preview'
								h={200}
								fit='contain'
							/>
						)}
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
						<FileInput
							label='Upload image'
							placeholder='No file selected'
							value={lugolImage}
							onChange={setLugolImage}
						/>
						{lugolImage && (
							<Image
								src={URL.createObjectURL(lugolImage)}
								alt='Lugol Preview'
								h={200}
								fit='contain'
							/>
						)}
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
						<FileInput
							label='Upload image'
							placeholder='No file selected'
							value={vaginImage}
							onChange={setVaginImage}
						/>
						{vaginImage && (
							<Image
								src={URL.createObjectURL(vaginImage)}
								alt='Vagin Preview'
								h={200}
								fit='contain'
							/>
						)}
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
