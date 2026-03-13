import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ slug?: string[] }>
}

export default async function BlogRedirect({ params }: Props) {
  const { slug } = await params
  const path = slug ? `/thoughts/${slug.join('/')}` : '/thoughts'
  redirect(path)
}
