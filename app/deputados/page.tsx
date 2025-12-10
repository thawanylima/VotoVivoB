'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from "@/components/layout/HeaderLayout";
import { getDeputados, FiltrosDeputados } from '@/services/backend-api';
import { ParlamentarBackend, DeputadosResponse } from '@/types';
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight, X } from 'lucide-react';

const UFs = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const PARTIDOS = [
  'PL', 'PT', 'UNIÃO', 'PP', 'PSD', 'MDB', 'PSDB', 'REPUBLICANOS',
  'PDT', 'PSB', 'PSOL', 'CIDADANIA', 'PCdoB', 'PV', 'AVANTE',
  'SOLIDARIEDADE', 'PODE', 'NOVO', 'REDE', 'PMB'
];

export default function ListagemParlamentares() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [deputados, setDeputados] = useState<ParlamentarBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosDeputados>({
    nome: searchParams.get('nome') || '',
    partido: searchParams.get('partido') || '',
    uf: searchParams.get('uf') || '',
    pagina: parseInt(searchParams.get('pagina') || '1')
  });
  const [meta, setMeta] = useState({
    total: 0,
    pagina: 1,
    itensPorPagina: 12,
    totalPaginas: 0
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [ordenarPor, setOrdenarPor] = useState('nome');

  const buscarDeputados = useCallback(async () => {
    console.log('Buscando deputados com filtros:', filtros);
    setLoading(true);
    try {
      const response = await getDeputados(filtros);
      
      console.log('Resposta da API (deputados):', response);
      
      if (response && response.data) {
        setDeputados(response.data);
        setMeta(response.meta || {
          total: response.data.length,
          pagina: filtros.pagina || 1,
          itensPorPagina: 12,
          totalPaginas: Math.ceil(response.data.length / 12)
        });
      } else {
        console.warn('Resposta da API não tem estrutura esperada:', response);
        setDeputados([]);
        setMeta({
          total: 0,
          pagina: filtros.pagina || 1,
          itensPorPagina: 12,
          totalPaginas: 0
        });
      }
    } catch (error) {
      console.error('Erro ao buscar deputados:', error);
      setDeputados([]);
      setMeta({
        total: 0,
        pagina: filtros.pagina || 1,
        itensPorPagina: 12,
        totalPaginas: 0
      });
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    buscarDeputados();
  }, [buscarDeputados]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (filtros.nome) params.set('nome', filtros.nome);
    if (filtros.partido) params.set('partido', filtros.partido);
    if (filtros.uf) params.set('uf', filtros.uf);
    params.set('pagina', '1');
    
    // Atualiza a URL
    router.push(`/deputados?${params.toString()}`);
    
    // Atualiza os filtros e busca novamente
    setFiltros(prev => ({ ...prev, pagina: 1 }));
    
    // A busca será feita pelo useEffect que monitora filtros
  };

  const handlePageChange = (novaPagina: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pagina', novaPagina.toString());
    
    router.push(`/deputados?${params.toString()}`);
    setFiltros(prev => ({ ...prev, pagina: novaPagina }));
  };

  const limparFiltros = () => {
    setFiltros({ nome: '', partido: '', uf: '', pagina: 1 });
    router.push('/deputados');
  };

  const temFiltrosAtivos = filtros.nome || filtros.partido || filtros.uf;

  // Ordena os deputados se necessário
  const deputadosOrdenados = [...deputados].sort((a, b) => {
    switch (ordenarPor) {
      case 'partido':
        return a.siglaPartido.localeCompare(b.siglaPartido);
      case 'uf':
        return a.uf.localeCompare(b.uf);
      default: // 'nome'
        return a.nomeParlamentar.localeCompare(b.nomeParlamentar);
    }
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Lista de Parlamentares
          </h1>
          <p className="text-slate-600">
            Explore e filtre os {meta?.total || 0} parlamentares em exercício
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Barra de busca */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={filtros.nome || ''}
                onChange={(e) => setFiltros(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Buscar por nome do parlamentar"
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brasil-blue focus:border-transparent"
              />
            </div>

            {/* Filtros avançados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Partido
                </label>
                <select
                  value={filtros.partido || ''}
                  onChange={(e) => setFiltros(prev => ({ ...prev, partido: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brasil-blue focus:border-transparent"
                >
                  <option value="">Todos os partidos</option>
                  {PARTIDOS.map(partido => (
                    <option key={partido} value={partido}>{partido}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Estado (UF)
                </label>
                <select
                  value={filtros.uf || ''}
                  onChange={(e) => setFiltros(prev => ({ ...prev, uf: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brasil-blue focus:border-transparent"
                >
                  <option value="">Todos os estados</option>
                  {UFs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ordenar por
                </label>
                <select
                  value={ordenarPor}
                  onChange={(e) => setOrdenarPor(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brasil-blue focus:border-transparent"
                >
                  <option value="nome">Nome</option>
                  <option value="partido">Partido</option>
                  <option value="uf">Estado</option>
                </select>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-brasil-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Filter size={18} />
                  Aplicar Filtros
                </button>
                
                {temFiltrosAtivos && (
                  <button
                    type="button"
                    onClick={limparFiltros}
                    className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg border border-slate-300 hover:border-slate-400 transition-colors flex items-center gap-2"
                  >
                    <X size={18} />
                    Limpar Filtros
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Visualização:</span>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-50 text-brasil-blue' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-50 text-brasil-blue' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Resultados */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brasil-blue"></div>
            <p className="mt-4 text-slate-600">Carregando parlamentares...</p>
          </div>
        ) : deputadosOrdenados.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Nenhum parlamentar encontrado
            </h3>
            <p className="text-slate-600 mb-4">
              {temFiltrosAtivos 
                ? 'Tente ajustar seus filtros de busca.'
                : 'Não há parlamentares disponíveis no momento.'}
            </p>
            {temFiltrosAtivos && (
              <button
                onClick={limparFiltros}
                className="text-brasil-blue hover:text-blue-700 font-medium text-sm"
              >
                Limpar filtros e ver todos
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {deputadosOrdenados.map((deputado) => (
              <CardParlamentar key={deputado.id} deputado={deputado} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Parlamentar</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Partido - UF</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {deputadosOrdenados.map((deputado) => (
                    <tr key={deputado.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={deputado.urlFoto || 'https://placehold.co/64x64/e2e8f0/808080?text=Sem+Foto'}
                            alt={deputado.nomeParlamentar}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://placehold.co/64x64/e2e8f0/808080?text=Sem+Foto';
                              e.currentTarget.onerror = null;
                            }}
                          />
                          <div>
                            <span className="font-medium text-slate-900 block">{deputado.nomeParlamentar}</span>
                            {deputado.nomeCivil && deputado.nomeCivil !== deputado.nomeParlamentar && (
                              <span className="text-sm text-slate-500">{deputado.nomeCivil}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {deputado.siglaPartido}
                          </span>
                          <span className="text-slate-600">{deputado.uf}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${deputado.situacao === 'Em Exercício' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {deputado.situacao || 'Não informado'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            console.log('Navegando para deputado ID:', deputado.id);
                            router.push(`/deputados/${deputado.id}`);
                          }}
                          className="text-brasil-blue hover:text-blue-700 font-medium text-sm px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Ver perfil →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Paginação */}
        {meta?.totalPaginas > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(meta.pagina - 1)}
                disabled={meta.pagina === 1}
                className="p-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              {(() => {
                const paginas = [];
                const maxPaginasVisiveis = 5;
                
                let inicio = Math.max(1, meta.pagina - Math.floor(maxPaginasVisiveis / 2));
                let fim = Math.min(meta.totalPaginas, inicio + maxPaginasVisiveis - 1);
                
                // Ajusta o início se o fim for muito grande
                if (fim - inicio + 1 < maxPaginasVisiveis) {
                  inicio = Math.max(1, fim - maxPaginasVisiveis + 1);
                }
                
                // Primeira página
                if (inicio > 1) {
                  paginas.push(
                    <button
                      key={1}
                      onClick={() => handlePageChange(1)}
                      className={`w-10 h-10 rounded-lg font-medium ${meta.pagina === 1 ? 'bg-brasil-blue text-white' : 'border border-slate-300 hover:bg-slate-50 transition-colors'}`}
                    >
                      1
                    </button>
                  );
                  
                  if (inicio > 2) {
                    paginas.push(
                      <span key="ellipsis-start" className="px-2 text-slate-400">
                        ...
                      </span>
                    );
                  }
                }
                
                // Páginas do meio
                for (let i = inicio; i <= fim; i++) {
                  paginas.push(
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      className={`w-10 h-10 rounded-lg font-medium ${meta.pagina === i ? 'bg-brasil-blue text-white' : 'border border-slate-300 hover:bg-slate-50 transition-colors'}`}
                    >
                      {i}
                    </button>
                  );
                }
                
                // Última página
                if (fim < meta.totalPaginas) {
                  if (fim < meta.totalPaginas - 1) {
                    paginas.push(
                      <span key="ellipsis-end" className="px-2 text-slate-400">
                        ...
                      </span>
                    );
                  }
                  
                  paginas.push(
                    <button
                      key={meta.totalPaginas}
                      onClick={() => handlePageChange(meta.totalPaginas)}
                      className={`w-10 h-10 rounded-lg font-medium ${meta.pagina === meta.totalPaginas ? 'bg-brasil-blue text-white' : 'border border-slate-300 hover:bg-slate-50 transition-colors'}`}
                    >
                      {meta.totalPaginas}
                    </button>
                  );
                }
                
                return paginas;
              })()}
              
              <button
                onClick={() => handlePageChange(meta.pagina + 1)}
                disabled={meta.pagina === meta.totalPaginas}
                className="p-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="text-sm text-slate-600">
              <span>Página {meta.pagina} de {meta.totalPaginas}</span>
              <span className="mx-2">•</span>
              <span>{meta.total} parlamentares</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function CardParlamentar({ deputado }: { deputado: ParlamentarBackend }) {
  const router = useRouter();
  
  const handleClick = () => {
    console.log('Navegando para deputado ID:', deputado.id);
    console.log('Dados do deputado:', deputado);
    router.push(`/deputados/${deputado.id}`);
  };
  
  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-brasil-blue/30 transition-all duration-300 cursor-pointer group"
    >
      {/* Foto */}
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
        <img
          src={deputado.urlFoto || 'https://placehold.co/400x300/e2e8f0/808080?text=Sem+Foto'}
          alt={deputado.nomeParlamentar}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/808080?text=Sem+Foto';
            e.currentTarget.onerror = null;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge de partido na foto */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
            {deputado.siglaPartido}
          </span>
        </div>
      </div>
      
      {/* Informações */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-brasil-blue transition-colors">
          {deputado.nomeParlamentar}
        </h3>
        
        {deputado.nomeCivil && deputado.nomeCivil !== deputado.nomeParlamentar && (
          <p className="text-sm text-slate-600 mb-3 line-clamp-1">
            {deputado.nomeCivil}
          </p>
        )}
        
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
            {deputado.siglaPartido}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-600 font-medium">{deputado.uf}</span>
        </div>
        
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${deputado.situacao === 'Em Exercício' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {deputado.situacao || 'Situação não informada'}
          </span>
        </div>
        
        {/* Informações adicionais */}
        <div className="border-t border-slate-100 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">ID</p>
              <p className="text-sm font-mono font-medium text-slate-700 mt-1">
                #{deputado.id}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Ver perfil</p>
              <p className="text-sm font-medium text-slate-700 mt-1 flex items-center gap-1">
                Clique aqui <span className="group-hover:translate-x-1 transition-transform">→</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}