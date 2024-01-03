"use client";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Home() {
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
    <div className="bg-blue-900 min-h-screen">
      <p>Logged in {session.user.email}</p>
      <button
        onClick={() => signOut({ redirect: false })}
        className="bg-white text-black p-2 px-4 rounded-lg"
      >
        Sign Out
      </button>
    </div>
  );
}
