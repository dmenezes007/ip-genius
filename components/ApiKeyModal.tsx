import { AlertCircle, ExternalLink } from 'lucide-react';

const ApiKeyModal = () => (
  <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Chave de API Ausente</h2>
        <p className="text-slate-600 mb-6">A chave de API do Gemini não foi encontrada. Por favor, crie um arquivo <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded">.env.local</code> na raiz do projeto e adicione a seguinte linha: <br/><br/><code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded">VITE_GEMINI_API_KEY=SUA_CHAVE_AQUI</code></p>
        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" /> Obter uma Chave de API
        </a>
    </div>
</div>
);

export default ApiKeyModal;
