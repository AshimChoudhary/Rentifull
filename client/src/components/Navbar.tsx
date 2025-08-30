import { NAVBAR_HEIGHT } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {
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
        </div>
        <p className="text-amber-50 hidden md:block">
          Discover your perfect rental apartment with our advanced search
        </p>
        <div className="flex items-center gap-5">
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
        </div>
      </div>
    </div>
  );
};
export default Navbar;
