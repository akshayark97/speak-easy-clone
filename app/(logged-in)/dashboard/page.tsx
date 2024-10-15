import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const clerkUser = await currentUser();

  const email = clerkUser?.emailAddresses?.[0].emailAddress ?? "";

  const sql = await getDbConnection();

  // update the user id
  let userId = null;

  const user = await sql`SELECT * FROM users where email=${email}`;
  if (user && user.length > 0) {
    // update the user_id in users table
    userId = clerkUser?.id;
    await sql`UPDATE users SET user_id = ${userId} WHERE email = ${email}`;
  }
  const response =
    await sql`SELECT * FROM users where status = 'active' AND email=${email}`;
  return <section>Dashboard status: {JSON.stringify(response)}</section>;
}
