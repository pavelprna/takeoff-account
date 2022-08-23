export const signIn: ({
  username,
  password,
}: {
  username: string
  password: string
}) => Promise<{ id: number; token: string }> = async ({
  username,
  password,
}) => {
  try {
    const res = await fetch('http://localhost:3004/users/1')

    if (res.ok) return res.json()

    return Promise.reject(`Error ${res.status}`)
  } catch (error) {
    console.log(error)
  }
}
