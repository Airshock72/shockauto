import useRequireAuth from 'src/core/hooks/useRequireAuth.tsx'

const PrivateLayout = () => {
  const authRedirect = useRequireAuth()

  if (authRedirect) return authRedirect

  return (
    <div>its private layout</div>
  )
}

export default PrivateLayout