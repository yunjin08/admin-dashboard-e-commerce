"use client";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Layout() {
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center ">
        <div className="text-center w-full">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="bg-white p-2 text-black px-4 rounded-lg"
              >
                Sign in with Google
              </button>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-4 mb-0 flex-grow mt-2 mr-2">
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden">
          <Image
            src={session?.user?.image}
            alt="imagePhoto"
            height={1550}
            width={1550}
            className="w-6 h-6"
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </div>
  );
}
