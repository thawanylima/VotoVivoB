'use client';

import { useState, useCallback, memo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Database, FileText, Landmark, TrendingUp, Users, Scale, BarChart,
  Loader2, User, MapPin, Building2
} from 'lucide-react';

import { buscarDeputadosComFiltros } from "@/services/deputados";

// Tipo para as sugestões
interface Sugestao {
  id: number;
  nomeParlamentar: string;
  siglaPartido: string;
  uf: string;
  tipo: 'deputado';
}

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
  >
    <Icon className={`${iconColor} ${size}`} />
  </div>
));

SatelliteIcon.displayName = 'SatelliteIcon';

const OrbitRing = memo(({ size, opacity = 'opacity-10' }: { size: string; opacity?: string }) => (
  <div 
    className={`absolute ${size} border border-gray-300 rounded-full ${opacity}`}
  />
));

OrbitRing.displayName = 'OrbitRing';


export function HeroSearch() {
  const [termo, setTermo] = useState('');
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [carregandoSugestoes, setCarregandoSugestoes] = useState(false);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ⛔ FECHA SUGESTÕES AO CLICAR FORA
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMostrarSugestoes(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔍 Função para carregar sugestões reais da API
  const carregarSugestoes = useCallback(async (termoBusca: string) => {
    if (termoBusca.length < 2) return;

    try {
      setCarregandoSugestoes(true);
      const resp = await buscarDeputadosComFiltros({ nome: termoBusca });

      const dados = resp?.data || [];

      const itens: Sugestao[] = dados.map((d: any) => ({
        id: d.id,
        nomeParlamentar: d.nomeParlamentar,
        siglaPartido: d.siglaPartido,
        uf: d.uf,
        tipo: 'deputado',
      }));

      setSugestoes(itens);
      setMostrarSugestoes(true);
    } catch (e) {
      console.error("Erro ao buscar sugestões:", e);
      setSugestoes([]);
    } finally {
      setCarregandoSugestoes(false);
    }
  }, []);

  // ⌨ Atualiza termo + busca sugestões
  const handleInputChange = useCallback((e: any) => {
    const value = e.target.value;
    setTermo(value);

    if (value.length >= 2) {
      carregarSugestoes(value);
    } else {
      setSugestoes([]);
      setMostrarSugestoes(false);
    }
  }, [carregarSugestoes]);

  // ⏎ Busca manual
  const handleSearch = useCallback((e?: any) => {
    if (e) e.preventDefault();
    if (!termo.trim()) return;

    router.push(`/deputados?nome=${encodeURIComponent(termo.trim())}`);
    setMostrarSugestoes(false);
  }, [termo, router]);

  // Clique em sugestão
  const handleSugestaoClick = useCallback((s: Sugestao) => {
    const termoBusca = `${s.nomeParlamentar} ${s.siglaPartido} ${s.uf}`;

    setTermo(termoBusca);
    router.push(`/deputados?nome=${encodeURIComponent(s.nomeParlamentar)}`);
    setMostrarSugestoes(false);
    inputRef.current?.focus();
  }, [router]);

  // Reabrir sugestões ao focar no input
  const handleInputFocus = useCallback(() => {
    if (termo.length >= 2 && sugestoes.length > 0) {
      setMostrarSugestoes(true);
    }
  }, [termo, sugestoes]);


  return (
    <section className="bg-slate-50 py-20 md:py-28 relative overflow-hidden border-b border-gray-200">
      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* TEXTOS */}
          <div className="text-left space-y-8 max-w-2xl">

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1]">
              A casa dos dados abertos do <br />
              <span className="text-brasil-blue">Poder Legislativo.</span>
            </h1>

            <p className="text-lg text-gray-600">
              Fiscalize mandatos, acompanhe gastos e analise votações.
            </p>

            {/* CAMPO DE BUSCA */}
            <div className="relative max-w-xl" ref={containerRef}>
              <form
                onSubmit={handleSearch}
                className="flex shadow-xl rounded-lg overflow-hidden bg-white mt-4"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={termo}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  placeholder="Busque por nome, partido ou estado"
                  className="grow h-16 pl-6 text-gray-900 outline-none text-lg"
                />

                <button
                  type="submit"
                  disabled={carregandoSugestoes}
                  className="bg-brasil-blue text-white px-10 font-bold text-lg h-16 flex items-center justify-center gap-2"
                >
                  {carregandoSugestoes ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    <>
                      <Search size={22} />
                      <span>Buscar</span>
                    </>
                  )}
                </button>
              </form>

              {/* LISTA DE SUGESTÕES */}
              {mostrarSugestoes && sugestoes.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl z-50">

                  <ul className="p-2">
                    {sugestoes.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => handleSugestaoClick(s)}
                          className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-blue-50"
                        >
                          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                            <User size={16} />
                          </div>

                          <div className="flex-1">
                            <p className="font-medium">{s.nomeParlamentar}</p>
                            <p className="text-sm text-gray-500">
                              {s.siglaPartido} • {s.uf}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={handleSearch}
                    className="w-full py-3 text-brasil-blue font-medium hover:bg-blue-50 border-t"
                  >
                    <Search size={16} />
                    Ver todos os resultados para "{termo}"
                  </button>
                </div>
              )}

              {/* SEM RESULTADOS */}
              {mostrarSugestoes && termo.length >= 2 && !carregandoSugestoes && sugestoes.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl z-50 p-6 text-center">
                  <Search size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 font-medium">Nenhum resultado encontrado</p>
                </div>
              )}
            </div>
          </div>

          {/* ILUSTRAÇÃO */}
          <div className="relative h-[600px] hidden md:flex items-center justify-center pointer-events-none select-none">
            <OrbitRing size="w-[280px] h-[280px]" />
            <OrbitRing size="w-[450px] h-[450px]" opacity="opacity-60" />
            <OrbitRing size="w-[650px] h-[650px]" opacity="opacity-40" />

            <div className="absolute w-36 h-36 bg-brasil-green rounded-full flex items-center justify-center shadow-xl border-4 border-white">
              <Database className="text-white w-16 h-16" />
            </div>

            <SatelliteIcon Icon={Landmark} position="top-24 right-20" iconColor="text-brasil-blue" />
            <SatelliteIcon Icon={TrendingUp} position="bottom-32 left-16" iconColor="text-brasil-yellow" />
            <SatelliteIcon Icon={FileText} position="top-32 left-24" iconColor="text-gray-500" />

            <SatelliteIcon Icon={Users} position="top-1/2 -right-8 -translate-y-1/2" bgColor="bg-brasil-blue" iconColor="text-white" size="w-6 h-6" padding="p-4" />
            <SatelliteIcon Icon={Scale} position="bottom-20 right-40" iconColor="text-brasil-green" size="w-6 h-6" padding="p-4" />
            <SatelliteIcon Icon={BarChart} position="top-1/2 left-0 -translate-y-1/2" iconColor="text-orange-400" size="w-6 h-6" padding="p-4" />

          </div>
        </div>

      </div>
    </section>
  );
}
