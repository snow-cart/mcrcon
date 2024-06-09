import { getUserById } from ".";

export async function getAdminStatus(userId: string): Promise<boolean> {
  const user = await getUserById(userId);
  if (user) return user.isAdmin;
  else {
    console.error("User not found");
    return false;
  }
}
