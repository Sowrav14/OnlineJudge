
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import dayjs from 'dayjs'

async function main() {
  console.log("🌱 Seeding database...");

  // 🌟 Create Users
  const users = await prisma.user.createMany({
    data: [
      { id: "u1", name: "Alice", email: "alice@example.com", password: "password123" },
      { id: "u2", name: "Bob", email: "bob@example.com", password: "password456" },
      { id: "u3", name: "Charlie", email: "charlie@example.com", password: "password789" }
    ],
    skipDuplicates: true
  });

  // 🌟 Create Problems
  const problems = await prisma.problem.createMany({
    data: [
        {
            id: "1",
            title: "Let's Get The Sum",
            author: "Sowrav Nath",
            tag: "bruteforce",
            statement: "In a world where numbers collide and calculations reign supreme, one question echoes through the realms of programming: Can you harness the power of iteration and accumulation to unveil the elusive sum of an array?\nStep into the challenge where every element counts, and the answer is just a loop away! 🚀",
            input: "The first line contains an integer N (1 ≤ N ≤ 100), representing the number of elements in the array. The second line contains N space-separated integers (-10^6 ≤ Ai ≤ 10^6), denoting the elements of the array.",
            output: "Print a single integer, the sum of the elements in the array.",
            constrains: "1 ≤ N ≤ 100\n-10^6 ≤ Ai ≤ 10^6",
            sampleInput: "3\n1 2 3",
            sampleOutput: "6",
            time: 1,
            memory: 128
        },
        { 
            id: "2", 
            title: "Strong Connectivity Strikes Back",
            author: "Sowrav Nath",
            tag: 'bruteforce', 
            statement: "A new battle unfolds in the realm of networks, as strong connectivity emerges as the ultimate challenge.\nWill you be the one to conquer the unknown and restore connectivity? But before all that, let's simply test your ability to reverse a string and showcase your strength!",
            input: "A single string of up to 100 characters.",
            output: "Print the reversed string.",
            constrains: "1 ≤ length of string ≤ 100",
            sampleInput: "hello",
            sampleOutput: "olleh",
            time: 1, 
            memory: 128
        },
        { 
            id: "3", 
            title: "Alice, Bob and Two Arrays", 
            author: "Sowrav Nath",
            tag: 'bruteforce', 
            statement: "Alice and Bob are stuck in a parallel universe where arrays hold the key to their escape.\nHowever, their task is simple: Calculate the sum of the elements in two arrays and add them together. The trick lies in the array's order and the power of accumulation!",
            input: "Two arrays of integers. The first array contains N elements, and the second array contains M elements.",
            output: "Print the sum of all elements in both arrays.",
            constrains: "1 ≤ N, M ≤ 100",
            sampleInput: "1 2 3\n4 5 6",
            sampleOutput: "21",
            time: 1, 
            memory: 128 
        },
        { 
            id: "4", 
            title: "Another Folding Strip", 
            author: "Sowrav Nath",
            tag: 'bruteforce', 
            statement: "In a land filled with origami artists, there lies a challenge: Fold a strip of paper as many times as you can, and at the end of each fold, calculate the sum of the current folded strip's length.\nBut first, let's test your ability to multiply two numbers and feel the rhythm of folding!",
            input: "Two integers, A and B, where A is the first number, and B is the second number.",
            output: "Print the product of the two numbers.",
            constrains: "-10^6 ≤ A, B ≤ 10^6",
            sampleInput: "3 5",
            sampleOutput: "15",
            time: 1, 
            memory: 128
        },
        { 
            id: "5", 
            title: "Binary Sequence Value Sum", 
            author: "Sowrav Nath",
            tag: 'bruteforce',  
            statement: "In the world of binary sequences, each bit holds immense value. Alice and Bob are trying to decode the secret binary sequence that holds the key to ultimate power.\nBut before they decode it, they need to check if the given number is prime. Start simple and see how far your knowledge takes you!",
            input: "A single integer N (1 ≤ N ≤ 100), representing the number to check if it's prime.",
            output: "Print 'YES' if the number is prime, otherwise print 'NO'.",
            constrains: "1 ≤ N ≤ 100",
            sampleInput: "7",
            sampleOutput: "YES",
            time: 1, 
            memory: 128
        },
        { 
            id: "6", 
            title: "Secret Lilies and Roses", 
            author: "Sowrav Nath",
            tag: 'bruteforce',
            statement: "In the garden of secrets, lilies and roses hold the key to unlocking the greatest mysteries.\nBut to reach this secret garden, you first need to solve a basic problem: Add two numbers. A simple task, yet the consequences are profound.",
            input: "Two integers, A and B, where A is the first number, and B is the second number.",
            output: "Print the sum of the two numbers.",
            constrains: "-10^6 ≤ A, B ≤ 10^6",
            sampleInput: "3 4",
            sampleOutput: "7",
            time: 1, 
            memory: 128
        },
        { 
            id: "7", 
            title: "Three Dimensional Embedding", 
            author: "Sowrav Nath",
            tag: 'bruteforce', 
            statement: "In the land of 3D printing, only the bravest attempt to embed objects into three dimensions.\nBut before embarking on the journey to embed, let’s first tackle the challenge of dividing two numbers to understand the ratio of scaling between dimensions.",
            input: "Two integers A and B, where A is the dividend, and B is the divisor.",
            output: "Print the result of A divided by B.",
            constrains: "-10^6 ≤ A, B ≤ 10^6, B ≠ 0",
            sampleInput: "8 4",
            sampleOutput: "2",
            time: 1, 
            memory: 128
        },
        { 
            id: "8", 
            title: "Control Towers", 
            author: "Sowrav Nath",
            tag: 'bruteforce',  
            statement: "In the world of towering structures, control towers play a crucial role.\nBut before you can control the world’s greatest tower, let’s ensure you know how to reverse a number. Only then can you proceed to more advanced calculations and challenges!",
            input: "A single integer N, where 1 ≤ N ≤ 100.",
            output: "Print the reverse of the number.",
            constrains: "1 ≤ N ≤ 100",
            sampleInput: "123",
            sampleOutput: "321",
            time: 1, 
            memory: 128
        },
        { 
            id: "9", 
            title: "LeaFall", 
            author: "Sowrav Nath",
            tag: 'bruteforce', 
            statement: "LeaFall is a challenging journey through an unknown dimension.\nBut before you can fall into the unknown, you must first understand the basics of multiplication. Can you multiply two numbers to start your journey?",
            input: "Two integers A and B, where A is the first number, and B is the second number.",
            output: "Print the product of the two numbers.",
            constrains: "-10^6 ≤ A, B ≤ 10^6",
            sampleInput: "2 3",
            sampleOutput: "6",
            time: 1, 
            memory: 128
        },
        { 
            id: "10", 
            title: "Having Been a Treasurer in the Past. I Help Goblins Deceive", 
            author: "Sowrav Nath",
            tag: 'bruteforce', 
            statement: "A past treasurer, now turned adventurer, helps goblins deceive the kingdom.\nBut before that, you must first perform a basic task: Check if a number is divisible by 5. The consequences of your answer will echo throughout the kingdom!",
            input: "A single integer N (1 ≤ N ≤ 100).",
            output: "Print 'YES' if N is divisible by 5, otherwise print 'NO'.",
            constrains: "1 ≤ N ≤ 100",
            sampleInput: "10",
            sampleOutput: "YES",
            time: 1, 
            memory: 128
        }
    ],
    skipDuplicates: true
  });

  // 🌟 Create Submissions
  await prisma.submission.createMany({
    data: [
        { 
            submissionId: "s1", problemId: "1", userId: "u1", 
            language: "C++", code : "this is sample code for seed",
            verdict: "Accepted", totalTest: 10, passedTest: 10, time: 0.5, memory: 64 
        },
        { 
            submissionId: "s2", problemId: "1", userId: "u2", 
            language: "Python", code : "this is sample code for seed",
            verdict: "Wrong Answer", totalTest: 10, passedTest: 7, time: 1.2, memory: 128 
        },
        { 
            submissionId: "s3", problemId: "1", userId: "u3", 
            language: "Javascript", code : "this is sample code for seed",
            verdict: "Time Limit Exceeded", totalTest: 5, passedTest: 3, time: 2.5, memory: 256 
        },
        { 
            submissionId: "s4", problemId: "2", userId: "u1", 
            language: "C++", code : "this is sample code for seed",
            verdict: "Memory Limit Exceeded", totalTest: 5, passedTest: 3, time: 2.5, memory: 256 
        },
        { 
            submissionId: "s5", problemId: "1", userId: "u2", 
            language: "Java", code : "this is sample code for seed",
            verdict: "Rumtime Error", totalTest: 5, passedTest: 3, time: 2.5, memory: 256 
        }

    ],
    skipDuplicates: true
  });

  console.log("✅ Database seeded successfully!");
}

// Run seeding function
main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
