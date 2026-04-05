import { Header } from '@/components/layout/HeaderLayout';
import Image from "next/image";
import { 
  Globe, Landmark, Building2, Users, 
  Gavel, Scale, Briefcase, FileText, 
  Eye, Wallet, HelpCircle, ChevronRight,
  
  User, CheckCircle2, AlertCircle,AlertTriangle, Info, 
  BookOpen, PenTool, Layers, Search
} from 'lucide-react';
export default function EducativoPage() {
  return (
    <>
      <Header />
      <main className="bg-[#F8FAFC] min-h-screen pb-20 selection:bg-blue-100">
        
        {/* HERO SECTION*/}
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

        <div className="max-w-6xl mx-auto px-6 space-y-24 mt-16">
          
          {/* O ESTADO - Layout em Cards Horizontais */}
          <section>
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

          {/* OS TRÊS PODERES - Bento Grid Style */}
          <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative">
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

          {/* O QUE FAZ UM PARLAMENTAR - Estilo Timeline/Passos */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
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

          {/* DESPESAS - Visual Data Cards */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-10 flex items-center gap-3">
              <Wallet className="text-green-600" /> Transparência e Custos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Salário */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-green-200 transition-all">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Remuneração</span>
                <h3 className="text-4xl font-black text-slate-900 mt-2">R$ 46.366</h3>
                <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                  Valor bruto mensal para Deputados e Senadores (reajustado escalonadamente).
                </p>
              </div>

              {/* Verba de Gabinete */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Equipe (Gabinete)</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">Até R$ 118 mil</h3>
                <p className="text-sm text-slate-500 mt-4">
                  Destinado exclusivamente para o pagamento de salários de assessores.
                </p>
              </div>

              {/* Cota Parlamentar */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Atividade (CEAP)</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">~ R$ 45 mil</h3>
                <p className="text-sm text-slate-500 mt-4">
                  Reembolso de viagens, combustível, aluguel de escritório e telefonia.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 px-4 bg-slate-50/50 rounded-[3rem]">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                  Emendas Parlamentares
                </h2>
                <p className="text-slate-500 max-w-xl">
                  Recursos do orçamento público que os congressistas devem direcionar para obras e projetos em suas bases eleitorais.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* 1. EMENDAS INDIVIDUAIS - (Largo) */}
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
                    <p className="text-slate-500 text-sm mb-6 max-w-md">
                      Cada parlamentar tem uma cota individual para indicar. Metade desse recurso deve, obrigatoriamente, ir para a <strong>Saúde</strong>.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4 mt-auto">
                      <div className="sm:col-span-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="font-bold text-slate-800 text-sm mb-1">Projeto Específico</p>
                        <p className="text-xs text-slate-500">Exige projeto, aprovação formal e convênio assinado com o estado ou município beneficiado.</p>
                      </div>
                      <div className="sm:col-span-2 p-5 bg-orange-50/50 rounded-2xl border border-orange-200 relative group/pix">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-orange-900 text-sm">Transferência Especial</p>
                          <div className="flex items-center gap-1 text-red-400 bg-red-400/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            <AlertCircle size={12} /> Críticas à Transparência
                          </div>
                        </div>
                        <p className="text-xs text-orange-800"><strong>Emendas Pix:</strong> O dinheiro é enviado diretamente, sem definição detalhada inicial.</p>
                        
                        <div className="flex items-start gap-2 p-3 bg-white/60 rounded-xl border border-orange-100">
                          <AlertCircle size={14} className="text-orange-600 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-orange-900/80 leading-tight font-medium">
                            <strong>Debate Crítico:</strong> Alvo de discussões entre Congresso e STF por baixa transparência e dificuldade de rastreio.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. EMENDAS DE BANCADA - Vertical */}
                <div className="md:col-span-4 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-6">
                    <Users size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Emendas de Bancada</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    Decididas em conjunto pelos parlamentares de um mesmo estado para <strong>grandes obras regionais</strong>.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                    Impacto Regional
                  </div>
                </div>

                {/* 3. EMENDAS DE COMISSÃO - Horizontal Médio */}
                <div className="md:col-span-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shrink-0">
                    <BookOpen size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">Emendas de Comissão</h3>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-tighter">
                        Não Obrigatória
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm">
                      Criadas por grupos temáticos (Saúde, Educação, etc). O governo tem poder de decisão sobre o pagamento.
                    </p>
                  </div>
                </div>

                {/* 4. EMENDAS DE RELATOR (RP9) - Estilo Claro com Atenção */}
                <div className="md:col-span-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  
                  {/* Ícone de Fundo Sutil (Opacidade 5%) */}
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                    <PenTool size={120} className="text-amber-900" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Cabeçalho do Card (Semelhante à Transferência Especial da imagem) */}
                    <div className="flex justify-between items-start mb-6 gap-3">
                      <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100/50">
                        <PenTool size={28} />
                      </div>
                      
                      {/* Badge de Destaque Crítico (Igual ao 'Críticas à transparência' da imagem) */}
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                        <AlertTriangle size={12} className="text-red-500" />
                        Críticas à Transparência
                      </span>
                    </div>

                    {/* Título e Texto */}
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 tracking-tight">
                      Emendas de Relator (RP9)
                    </h3>
                    <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                      Originalmente usadas para ajustes orçamentários, tornaram-se controversas e ganharam o apelido de 
                      <strong className="text-amber-800"> "Orçamento Secreto"</strong> pela baixa rastreabilidade e centralização de poder.
                    </p>

                    {/* Box de Nota Crítica (Estilo 'Debate Crítico' da imagem) */}
                    <div className="mt-auto flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <Scale size={18} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-amber-900/80 leading-relaxed">
                          <strong className="text-amber-950 font-bold">Ação do STF:</strong> Parte deste mecanismo foi considerado inconstitucional pelo STF devido à falta de transparência e necessidade de controle republicano sobre as verbas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/*Como nasce uma lei?8*/}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">A Jornada de uma Lei</h2>
            <div className="relative border-l-2 border-dashed border-blue-200 ml-6 space-y-12">
              {[
                { step: "Apresentação", desc: "Um projeto é proposto por um parlamentar ou cidadão." },
                { step: "Comissões", desc: "Especialistas analisam se o projeto é constitucional e útil." },
                { step: "Plenário", desc: "Todos os parlamentares votam para aprovar ou rejeitar." },
                { step: "Sanção", desc: "O Presidente da República assina para que vire lei oficial." }
              ].map((item, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                  <h4 className="font-bold text-lg text-slate-900">{item.step}</h4>
                  <p className="text-sm text-slate-500 max-w-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO SISTEMA ELEITORAL */}
          <section className="mb-24">
            <div className="flex flex-col items-center text-center mb-12">
              {/* Ícone ou Badge Superior (Opcional) */}
              <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                Entenda as Urnas
              </span>
              
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6">
                Sistema Eleitoral Brasileiro
              </h2>

              {/* O SUBTÍTULO SOLICITADO */}
              <div className="max-w-2xl mx-auto space-y-2">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  O sistema eleitoral define como os votos são transformados em representantes eleitos.
                </p>
                <p className="text-base text-slate-500 font-medium italic">
                  No Brasil, existem dois modelos principais: <span className="text-blue-600">majoritário</span> e <span className="text-green-600">proporcional</span>.
                </p>
              </div>
            </div>

            {/* CARDS COMPARATIVOS (Majoritário vs Proporcional) */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Majoritário */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-blue-700 text-sm md:text-base font-bold mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Voto Majoritário
                </div>
                <h3 className="text-2xl font-bold text-slate-950 mb-3">O Mais Votado Vence</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Sistema direto: quem recebe mais votos, ganha.
                  Se ninguém atingir maioria absoluta (mais de 50%), ocorre segundo turno.
                </p>
                <div className="space-y-2.5 border-t border-slate-100 pt-5">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Aplica-se para:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Presidente', 'Governador', 'Prefeito', 'Senador'].map(cargo => (
                      <span key={cargo} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">
                        {cargo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proporcional */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-50 text-green-700 text-sm md:text-base font-bold mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Voto Proporcional
                </div>
                <h3 className="text-2xl font-bold text-slate-950 mb-3">Vagas distribuídas por partido</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Não vence só o mais votado. Os votos vão para o partido ou federação. As vagas são distribuídas conforme o total de votos recebidos.
                </p>
                <div className="space-y-2.5 border-t border-slate-100 pt-5">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Aplica-se para:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Deputado Federal', 'Deputado Estadual', 'Vereador'].map(cargo => (
                      <span key={cargo} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">
                        {cargo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* O INFOGRÁFICO PAISAGEM */}
            <div className="bg-slate-50 p-4 sm:p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-inner">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/70 border-4 border-white">
                <Image
                  src="/imagens/info-eleitoral-majoritatio-proporcional.png" 
                  alt="Infográfico detalhado comparando o sistema eleitoral majoritário e proporcional no Brasil"
                  fill 
                  sizes="(max-w-7xl) 100vw, 1200px" 
                  className="object-cover object-center" 
                  priority 
                />
              </div>
              <p className="text-center text-xs text-slate-400 mt-5 italic">
                Fonte: .
              </p>
            </div>

            {/* O INFOGRÁFICO PAISAGEM */}
            <div className="bg-slate-50 p-4 sm:p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-inner">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/70 border-4 border-white">
                <Image
                  src="/imagens/info-sistema-eleitoral.png" 
                  alt="Infográfico detalhado comparando o sistema eleitoral majoritário e proporcional no Brasil"
                  fill 
                  sizes="(max-w-7xl) 100vw, 1200px" 
                  className="object-cover object-center" 
                  priority 
                />
              </div>
              <p className="text-center text-xs text-slate-400 mt-5 italic">
                Fonte: .
              </p>
            </div>
          </section>


          {/* FAQ - Acordeão Moderno */}
          <section className="max-w-3xl mx-auto py-20">
             <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
               <HelpCircle className="text-blue-500" /> Perguntas Comuns
             </h2>
             <div className="space-y-4">
                <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-slate-700 hover:text-blue-600">
                    Quem decide o preço da passagem de ônibus?
                    <ChevronRight size={18} className="group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-500 leading-relaxed text-sm">
                    A responsabilidade principal é da Prefeitura (Poder Executivo Municipal), que gere o contrato com as empresas de transporte.
                  </div>
                </details>
                {/* Outros itens do FAQ... */}
             </div>
          </section>
        </div>
      </main>
    </>
  );
}