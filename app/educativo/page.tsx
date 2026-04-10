import { Header } from '@/components/layout/HeaderLayout';
import Image from "next/image";
import { 
  Globe, Landmark, Building2, Users, 
  Gavel, Scale, Briefcase, FileText, 
  Eye, Wallet, HelpCircle, ChevronRight,
  User, CheckCircle2, AlertCircle, AlertTriangle, Info, 
  BookOpen, PenTool, Layers, Search
} from 'lucide-react';

export default function EducativoPage() {
  const menuItems = [
    { name: 'O Estado', id: 'estado', icon: <Globe size={16} /> },
    { name: 'Três Poderes', id: 'poderes', icon: <Scale size={16} /> },
    { name: 'Parlamentares', id: 'parlamentar', icon: <Briefcase size={16} /> },
    { name: 'Custos', id: 'custos', icon: <Wallet size={16} /> },
    { name: 'Emendas', id: 'emendas', icon: <FileText size={16} /> },
    { name: 'Como nasce a Lei', id: 'lei', icon: <PenTool size={16} /> },
    { name: 'Sistema Eleitoral', id: 'sistema', icon: <Layers size={16} /> },
    { name: 'FAQ', id: 'faq', icon: <HelpCircle size={16} /> },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#F8FAFC] min-h-screen pb-20 selection:bg-blue-100">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 md:py-24">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
              Educação Cidadã
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
              Aprenda como funciona a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                política no Brasil.
              </span>
            </h1>
            <p className="mt-6 text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed">
              Entenda o papel dos poderes, o que fazem os parlamentares e como o dinheiro público é utilizado.
            </p>
          </div>
        </section>

        {/* ESTRUTURA COM SIDEBAR */}
        <div className="max-w-7xl mx-auto px-6 mt-16 lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* STICKY SIDEBAR (Proporção Menor: col-span-2) */}
          <aside className="hidden lg:block lg:col-span-2">
            <nav className="sticky top-24 space-y-0.5 border-l border-slate-200 ml-2">
              <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-4 pl-4">
                Sumário
              </p>
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2.5 px-4 py-1.5 text-[13px] font-medium text-slate-500 hover:text-blue-600 hover:border-l-2 hover:border-blue-600 transition-all -ml-[1px] group"
                >
                  <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
                    {item.icon}
                  </span>
                  {item.name}
                </a>
              ))}
            </nav>
          </aside>

          {/* CONTEÚDO PRINCIPAL */}
          <div className="lg:col-span-10 space-y-24 scroll-smooth">
            
            {/* O ESTADO */}
            <section id="estado" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <Globe size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">O Estado Brasileiro</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'União', desc: 'Assuntos nacionais e defesa.', color: 'border-blue-500', icon: <Landmark className="text-blue-500"/> },
                  { title: 'Estados', desc: 'Segurança e regionalismo.', color: 'border-green-500', icon: <Building2 className="text-green-500"/> },
                  { title: 'Municípios', desc: 'Saúde local e transporte.', color: 'border-yellow-500', icon: <Users className="text-yellow-500"/> }
                ].map((item, i) => (
                  <div key={i} className={`group p-8 bg-white rounded-3xl border-b-4 ${item.color} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* OS TRÊS PODERES */}
            <section id="poderes" className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative scroll-mt-24">
               <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
                  <Scale size={300} />
               </div>
               
               <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                    <Scale className="text-blue-400" /> Os Três Poderes
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/20 transition cursor-default">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50">
                        <Briefcase size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-blue-300">Executivo</h3>
                      <p className="text-slate-300 text-sm">Administra e coloca as leis em prática. É quem constrói e gere hospitais e escolas.</p>
                    </div>

                    <div className="md:col-span-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/20 transition cursor-default">
                      <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/50">
                        <FileText size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-yellow-300">Legislativo</h3>
                      <p className="text-slate-300 text-sm">Cria as leis e fiscaliza o uso do dinheiro. Decidem as regras da sociedade.</p>
                    </div>

                    <div className="md:col-span-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/20 transition cursor-default">
                      <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/50">
                        <Gavel size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-red-300">Judiciário</h3>
                      <p className="text-slate-300 text-sm">Garante o cumprimento das leis e resolve conflitos através da justiça.</p>
                    </div>
                  </div>
               </div>
            </section>

            {/* PARLAMENTAR */}
            <section id="parlamentar" className="grid md:grid-cols-2 gap-12 items-center scroll-mt-24">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">O que faz um parlamentar?</h2>
                <div className="space-y-6">
                  {[
                    { title: "Criar Leis", desc: "Propõe regras que afetam todo o país.", icon: <FileText size={20}/> },
                    { title: "Fiscalizar", desc: "Acompanha gastos do governo de perto.", icon: <Eye size={20}/> },
                    { title: "Orçamento", desc: "Define onde o seu imposto será usado.", icon: <Wallet size={20}/> }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-100 p-4 rounded-[2rem]">
                 <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image 
                      src="/imagens/info3-estado-brasileiro.png" 
                      alt="Infográfico" 
                      fill 
                      className="object-cover"
                    />
                 </div>
              </div>
            </section>

            {/* CUSTOS */}
            <section id="custos" className="py-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-800 mb-10 flex items-center gap-3">
                <Wallet className="text-green-600" /> Transparência e Custos
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-green-200 transition-all">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Remuneração</span>
                  <h3 className="text-4xl font-black text-slate-900 mt-2">R$ 46.366</h3>
                  <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                    Valor bruto mensal para Deputados e Senadores.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Equipe (Gabinete)</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">Até R$ 118 mil</h3>
                  <p className="text-sm text-slate-500 mt-4">
                    Destinado exclusivamente para assessores.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Atividade (CEAP)</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">~ R$ 45 mil</h3>
                  <p className="text-sm text-slate-500 mt-4">
                    Custeio da atividade parlamentar.
                  </p>
                </div>
              </div>
            </section>

            {/* EMENDAS */}
            <section id="emendas" className="py-20 px-4 bg-slate-50/50 rounded-[3rem] scroll-mt-24">
                <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                    Emendas Parlamentares
                    </h2>
                    <p className="text-slate-500 max-w-xl">
                    Recursos do orçamento público direcionados pelos congressistas para obras e projetos regionais.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                            <User size={120} />
                        </div>
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                    <User size={28} />
                                </div>
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                                    <CheckCircle2 size={12} /> Obrigatória
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Emendas Individuais</h3>
                            <p className="text-slate-500 text-sm mb-6 max-w-md">Metade do recurso deve ir para a <strong>Saúde</strong>.</p>
                            <div className="grid sm:grid-cols-3 gap-4 mt-auto">
                                <div className="sm:col-span-1 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                                    <p className="font-bold text-slate-800 mb-1">Projeto Específico</p>
                                    <p className="text-slate-500">Destino formal com contrato assinado.</p>
                                </div>
                                <div className="sm:col-span-2 p-5 bg-orange-50/50 rounded-2xl border border-orange-200 relative">
                                    <p className="font-bold text-orange-900 text-sm mb-1">Transferência Especial (PIX)</p>
                                    <p className="text-[11px] text-orange-800 leading-tight">Envio direto sem definição detalhada inicial. Alvo de debate no STF por baixa transparência.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-4 bg-white p-8 rounded-[2.5rem] border border-slate-200">
                        <Users size={28} className="text-indigo-600 mb-6" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Bancada</h3>
                        <p className="text-slate-500 text-sm">Decididas pelo conjunto de parlamentares de um estado.</p>
                    </div>

                    <div className="md:col-span-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 flex gap-6">
                        <BookOpen size={28} className="text-amber-600 shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Comissão</h3>
                            <p className="text-slate-500 text-sm italic underline">Não obrigatória.</p>
                        </div>
                    </div>

                    <div className="md:col-span-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <PenTool size={28} className="text-amber-700" />
                            <span className="px-2 py-1 rounded bg-red-50 text-red-700 text-[10px] font-bold">CRÍTICA À TRANSPARÊNCIA</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Relator (RP9)</h3>
                        <p className="text-sm text-slate-600">O polêmico "Orçamento Secreto".</p>
                    </div>
                </div>
                </div>
            </section>

            {/* COMO NASCE A LEI */}
            <section id="lei" className="py-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">A Jornada de uma Lei</h2>
              <div className="relative border-l-2 border-dashed border-blue-200 ml-6 space-y-12">
                {[
                  { step: "Apresentação", desc: "Um projeto é proposto por um parlamentar ou cidadão." },
                  { step: "Comissões", desc: "Especialistas analisam se o projeto é constitucional." },
                  { step: "Plenário", desc: "Votação formal para aprovação ou rejeição." },
                  { step: "Sanção", desc: "O Presidente assina e o projeto vira lei oficial." }
                ].map((item, i) => (
                  <div key={i} className="relative pl-10">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                    <h4 className="font-bold text-lg text-slate-900">{item.step}</h4>
                    <p className="text-sm text-slate-500 max-w-lg">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SISTEMA ELEITORAL */}
            <section id="sistema" className="mb-24 scroll-mt-24">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Sistema Eleitoral</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto italic">Majoritário (Executivo/Senado) e Proporcional (Legislativo).</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100">
                        <div className="px-6 py-3 rounded-full bg-blue-50 text-blue-700 font-bold w-fit mb-5">Voto Majoritário</div>
                        <p className="text-slate-600 text-sm">O mais votado vence. Simples assim.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100">
                        <div className="px-6 py-3 rounded-full bg-green-50 text-green-700 font-bold w-fit mb-5">Voto Proporcional</div>
                        <p className="text-slate-600 text-sm">Vagas distribuídas pelo cálculo do partido.</p>
                    </div>
                </div>
                <div className="aspect-video relative rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                    <Image src="/imagens/info-sistema-eleitoral.png" alt="Infográfico" fill className="object-cover" />
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="max-w-3xl mx-auto py-20 scroll-mt-24">
               <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                 <HelpCircle className="text-blue-500" /> Perguntas Comuns
               </h2>
               <div className="space-y-4">
                  <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-slate-700 hover:text-blue-600">
                      Quem decide o preço da passagem de ônibus?
                      <ChevronRight size={18} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-slate-500 text-sm">
                      A responsabilidade principal é da Prefeitura (Executivo Municipal).
                    </div>
                  </details>
               </div>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}