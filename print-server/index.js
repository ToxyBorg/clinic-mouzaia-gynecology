const express = require('express');
const { PDFDocument } = require('pdf-lib');
const fs = require('node:fs/promises');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Test database connection on startup
prisma.$connect()
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });

const app = express();
const port = 3001; // Choose a port that doesn't conflict with your Vite app

app.use(express.json({ limit: '50mb' }));

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Vite's default port
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Endpoint to check server status
app.get('/', (req, res) => {
    res.send('Print server is running!');
});

app.get('/colposcopy/list-fields', async (req, res) => {
    try {
        const pdfPath = path.join(__dirname, 'EXAMEN COLPOSCOPIQUE CLINIQUE MOUZAIA.pdf');
        const existingPdfBytes = await fs.readFile(pdfPath);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();

        const fieldNames = fields.map(field => field.getName());

        res.json({ fieldNames });
    } catch (error) {
        console.error('Error listing PDF fields:', error);
        res.status(500).send('Error listing PDF fields');
    }
});

app.post('/colposcopy/generate-pdf', async (req, res) => {
    try {
        const formData = req.body;
        console.log('Server received form data:', formData);

        // Validate required fields
        if (!formData.patientFirstName || !formData.patientLastName || !formData.patientAge) {
            console.error('Missing required fields');
            return res.status(400).send('Missing required fields');
        }

        const pdfPath = path.join(__dirname, 'EXAMEN COLPOSCOPIQUE CLINIQUE MOUZAIA.pdf');
        const existingPdfBytes = await fs.readFile(pdfPath);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();

        // --- IMPORTANT: Update these field names to match your PDF's actual field names ---
        // You'll need to inspect your PDF to get the exact field names.
        // Example field names based on the screenshot (these might not be exact!):
        const fieldMappings = {
            patientLastName: 'patientLastName',
            patientFirstName: 'patientFirstName',
            patientAge: 'patientAge',
            treatingDoctor: 'treatingDoctor',
            lastMenstrualPeriod: 'lastMenstrualPeriod',
            examinationDate: 'examinationDate',
            parity: 'parity',
            medicalHistory: 'medicalHistory',
            indication: 'indication',
            conclusion: 'conclusion',
            actionPlan: 'actionPlan',
            // 'Widget': 'Widget', // Consider if this is an intentional field
        };

        for (const key in fieldMappings) {
            if (formData[key] !== undefined) {
                try {
                    const field = form.getTextField(fieldMappings[key]);
                    field.setText(String(formData[key]));
                } catch (error) {
                    console.warn(`Field '${fieldMappings[key]}' not found or not a text field: ${error.message}`);
                }
            }
        }

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        if (formData.sansPrepImage) {
            const imageBytes = formData.sansPrepImage.split(';base64,').pop();
            let embeddedImage;
            if (formData.sansPrepImage.startsWith('data:image/png')) {
                embeddedImage = await pdfDoc.embedPng(imageBytes);
            } else if (formData.sansPrepImage.startsWith('data:image/jpeg')) {
                embeddedImage = await pdfDoc.embedJpg(imageBytes);
            } else {
                console.warn('Unsupported image format for sansPrepImage');
            }

            if (embeddedImage) {
                const x = 5.5 * (72 / 25.4); // Convert to points
                const y = 102 * (72 / 25.4); // Convert to points
                const width = 93 * (72 / 25.4); // Convert to points
                const height = 61 * (72 / 25.4); // Convert to points

                firstPage.drawImage(embeddedImage, { x, y, width, height });
            }
        }

        if (formData.acAcetImage) {
            const imageBytes = formData.acAcetImage.split(';base64,').pop();
            let embeddedImage;
            if (formData.acAcetImage.startsWith('data:image/png')) {
                embeddedImage = await pdfDoc.embedPng(imageBytes);
            } else if (formData.acAcetImage.startsWith('data:image/jpeg')) {
                embeddedImage = await pdfDoc.embedJpg(imageBytes);
            } else {
                console.warn('Unsupported image format for acAcetImage');
            }

            if (embeddedImage) {
                const x = 105 * (72 / 25.4); // Convert 103mm to points
                const y = 102 * (72 / 25.4); // Convert 102mm to points
                const width = 93 * (72 / 25.4); // Convert 92mm to points
                const height = 61 * (72 / 25.4); // Convert 61mm to points

                firstPage.drawImage(embeddedImage, { x, y, width, height });
            }
        }

        if (formData.lugolImage) {
            const imageBytes = formData.lugolImage.split(';base64,').pop();
            let embeddedImage;
            if (formData.lugolImage.startsWith('data:image/png')) {
                embeddedImage = await pdfDoc.embedPng(imageBytes);
            } else if (formData.lugolImage.startsWith('data:image/jpeg')) {
                embeddedImage = await pdfDoc.embedJpg(imageBytes);
            } else {
                console.warn('Unsupported image format for lugolImage');
            }

            if (embeddedImage) {
                const x = 5.5 * (72 / 25.4); // Convert 5.50mm to points
                const y = 34.5 * (72 / 25.4); // Convert 40mm to points
                const width = 93 * (72 / 25.4); // Convert 93mm to points
                const height = 61 * (72 / 25.4); // Convert 61mm to points

                firstPage.drawImage(embeddedImage, { x, y, width, height });
            }
        }

        if (formData.vaginImage) {
            const imageBytes = formData.vaginImage.split(';base64,').pop();
            let embeddedImage;
            if (formData.vaginImage.startsWith('data:image/png')) {
                embeddedImage = await pdfDoc.embedPng(imageBytes);
            } else if (formData.vaginImage.startsWith('data:image/jpeg')) {
                embeddedImage = await pdfDoc.embedJpg(imageBytes);
            } else {
                console.warn('Unsupported image format for vaginImage');
            }

            if (embeddedImage) {
                const x = 105 * (72 / 25.4); // Convert 105mm to points
                const y = 34.5 * (72 / 25.4); // Convert 40mm to points
                const width = 93 * (72 / 25.4); // Convert 93mm to points
                const height = 61 * (72 / 25.4); // Convert 61mm to points

                firstPage.drawImage(embeddedImage, { x, y, width, height });
            }
        }

        const pdfBytes = await pdfDoc.save();
        console.log('PDF generated successfully, size:', pdfBytes.length, 'bytes');

        try {
            console.log('Attempting to save to database...');
            // Save the generated PDF to the database
            const exam = await prisma.colposcopyExam.create({
                data: {
                    patientName: formData.patientFirstName + ' ' + formData.patientLastName,
                    patientAge: parseInt(formData.patientAge, 10),
                    patientFileNumber: formData.patientFileNumber || 'N/A',
                    examDate: formData.examinationDate ? new Date(formData.examinationDate.split('/').reverse().join('-')) : new Date(),
                    doctorName: formData.treatingDoctor || 'N/A',
                    indication: formData.indication || 'N/A',
                    findings: formData.medicalHistory || 'N/A',
                    conclusion: formData.conclusion || 'N/A',
                    recommendations: formData.actionPlan || 'N/A',
                    pdfData: pdfBytes,
                    pdfFileName: 'colposcopy_exam_report.pdf',
                    notes: formData.notes || null,
                    status: 'COMPLETED'
                }
            });
            console.log('Successfully saved exam to database with ID:', exam.id);

            // Return the exam ID and success message instead of the PDF
            res.json({
                success: true,
                examId: exam.id,
                message: 'Exam generated successfully'
            });

        } catch (dbError) {
            console.error('Database error:', dbError);
            res.status(500).json({
                success: false,
                error: 'Failed to save exam to database'
            });
        }

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({
            success: false,
            error: 'Error generating PDF'
        });
    }
});

