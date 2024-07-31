import Image from "next/image";
import Login from "./(root)/(auth)/login/page";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Login />
    </main>
  );
}
