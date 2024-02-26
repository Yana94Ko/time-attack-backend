import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient().$extends({
  query: {
    user: {
      async create({ model: _, operation: __, args, query }) {
        const { email } = args.data;
        const emailPrefix = email.split("@")[0];

        args.data = {
          ...args.data,
          profile: {
            create: {
              nickName: emailPrefix,
            },
          },
        };

        return query(args);
      },
    },
  },
});

export default prismaClient;
