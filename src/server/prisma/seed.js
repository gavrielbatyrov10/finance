const prisma = require("../prisma");
const bcrypt = require("bcrypt");

const seed = async () => {
  for (let i = 0; i < 10; i++) {
    // Hash password for each user
    const hashedPassword = await bcrypt.hash(`password${i}`, 10);

    const user = await prisma.user.upsert({
      where: { username: `user${i}` }, 
      update: {},
      create: {
        username: `user${i}`,
        password: hashedPassword,
      },
    });

    await prisma.post.create({
      data: {
        title: `Post title ${i}`,
        content: `This is the content for post ${i}.`,
        userId: user.id, // Associate the post with the user
      },
    });
  }

  console.log(`Database has been seeded. 🌱`);
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });















//   const prisma = require("../prisma");
// const bcrypt = require("bcrypt");

// const seed = async () => {
//   for (let i = 0; i < 10; i++) {
//     // Hash password for each user
//     const hashedPassword = await bcrypt.hash(`password${i}`, 10);

//     const user = await prisma.user.upsert({
//       where: { email: `loch${i}@loch.com` },
//       update: {},
//       create: {
//         email: `loch${i}@loch.com`,
//         username: `user${i}`,  // Added username
//         password: hashedPassword,  // Add hashed password
//         // Add name or other fields if needed
//       },
//     });

//     await prisma.post.create({
//       data: {
//         title: `Post title ${i}`,
//         userId: user.id, // Associate the task with the user
//       },
//     });
//   }

//   console.log(`Database has been seeded. 🌱`);
// };

// seed()
//   .then(async () => await prisma.$disconnect())
//   .catch(async (err) => {
//     console.error(err);
//     await prisma.$disconnect();
//     process.exit(1);
//   });




