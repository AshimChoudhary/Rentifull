import { NAVBAR_HEIGHT } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'aws-amplify/auth';
import { Bell, MessageCircle, Plus, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Navbar = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();
  const pathName = usePathname();

  const isDashboardPage =
    pathName.includes('/managers') || pathName.includes('/tenants');

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <div
      className="fixed top-0 w-full left-0 z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-zinc-800 text-white">
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/"
            className="cursor-pointer hover:text-amber-50"
            scroll={false}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="RentiFull"
                width={24}
                height={24}
                className="w-6 h-6"
              />

              <div className="text-xl font-bold">
                RENT
                <span className="text-red-400 font-light hover:text-amber-50">
                  IFUL
                </span>
              </div>
            </div>
          </Link>

          {isDashboardPage && authUser && (
            <Button
              variant={'secondary'}
              className="md:ml-4 bg-rose-50 text-gray-900 hover:bg-red-400 hover:text-rose-300"
              onClick={() =>
                router.push(
                  authUser.userRole?.toLowerCase() === 'manager'
                    ? '/managers/newproperty'
                    : '/search'
                )
              }
            >
              {authUser.userRole?.toLowerCase() === 'manager' ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Add New Property</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ml-2">
                    Search Properties
                  </span>
                </>
              )}
            </Button>
          )}
        </div>
        {isDashboardPage && (
          <p className="text-amber-50 hidden md:block">
            Discover your perfect rental apartment with our advanced search
          </p>
        )}
        <div className="flex items-center gap-5">
          {authUser ? (
            <>
              <div className="relative hidden md:block">
                <MessageCircle className="w-6 h-6 cursor-pointer text-gray-300 hover:text-gray-500" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-800 rounded-full" />
              </div>

              <div className="relative hidden md:block">
                <Bell className="w-6 h-6 cursor-pointer text-gray-300 hover:text-gray-500" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-800 rounded-full" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                  <Avatar>
                    <AvatarImage src={authUser.userInfo?.image} />
                    <AvatarFallback className="bg-stone-600">
                      {authUser.userRole?.[0].toUpperCase()}
                    </AvatarFallback>
                    <p className="text-gray-300 hidden md:block">
                      {authUser.userInfo?.name}
                    </p>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-gray-800">
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-gray-800 hover:!text-rose-100 font-bold"
                    onClick={() =>
                      router.push(
                        authUser.userRole?.toLowerCase() === 'manager'
                          ? '/managers/properties'
                          : '/tenants/favorites',
                        { scroll: false }
                      )
                    }
                  >
                    Go to Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-rose-300" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-gray-800 hover:!text-rose-100 "
                    onClick={() =>
                      router.push(
                        `${authUser.userRole?.toLowerCase()}s/settings`,
                        { scroll: false }
                      )
                    }
                  >
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-rose-300" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-gray-800 hover:!text-rose-100 "
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="text-white border-white bg-transparent hover:bg-white hover:text-zinc-800 rounded-lg"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="bg-red-500 hover:bg-white hover:text-zinc-800 rounded-lg"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
