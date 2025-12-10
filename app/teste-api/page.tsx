'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';

export default function TesteAPI() {
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testarAPI = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Testa um deputado conhecido (ex: Arthur Lira - ID: 220593)
      const response = await api.get('/deputados/220593');
      setResultado(response.data);
      console.log('Resposta da API:', response.data);
    } catch (err: any) {
      console.error('Erro detalhado:', err);
      setError(`Erro: ${err.message} - ${err.code || ''}`);
      
      // Tenta fazer uma requisição fetch direta para comparar
      try {
        const fetchResponse = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados/220593');
        const data = await fetchResponse.json();
        console.log('Resposta do fetch:', data);
      } catch (fetchErr) {
        console.error('Erro no fetch:', fetchErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testarAPI();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste da API da Câmara</h1>
      
      <button
        onClick={testarAPI}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? 'Testando...' : 'Testar API'}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Erro:</p>
          <p>{error}</p>
        </div>
      )}

      {resultado && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Resultado:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(resultado, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}