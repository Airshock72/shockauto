import { useState } from 'react'
import { type CurrentUser, getCurrentUser } from 'src/core/helpers/auth.ts'

const useCurrentUser = (): CurrentUser => {
  const [user] = useState(getCurrentUser)
  return user
}

export default useCurrentUser
