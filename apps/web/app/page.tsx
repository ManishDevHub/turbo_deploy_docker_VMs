import prisma from '../../../packages/db'
export const dynamic = "force-dynamic";

export default async function Home() {
const users = await prisma.user.findMany();
  return (
    <div>
      { JSON.stringify(users) }
      this is my userData and nextjs frontend
    </div>
  )
}
