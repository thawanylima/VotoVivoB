'use client';

import { useState, useCallback, memo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Database, FileText, Landmark, TrendingUp, Users, Scale, BarChart,
  Loader2, User, MapPin, Building2
} from 'lucide-react';

const SatelliteIcon = memo(({ 
  Icon, 
  position, 
  bgColor = 'bg-white', 
  iconColor,
  size = 'w-7 h-7',
  padding = 'p-5'
}: { 
  Icon: any;
  position: string;
  bgColor?: string;
  iconColor: string;
  size?: string;
  padding?: string;
}) => (
  <div 
    className={`absolute ${position} ${bgColor} ${padding} rounded-full shadow-xl border border-gray-200 z-10 
    transition-transform duration-300 hover:scale-110 hover:shadow-2xl`}
    role="presentation"
    aria-hidden="true"
  >
    <Icon className={`${iconColor} ${size}`} />
  </div>
));

SatelliteIcon.displayName = 'SatelliteIcon';

const OrbitRing = memo(({ size, opacity = 'opacity-10' }: { size: string; opacity?: string }) => (
  <div 
    className={`absolute ${size} border border-gray-300 rounded-full ${opacity}`}
    role="presentation"
    aria-hidden="true"
    style={{ willChange: 'transform' }}
  />
));

OrbitRing.displayName = 'OrbitRing';

// Tipo para as sugestões
interface Sugestao {
  id: number;
  nome: string;
  partido: string;
  estado: string;
  tipo: 'deputado' | 'partido' | 'estado';
}

