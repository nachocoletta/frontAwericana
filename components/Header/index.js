import { Search } from '@/components/Search'
import { Small } from '@/components/Logo/Small'
import { Big } from '../Logo/Big'
import { UserOptions } from '@/components/UserOptions'
import { Cart } from '../Cart'

export function Header ({ disabled = false, children }) {
  return (
    <header className='flex w-screen justify-around items-center h-[96px] p-layoutSides gap-2 z-10 shadow-down '>
        <Small className='min-w-[20px] max-w-[48px] cursor-pointer lg:hidden' />
        <Big className='w-[150px] hidden cursor-pointer lg:inline-block' />
        {!children ? <Search disabled={disabled} /> : children}
        <section className='flex items-center justify-around gap-2 md:gap-8'>
          <UserOptions />
          <Cart />
      </section>
    </header>
  )
}