// Add a new endpoint to get PDF preview
app.get('/colposcopy/exams/:id/pdf', async (req, res) => {
    try {
        const exam = await prisma.colposcopyExam.findUnique({
            where: { id: req.params.id },
            select: { pdfData: true }
        });

        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=colposcopy_exam_report.pdf');
        res.send(Buffer.from(exam.pdfData));
    } catch (error) {
        console.error('Error fetching PDF:', error);
        res.status(500).json({ error: 'Failed to fetch PDF' });
    }
});

// Add a test endpoint to check database connection
app.get('/colposcopy/test-db', async (req, res) => {
    try {
        const examCount = await prisma.colposcopyExam.count();
        res.json({
            status: 'Database connection successful',
            examCount: examCount
        });
    } catch (error) {
        console.error('Database test failed:', error);
        res.status(500).json({
            status: 'Database connection failed',
            error: error.message
        });
    }
});

// Add a new endpoint to list all generated exams
app.get('/colposcopy/exams', async (req, res) => {
    try {
        const exams = await prisma.colposcopyExam.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                patientName: true,
                examDate: true,
                doctorName: true,
                status: true,
                createdAt: true
            }
        });

        res.json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ error: 'Failed to fetch exams' });
    }
});

app.listen(port, () => {
    console.log(`Print server listening at http://localhost:${port}`);
}); 