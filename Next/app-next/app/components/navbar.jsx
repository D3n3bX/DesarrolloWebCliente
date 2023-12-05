import Link from 'next/link'

function NavBar() {
    return (
        <nav className='bg-green-100 m-4 p-6'>
            <ul className='flex gap-4'>
              <Link href='./'>Home</Link>
              <Link href='./about'>About</Link>
              <Link href='./users'>Users</Link>
            </ul>
        </nav>
    )
}

export default NavBar
