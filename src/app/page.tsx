import { getProjectDescriptions } from '@/lib/articles'
import HomePage from '@/components/pages/HomePage'

export default async function Home() {
  const descriptions = await getProjectDescriptions()
  // Map is not serializable — convert to plain object for client component
  const projectDescriptions = Object.fromEntries(descriptions)
  return <HomePage projectDescriptions={projectDescriptions} />
}
