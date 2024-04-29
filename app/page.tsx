// app/page.tsx
'use client'
import { Link } from '@chakra-ui/next-js'

export default function Page() {
  return (
    <>
    <Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
      About
    </Link>
    <br/>
    <Link href='/me' color='blue.400' _hover={{ color: 'blue.500' }}>
      Me
    </Link>
    <br/>
    <Link href='/lunch' color='blue.400' _hover={{ color: 'blue.500' }}>
      Lunch
    </Link>
    <br/>
    <Link href='/dinner' color='blue.400' _hover={{ color: 'blue.500' }}>
      Dinner
    </Link>
    </>
  )
}