export function HeroSearch() {
  const [termo, setTermo] = useState('');
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMostrarSugestoes(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Busca sugestões em tempo real
  useEffect(() => {
    const buscarSugestoes = async () => {
      if (termo.length < 2) {
        setSugestoes([]);
        setMostrarSugestoes(false);
        return;
      }

      setCarregando(true);
      
      try {
        // Simulação de busca - substitir por API 
        const dadosMock: Sugestao[] = [
          { id: 1, nome: 'Aécio Neves', partido: 'PSDB', estado: 'MG', tipo: 'deputado' },
          { id: 2, nome: 'Alberto Neto', partido: 'REPUBLICANOS', estado: 'AM', tipo: 'deputado' },
          { id: 3, nome: 'Alexandre Leite', partido: 'UNIÃO', estado: 'SP', tipo: 'deputado' },
          { id: 4, nome: 'PT - Partido dos Trabalhadores', partido: 'PT', estado: '', tipo: 'partido' },
          { id: 5, nome: 'PSDB - Partido da Social Democracia Brasileira', partido: 'PSDB', estado: '', tipo: 'partido' },
          { id: 6, nome: 'São Paulo', partido: '', estado: 'SP', tipo: 'estado' },
          { id: 7, nome: 'Minas Gerais', partido: '', estado: 'MG', tipo: 'estado' },
          { id: 8, nome: 'Rio de Janeiro', partido: '', estado: 'RJ', tipo: 'estado' },
        ];

        // Filtra os dados mockados baseado no termo de busca
        const sugestoesFiltradas = dadosMock.filter(item => {
          const buscaTermo = termo.toLowerCase();
          return (
            item.nome.toLowerCase().includes(buscaTermo) ||
            item.partido.toLowerCase().includes(buscaTermo) ||
            item.estado.toLowerCase().includes(buscaTermo)
          );
        }).slice(0, 8); // Limita a 8 sugestões

        setSugestoes(sugestoesFiltradas);
        setMostrarSugestoes(sugestoesFiltradas.length > 0);
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
        setSugestoes([]);
        setMostrarSugestoes(false);
      } finally {
        setCarregando(false);
      }
    };

    const timeoutId = setTimeout(buscarSugestoes, 300);
    return () => clearTimeout(timeoutId);
  }, [termo]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (termo.trim()) {
      // Redireciona para a página de deputados com o termo de busca
      router.push(`/deputados?search=${encodeURIComponent(termo.trim())}`);
      setMostrarSugestoes(false);
    }
  }, [termo, router]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTermo(e.target.value);
    if (e.target.value.length >= 2) {
      setMostrarSugestoes(true);
    }
  }, []);

  const handleSugestaoClick = useCallback((sugestao: Sugestao) => {
    let termoBusca = '';
    
    if (sugestao.tipo === 'deputado') {
      termoBusca = `${sugestao.nome} ${sugestao.partido} ${sugestao.estado}`;
    } else if (sugestao.tipo === 'partido') {
      termoBusca = sugestao.nome;
    } else if (sugestao.tipo === 'estado') {
      termoBusca = sugestao.nome;
    }
    
    setTermo(termoBusca);
    router.push(`/deputados?search=${encodeURIComponent(termoBusca.trim())}`);
    setMostrarSugestoes(false);
    
    // Foca no input novamente
    inputRef.current?.focus();
  }, [router]);

  const handleInputFocus = useCallback(() => {
    if (termo.length >= 2 && sugestoes.length > 0) {
      setMostrarSugestoes(true);
    }
  }, [termo, sugestoes]);

  const getIconForTipo = useCallback((tipo: string) => {
    switch (tipo) {
      case 'deputado': return <User size={16} />;
      case 'partido': return <Building2 size={16} />;
      case 'estado': return <MapPin size={16} />;
      default: return <Search size={16} />;
    }
  }, []);

  const getTipoTexto = useCallback((tipo: string) => {
    switch (tipo) {
      case 'deputado': return 'Deputado';
      case 'partido': return 'Partido';
      case 'estado': return 'Estado';
      default: return 'Busca';
    }
  }, []);

  return (
    <section 
      className="bg-slate-50 py-20 md:py-28 relative overflow-hidden border-b border-gray-200"
      aria-label="Seção de busca principal"
    >
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="text-left space-y-8 max-w-2xl">
            
            <header className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                A casa dos dados abertos do <br />
                <span className="text-brasil-blue">Poder Legislativo.</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Fiscalize mandatos, acompanhe gastos e analise votações. 
              </p>
            </header>

           <div 
              className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm 
              transition-all duration-300 hover:shadow-md hover:scale-105"
              role="status"
              aria-label="Estatística de parlamentares monitorados"
            >
              <span className="text-2xl font-bold text-[#009933]">100%</span>
              <div className="h-5 w-px bg-gray-300" aria-hidden="true"></div>
              <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                Dados Públicos
              </span>
            </div>

            <div className="relative max-w-xl" ref={containerRef}>
              <form 
                onSubmit={handleSearch}
                className="flex shadow-xl shadow-blue-900/5 rounded-lg overflow-hidden bg-white mt-4
                transition-shadow duration-300 hover:shadow-2xl focus-within:shadow-2xl focus-within:ring-2 
                focus-within:ring-brasil-blue focus-within:ring-offset-2"
                role="search"
                aria-label="Busca de parlamentares"
              >
                <label htmlFor="search-input" className="sr-only">
                  Busque por nome, partido ou estado
                </label>
                <input
                  ref={inputRef}
                  id="search-input"
                  type="text"
                  value={termo}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  placeholder="Busque por nome, partido ou estado"
                  className="grow h-16 pl-6 text-gray-900 bg-transparent outline-none 
                  placeholder:text-gray-400 text-lg"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button 
                  type="submit"
                  disabled={carregando || !termo.trim()}
                  className="bg-brasil-blue hover:bg-blue-900 text-white px-10 font-bold text-lg 
                  transition-all duration-300 h-16 flex items-center justify-center gap-2 hover:gap-3 
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 
                  focus:ring-offset-brasil-blue active:scale-95 disabled:opacity-90 
                  disabled:cursor-not-allowed min-w-[120px]"
                  aria-label="Buscar parlamentar"
                >
                  {carregando ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    <>
                      <Search size={22} strokeWidth={3} aria-hidden="true" />
                      <span>Buscar</span>
                    </>
                  )}
                </button>
              </form>

              {/* Lista de sugestões */}
              {mostrarSugestoes && sugestoes.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl 
                border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    <div className="px-3 py-2 mb-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Sugestões
                      </p>
                    </div>
                    <ul>
                      {sugestoes.map((sugestao) => (
                        <li key={sugestao.id}>
                          <button
                            type="button"
                            onClick={() => handleSugestaoClick(sugestao)}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-brasil-blue 
                            transition-colors border-b border-gray-100 last:border-b-0
                            flex items-center gap-3 group"
                          >
                            <div className={`p-2 rounded-full 
                              ${sugestao.tipo === 'deputado' ? 'bg-blue-100 text-blue-600' :
                                sugestao.tipo === 'partido' ? 'bg-green-100 text-green-600' :
                                'bg-orange-100 text-orange-600'
                              }`}
                            >
                              {getIconForTipo(sugestao.tipo)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2">
                                <p className="font-medium truncate group-hover:text-brasil-blue">
                                  {sugestao.nome}
                                </p>
                                <span className={`text-xs px-2 py-1 rounded-full 
                                  ${sugestao.tipo === 'deputado' ? 'bg-blue-50 text-blue-700' :
                                    sugestao.tipo === 'partido' ? 'bg-green-50 text-green-700' :
                                    'bg-orange-50 text-orange-700'
                                  }`}
                                >
                                  {getTipoTexto(sugestao.tipo)}
                                </span>
                              </div>
                              {(sugestao.partido || sugestao.estado) && (
                                <p className="text-sm text-gray-500 truncate">
                                  {sugestao.partido && <span>{sugestao.partido}</span>}
                                  {sugestao.partido && sugestao.estado && <span className="mx-1">•</span>}
                                  {sugestao.estado && <span>{sugestao.estado}</span>}
                                </p>
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                    
                    {termo.length >= 2 && (
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          type="button"
                          onClick={handleSearch}
                          className="w-full text-center px-4 py-3 text-brasil-blue hover:bg-blue-50 
                          font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Search size={16} />
                          Ver todos os resultados para "{termo}"
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mensagem quando não há sugestões */}
              {mostrarSugestoes && termo.length >= 2 && !carregando && sugestoes.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl 
                border border-gray-200 z-50 p-6 text-center">
                  <Search size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 font-medium">Nenhum resultado encontrado</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Tente buscar por nome completo, sigla do partido ou estado
                  </p>
                </div>
              )}
            </div>
          </div>

          <div 
            className="relative h-[600px] hidden md:flex items-center justify-center pointer-events-none 
            select-none scale-90 lg:scale-100"
            role="img"
            aria-label="Visualização gráfica representando dados interconectados do poder legislativo"
          >
            
            <div className="absolute inset-0 flex items-center justify-center opacity-30" aria-hidden="true">
              <div className="absolute w-[140%] h-px bg-gray-400 rotate-45" style={{ willChange: 'transform' }}></div>
              <div className="absolute w-[140%] h-px bg-gray-400 -rotate-45" style={{ willChange: 'transform' }}></div>
            </div>

            <OrbitRing size="w-[280px] h-[280px]" />
            <OrbitRing size="w-[450px] h-[450px]" opacity="opacity-60" />
            <OrbitRing size="w-[650px] h-[650px]" opacity="opacity-40" />

            <div 
              className="absolute w-36 h-36 bg-brasil-green rounded-full flex items-center justify-center 
              shadow-2xl shadow-green-900/20 z-20 border-4 border-white 
              animate-pulse"
              style={{ willChange: 'transform', animationDuration: '3s' }}
              role="presentation"
              aria-hidden="true"
            >
              <Database className="text-white w-16 h-16" strokeWidth={1.5} aria-hidden="true" />
            </div>

            <SatelliteIcon Icon={Landmark} position="top-24 right-20" iconColor="text-brasil-blue" />
            <SatelliteIcon Icon={TrendingUp} position="bottom-32 left-16" iconColor="text-brasil-yellow" />
            <SatelliteIcon Icon={FileText} position="top-32 left-24" iconColor="text-gray-500" />
            
            <SatelliteIcon 
              Icon={Users} 
              position="top-1/2 -right-8 transform -translate-y-1/2" 
              bgColor="bg-brasil-blue" 
              iconColor="text-white" 
              size="w-6 h-6"
              padding="p-4"
            />
            
            <SatelliteIcon 
              Icon={Scale} 
              position="bottom-20 right-40" 
              iconColor="text-brasil-green" 
              size="w-6 h-6"
              padding="p-4"
            />
            
            <SatelliteIcon 
              Icon={BarChart} 
              position="top-1/2 left-0 transform -translate-y-1/2" 
              iconColor="text-orange-400" 
              size="w-6 h-6"
              padding="p-4"
            />

          </div>

        </div>
      </div>
    </section>
  );
}