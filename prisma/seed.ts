import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    // Seed Students
    const student1 = await prisma.student.create({
        data: {
            name: 'John Doe',
            email: 'john@example.com',
            address: '123 Main St',
        },
    });

    const student2 = await prisma.student.create({
        data: {
            name: 'Jane Doe',
            email: 'jane@example.com',
            address: '456 Elm St',
        },
    });

    // Seed Subjects
    const subject1 = await prisma.subject.create({
        data: {
            studentId: student1.id,
            subjectName: 'Math',
            grade: 90.5,
        },
    });

    const subject2 = await prisma.subject.create({
        data: {
            studentId: student2.id,
            subjectName: 'Science',
            grade: 85.0,
        },
    });

    // Seed Attendances
    await prisma.attendance.createMany({
        data: [
            {
                subjectId: subject1.id,
                date: new Date(),
                attended: true,
            },
            {
                subjectId: subject2.id,
                date: new Date(),
                attended: false,
            },
        ],
    });

    console.log('Seed data inserted successfully');
}

seed()
    .catch((error) => {
        throw error;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
