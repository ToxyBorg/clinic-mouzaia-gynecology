const express = require('express');
const { PDFDocument } = require('pdf-lib');
const fs = require('node:fs/promises');
const path = require('path');

const app = express();
const port = 3001; // Choose a port that doesn't conflict with your Vite app

app.use(express.json({ limit: '50mb' }));

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust as needed for production
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

app.get('/list-fields', async (req, res) => {
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

app.post('/generate-pdf', async (req, res) => {
    try {
        const formData = req.body;
        console.log('Server received form data:', formData);

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

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=colposcopy_exam_report.pdf');
        res.send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

app.listen(port, () => {
    console.log(`Print server listening at http://localhost:${port}`);
}); 