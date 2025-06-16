const { PrismaClient } = require('@prisma/client');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

// Sample data for random generation
const firstNames = ['Sarah', 'Fatima', 'Amina', 'Leila', 'Nadia', 'Samira', 'Yasmine', 'Karima', 'Houda', 'Meriem'];
const lastNames = ['Benali', 'Hadj', 'Bouaziz', 'Khelifi', 'Mansouri', 'Boudjemaa', 'Hamidi', 'Ziani', 'Belkacem', 'Kaci'];
const doctors = ['Dr. Ahmed', 'Dr. Mohamed', 'Dr. Ali', 'Dr. Karim', 'Dr. Samir', 'Dr. Rachid', 'Dr. Yacine', 'Dr. Farid'];
const indications = [
    'Dépistage',
    'Suivi post-traitement',
    'Saignement anormal',
    'Douleur pelvienne',
    'Frottis anormal',
    'Suivi de grossesse'
];
const findings = [
    'Col normal',
    'Lésion suspecte',
    'Inflammation',
    'Polype cervical',
    'Ectropion',
    'Cervicite'
];
const conclusions = [
    'Examen normal',
    'Lésion bénigne',
    'Lésion suspecte nécessitant biopsie',
    'Inflammation à traiter',
    'Suivi à 6 mois recommandé'
];
const recommendations = [
    'Contrôle dans 6 mois',
    'Biopsie recommandée',
    'Traitement antibiotique',
    'Suivi gynécologique régulier',
    'Consultation urgente si symptômes'
];

// Function to get random item from array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Function to generate random date within last year
const getRandomDate = () => {
    const now = new Date();
    const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    return new Date(pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime()));
};

// Function to generate random exam data
const generateExamData = () => {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const examDate = getRandomDate();

    return {
        patientName: `${firstName} ${lastName}`,
        patientAge: Math.floor(Math.random() * 30) + 20, // Random age between 20 and 50
        patientFileNumber: `F${Math.floor(Math.random() * 10000)}`,
        examDate: examDate,
        doctorName: getRandomItem(doctors),
        indication: getRandomItem(indications),
        findings: getRandomItem(findings),
        conclusion: getRandomItem(conclusions),
        recommendations: getRandomItem(recommendations),
        status: 'COMPLETED',
        notes: Math.random() > 0.7 ? 'Notes additionnelles pour ce cas particulier.' : null
    };
};

// Function to generate a simple PDF
const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    page.drawText('Test PDF Document', {
        x: 50,
        y: height - 50,
        size: 20
    });

    return await pdfDoc.save();
};

// Main function to generate test data
const generateTestData = async () => {
    try {
        console.log('Starting test data generation...');

        // Generate 20 exams
        for (let i = 0; i < 20; i++) {
            const examData = generateExamData();
            const pdfBytes = await generatePDF();

            const exam = await prisma.colposcopyExam.create({
                data: {
                    ...examData,
                    pdfData: pdfBytes,
                    pdfFileName: `colposcopy_exam_${i + 1}.pdf`
                }
            });

            console.log(`Created exam ${i + 1}/20 with ID: ${exam.id}`);
        }

        console.log('Test data generation completed successfully!');
    } catch (error) {
        console.error('Error generating test data:', error);
    } finally {
        await prisma.$disconnect();
    }
};

// Run the script
generateTestData(); 