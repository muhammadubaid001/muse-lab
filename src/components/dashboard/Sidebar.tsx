'use client'
import { NavLink } from '@/components/dashboard/NavLink'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Book, Category, Command, House, Profile2User, Trello, UserOctagon } from "iconsax-react"

export const Sidebar = () => {
    const pathname = usePathname()
    const { data } = useSession()
    return (
        <div className='flex md:flex-shrink-0 h-full bg-white shadow'>
            {/*{!user && <SmallLoader />}*/}
            <div className='flex flex-col w-80'>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className='flex flex-col flex-grow overflow-y-auto'>
                    <div className='flex-grow flex flex-col'>
                        <div className='mt-4'>
                            <div className='w-56 mx-auto my-3'>
                                <img
                                    alt='logo'
                                    src='/ndg_MuseLab_Primary%20Logo_Gold%20_%20300px.png'
                                    className='h-full w-full mx-auto object-contain'
                                />
                            </div>
                        </div>
                        <nav className='flex-1 mt-1'>
                            <NavLink
                                active={pathname === '/dashboard'}
                                label='Users' to='/dashboard'
                                icon={<Profile2User size="26" />}
                            />
                            <NavLink
                                active={pathname === '/dashboard/applications'}
                                label='Applications'
                                icon={<Category size="26" />}
                                to='/dashboard/applications'
                            />
                            {/*<NavLink*/}
                            {/*    active={pathname.includes('tenants')}*/}
                            {/*    label='Tenants'*/}
                            {/*    icon={<UserOctagon size="26"/>}*/}
                            {/*    to='/dashboard/tenants'*/}
                            {/*/>*/}
                            <NavLink
                                active={pathname === '/dashboard/tenants/orgs'}
                                label='Github Orgs'
                                icon={<UserOctagon size="26"/>}
                                to='/dashboard/tenants/orgs'
                            />
                            <NavLink
                                active={pathname === '/dashboard/tenants/repos'}
                                label='Github Repos'
                                icon={<Book size="26"/>}
                                to='/dashboard/tenants/repos'
                            />
                            <NavLink
                                active={pathname === '/dashboard/tenants/users'}
                                label='Github Users'
                                icon={<UserOctagon size="26"/>}
                                to='/dashboard/tenants/users'
                            />
                            <NavLink
                                active={ pathname.includes('jobs')}
                                label='Jobs'
                                icon={<Trello size="26"/>}
                                to='/dashboard/tenants/jobs'
                            />
                            <NavLink
                                active={pathname === '/dashboard/tenants/salesforce'}
                                label='Salesforce Orgs'
                                icon={<House size="26"/>}
                                to='/dashboard/tenants/salesforce'
                            />
                            <NavLink
                                active={pathname=== '/dashboard/tenants/plans'}
                                label='Plans'
                                icon={<Command size="26"/>}
                                to='/dashboard/tenants/plans'
                            />
                        </nav>
                    </div>
                </div>
                <div className='p-4'>
                    <div className='border-t w-full border-gray-200 flex items-center gap-4 py-5 pl-5'>
                        <div className='rounded-full overflow-hidden h-12 w-12'>
                            <img
                                alt='illustration'
                                className='h-full w-full rounded-full object-cover'
                                src={data?.user?.image || ''}
                            />
                        </div>
                        <div className=''>
                            <p className='text-gray-700 text-sm'>{data?.user?.email}</p>
                            <button type='button' onClick={() => signOut()} className="font-libre-sb text-primary-blue">
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
