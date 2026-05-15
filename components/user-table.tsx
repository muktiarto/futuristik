import { getUsers } from "@/lib/data";
import { resetUserPoint } from "@/lib/action";


const UserTable = async () => {
    const users = await getUsers();
    if (!users?.length)return <h1 className="text-2xl">No User Found</h1>
  return (
    <table className='w-full bg-white mt-3'>
        <thead className='border-b border-gray-100'>
            <tr>
                <th className='py-3 px-6 text-left text-sm'>Name</th>
                <th className='py-3 px-6 text-left text-sm'>Email</th>
                <th className='py-3 px-6 text-left text-sm'>Role</th>
                <th className='py-3 px-6 text-left text-sm'>Point</th>
                <th className='py-3 px-6 text-left text-sm'>Action</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user)=>(
            <tr key={user.id}>
                <td className='py-3 px-6'>{user.name}</td>
                <td className='py-3 px-6'>{user.email}</td>
                <td className='py-3 px-6'>{user.role}</td>
                <td className='py-3 px-6'>
                ⭐ {user.point}
                </td>
                <td className='py-3 px-6'>
                <form
                    action={async () => {
                    "use server";
                    await resetUserPoint(user.id);
                    }}>
                    <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm">
                    Reset Point
                    </button>
                </form>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
  )
}

export default UserTable