'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CalltoActionSection = () => {
  return (
    <div className="relative py-24">
      <Image
        src="/landing-call-to-action.jpg"
        alt="Rentiful Search Section BG"
        fill
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 md:mr-10">
            <h2 className="text-2xl font-bold text-white">
              Find Your Dream Rental Property
            </h2>
          </div>
          <p className="text-white mb-3">
            Discover a wide range of rental properties in your desired location.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block text-zinc-800 bg-white rounded-lg px-8 py-3 font-semibold hover:bg-zinc-600 hover:text-zinc-200"
            >
              Search
            </button>
            <Link
              href="/signup"
              className="inline-block text-white bg-rose-400 rounded-lg px-6 py-3 font-semibold hover:bg-rose-500"
              scroll={false}
            >
              Signup
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CalltoActionSection;
