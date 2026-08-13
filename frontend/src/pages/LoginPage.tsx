import { AuthForm } from '../features/auth/components/AuthForm';
import loginVideo from '../img/login.mp4';

export function LoginPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden p-6">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={loginVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10">
        <AuthForm />
      </div>
    </main>
  );
}