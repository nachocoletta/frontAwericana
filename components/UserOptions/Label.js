import Link from 'next/link'

export function Label ({ children, href, red = false, Icon, ...props }) {
  return (
    <Link href={href} {...props} className='flex items-center gap-5 border-b-grayish py-4 border-b-[1px]'>
      <Icon className={`${red ? 'fill-red' : 'fill-primary'}`} />
      {children}
    </Link>
  )
}
