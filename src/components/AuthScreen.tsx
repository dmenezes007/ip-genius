import React, { useState } from 'react';

interface AuthScreenProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

export default function AuthScreen({ onSignIn, onSignUp, loading }: AuthScreenProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      if (mode === 'signin') {
        await onSignIn(email, password);
      } else {
        await onSignUp(email, password);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha de autenticação.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <img src="/logo-ip-genius.png" alt="Logo IP Genius" className="w-9 h-9 rounded-md object-contain" />
          <h1 className="text-2xl font-black text-slate-900">IP Genius</h1>
        </div>
        <p className="text-sm text-slate-500 mt-1">Acesso seguro para salvar progresso real na nuvem.</p>

        <div className="flex mt-5 bg-slate-100 p-1 rounded-xl">
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode === 'signin' ? 'bg-white text-slate-900' : 'text-slate-500'}`}
            onClick={() => setMode('signin')}
            type="button"
          >
            Entrar
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode === 'signup' ? 'bg-white text-slate-900' : 'text-slate-500'}`}
            onClick={() => setMode('signup')}
            type="button"
          >
            Criar conta
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
            <input
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Senha</label>
            <input
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full turquoise-gradient text-white py-2.5 rounded-xl text-sm font-bold disabled:opacity-60"
          >
            {loading ? 'Aguarde...' : mode === 'signin' ? 'Entrar na conta' : 'Criar conta'}
          </button>
        </form>
      </div>
    </div>
  );
}
