import jwt from 'jsonwebtoken'

const tokenValidating = async (token) => {
  const { userId } = jwt.decode(token)
  const user = await fetch(`/api/users/${userId}`).then(res => res.json())
  console.log(user)
  return user
}

export default tokenValidating
