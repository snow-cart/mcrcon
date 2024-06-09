import { db } from "../server/db";

export async function getUserById(userId: string) {
  return db.user.findUnique({
    where: {
      id: userId,
    },
  });
}
