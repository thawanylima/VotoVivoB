"use client";
import { useState } from 'react';
import { Header } from '@/components/layout/HeaderLayout';
import Image from "next/image";
import { 
  Globe, Landmark, Building2, Users, 
  Gavel, Scale, Briefcase, FileText, 
  Eye, Wallet, HelpCircle, ChevronRight,
  User, CheckCircle2, AlertCircle, AlertTriangle, Info, 
  BookOpen, PenTool, Layers, Search, Settings, Home, Clock3
} from 'lucide-react';


export default function EducativoPage() {
  const [activeTab, setActiveTab] = useState(0);
  const menuItems = [
    { name: 'O Estado', id: 'estado', icon: <Globe size={16} /> },
    { name: 'Congresso Nacional', id: 'congresso', icon: <Landmark size={16} /> },
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
            {/* SEÇÃO: O ESTADO BRASILEIRO */}
            <section id="estado" className="scroll-mt-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
                  O Estado Brasileiro
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                 O Brasil é formado por diferentes níveis de governo, que atuam de forma autônoma e organizada pela Constituição.
                </p>
              </div>

              <div className="space-y-12">
                
                {/* 1. Blocos de Funções */}
                <div className="grid gap-4">
                  {[
                    { 
                      title: 'Poder Executivo', 
                      desc: 'Responsável por implementar políticas públicas e executar as leis de forma concreta.', 
                      bg: 'bg-gradient-to-r from-blue-700 to-blue-500', 
                      icon: <Settings size={28} /> 
                    },
                    { 
                      title: 'Poder Legislativo', 
                      desc: 'Atua na criação de normas jurídicas e na fiscalização constante do Executivo.', 
                      bg: 'bg-gradient-to-r from-green-700 to-green-500', 
                      icon: <FileText size={28} /> 
                    },
                    { 
                      title: 'Poder Judiciário', 
                      desc: 'Garante o cumprimento das leis e a proteção dos direitos fundamentais dos cidadãos.', 
                      bg: 'bg-gradient-to-r from-yellow-500 to-yellow-400', 
                      icon: <Scale size={28} /> 
                    }
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} text-white p-1 rounded-[2rem] shadow-md transition-transform hover:scale-[1.01]`}>
                      <div className="flex flex-col md:flex-row items-center gap-6 px-8 py-4 bg-white/10 rounded-[1.9rem] backdrop-blur-sm">
                        <div className="p-3 bg-white/20 rounded-full border border-white/30 shrink-0">
                          {item.icon}
                        </div>
                        <div className="text-center md:text-left">
                          <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                          <p className="text-sm opacity-90 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2. Tabela de Esferas */}
                <div className="mt-16 overflow-x-auto pb-4">
                  <h3 className="text-xl font-bold text-slate-700 mb-8 text-center md:text-left flex items-center gap-2">
                    <Search size={20} className="text-blue-500" />
                    Presença dos Poderes por Esfera Administrativa
                  </h3>
                  
                  <div className="min-w-[900px] bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <table className="w-full border-separate border-spacing-2">
                      <thead>
                        <tr className="text-white text-sm font-bold">
                          <th className="p-4 bg-slate-800 rounded-2xl w-[15%] uppercase tracking-widest text-[10px]">Poder</th>
                          <th className="p-4 bg-blue-700 rounded-2xl w-[28%] uppercase tracking-widest text-[10px] shadow-inner">Federal</th>
                          <th className="p-4 bg-green-700 rounded-2xl w-[28%] uppercase tracking-widest text-[10px] shadow-inner">Estadual</th>
                          <th className="p-4 bg-yellow-500 rounded-2xl w-[28%] uppercase tracking-widest text-[10px] shadow-inner">Municipal</th>
                        </tr>
                      </thead>
                      <tbody className="text-white font-bold text-sm">
                        
                        {/* LINHA EXECUTIVO */}
                        <tr>
                          <td className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex flex-col items-center gap-1">
                              <Settings className="text-blue-600" size={24} />
                              <span className="text-blue-900 text-[10px] uppercase font-black">Executivo</span>
                            </div>
                          </td>
                          {/* Federal */}
                          <td className="p-5 bg-blue-600 rounded-2xl shadow-md">
                            <div className="flex items-center gap-4">
                              <Globe size={32} className="opacity-80 shrink-0" />
                              <span className="leading-tight">Presidência</span>
                            </div>
                          </td>
                          {/* Estadual */}
                          <td className="p-5 bg-green-600 rounded-2xl shadow-md">
                            <div className="flex items-center gap-4">
                              <Building2 size={32} className="opacity-80 shrink-0" />
                              <span className="leading-tight">Governador</span>
                            </div>
                          </td>
                          {/* Municipal */}
                          <td className="p-5 bg-yellow-500 rounded-2xl shadow-md">
                            <div className="flex items-center gap-4">
                              <Home size={32} className="opacity-80 shrink-0" />
                              <span className="leading-tight">Prefeito</span>
                            </div>
                          </td>
                        </tr>

                        {/* LINHA LEGISLATIVO */}
                        <tr>
                          <td className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex flex-col items-center gap-1">
                              <FileText className="text-green-600" size={24} />
                              <span className="text-green-900 text-[10px] uppercase font-black">Legislativo</span>
                            </div>
                          </td>
                          {/* Federal */}
                          <td className="p-5 bg-blue-600 rounded-2xl shadow-md">
                            <div className="flex items-center gap-4">
                              <Landmark size={32} className="opacity-80 shrink-0" />
                              <span className="leading-tight text-xs">Congresso <br/> Nacional</span>
                            </div>
                          </td>
                          {/* Estadual */}
                          <td className="p-5 bg-green-600 rounded-2xl shadow-md">
                            <div className="flex items-center gap-4">
                              <Building2 size={32} className="opacity-80 shrink-0" />
                              <span className="leading-tight text-xs">Assembleia <br/> Legislativa</span>
                            </div>
                          </td>
                          {/* Municipal */}
                          <td className="p-5 bg-yellow-500 rounded-2xl shadow-md">
                            <div className="flex items-center gap-4">
                              <Users size={32} className="opacity-80 shrink-0" />
                              <span className="leading-tight text-xs">Câmara <br/> Municipal</span>
                            </div>
                          </td>
                        </tr>

                        {/* LINHA JUDICIÁRIO */}
                        <tr>
                          <td className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex flex-col items-center gap-1">
                              <Scale className="text-yellow-600" size={24} />
                              <span className="text-yellow-900 text-[10px] uppercase font-black">Judiciário</span>
                            </div>
                          </td>
                          {/* Federal */}
                          <td className="p-5 bg-blue-600 rounded-2xl shadow-md">
                            <div className="flex items-center gap-4">
                              <Gavel size={32} className="opacity-80 shrink-0" />
                              <span className="leading-tight">Tribunais <br/> Federais</span>
                            </div>
                          </td>
                          {/* Estadual */}
                          <td className="p-5 bg-green-600 rounded-2xl shadow-md">
                            <div className="flex items-center gap-4">
                              <Scale size={32} className="opacity-80 shrink-0" />
                              <span className="leading-tight">Tribunais <br/> Estaduais</span>
                            </div>
                          </td>
                          {/* Municipal */}
                          <td className="p-5 bg-slate-200 rounded-2xl shadow-inner border-2 border-dashed border-slate-300">
                            <div className="flex flex-col items-center justify-center opacity-40 text-slate-600">
                              <AlertCircle size={24} />
                              <span className="text-[10px] font-black mt-1">NÃO EXISTE</span>
                            </div>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </section>

            {/* SEÇÃO: CONGRESSO NACIONAL */}
            <section id="congresso" className="scroll-mt-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
                  O Congresso Nacional
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                  O Congresso Nacional exerce o Poder Legislativo da União e funciona no sistema <strong>bicameral</strong>, composto pela Câmara dos Deputados e pelo Senado Federal.
                </p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                
                {/* COLUNA ESQUERDA: CÂMARA DOS DEPUTADOS */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-none">Câmara dos Deputados</h3>
                      <span className="text-[12px] text-orange-600 font-bold uppercase tracking-wider">Representação do Povo</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { t: "Composição", d: "513 Deputados Federais eleitos.", icon: <User size={16}/> },
                      { t: "Sistema Eleitoral", d: "Sistema Proporcional (4 anos).", icon: <Layers size={16}/> },
                      { t: "Competência", 
                        d: "• Verificar a aplicação dos recursos públicos\n• Autorizar investigações do Presidente e Ministros", 
                        icon: <Gavel size={16}/>}
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 group hover:bg-orange-50 transition-colors">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-orange-600">{item.icon}</span>
                          <p className="font-bold text-slate-800 text-sm">{item.t}</p>
                        </div>
                        <p className="text-sm text-slate-500 pl-7 whitespace-pre-line leading-relaxed">
                          {item.d}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-orange-600 text-white p-4 rounded-2xl text-center shadow-lg shadow-orange-200">
                    <p className="text-[15px] uppercase font-bold opacity-80">Mandato</p>
                    <p className="text-2xl font-black italic">4 ANOS</p>
                  </div>
                </div>

                {/* COLUNA CENTRAL: O ÍCONE DO CONGRESSO */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center py-10">
                  <div className="relative w-full aspect-square max-w-[280px] flex items-center justify-center">
                    {/* Background do centro*/}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-blue-500 to-teal-500 rounded-full opacity-10 animate-pulse" />
                    <div className="relative z-10 text-center space-y-4">
                      <div className="bg-slate-900 text-white p-6 rounded-full shadow-2xl border-4 border-white">
                        <Landmark size={60} />
                      </div>
                      <p className="font-black text-slate-900 uppercase tracking-tighter text-xl">Congresso <br/> Nacional</p>
                    </div>
                  </div>
                </div>

                {/* COLUNA DIREITA: SENADO FEDERAL */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-teal-100 text-teal-600 rounded-2xl">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-none">Senado Federal</h3>
                      <span className="text-[12px] text-teal-600 font-bold uppercase tracking-wider">Representação dos Estados</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { t: "Composição", d: "81 Senadores (3 por estado/DF).", icon: <Users size={16}/> },
                      { t: "Sistema Eleitoral", d: "Sistema Majoritário (8 anos).", icon: <CheckCircle2 size={16}/> },
                      { 
                        t: "Competência", 
                        d: "• Aprova cargos (STF, PGR)\n• Define limites da dívida\n • Julga o Presidente e autoridades", 
                        icon: <Scale size={16}/> 
                      }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100 group hover:bg-teal-50 transition-colors text-left">
                        <div className="flex items-center gap-3 mb-1 justify-start">
                          <span className="text-teal-600">{item.icon}</span>
                          <p className="font-bold text-slate-800 text-sm">{item.t}</p>
                        </div>
                        <p className="text-sm text-slate-500 pl-7 whitespace-pre-line leading-relaxed">
                          {item.d}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-teal-600 text-white p-4 rounded-2xl text-center shadow-lg shadow-teal-200">
                    <p className="text-[15px] uppercase font-bold opacity-80">Mandato</p>
                    <p className="text-2xl font-black italic">8 ANOS</p>
                  </div>
                </div>

                {/* RODAPÉ DO CARD: FUNÇÕES COMPARTILHADAS */}
                <div className="lg:col-span-12 mt-12 pt-8 border-t border-slate-100">
                  <p className="text-center text-[20px] font-black uppercase tracking-[0.2em] text-slate-600 mb-8">Funções Compartilhadas</p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                      <FileText className="text-blue-500 shrink-0" size={20} />
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Legislação</p>
                        <p className="text-[18px] text-slate-500 leading-tight text-justify">Elaboram leis de competência federal em conjunto.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                      <Search className="text-blue-500 shrink-0" size={20} />
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Fiscalização</p>
                        <p className="text-[18px] text-slate-500 leading-tight">Controlam as contas e atos do Poder Executivo.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                      <Users className="text-blue-500 shrink-0" size={20} />
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Atuação Conjunta</p>
                        <p className="text-[18px] text-slate-500 leading-tight">Votam o orçamento e empossam o Presidente.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PARLAMENTAR */}
        <section id="parlamentar" className="scroll-mt-24 px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Cabeçalho da Seção */}
            <div className="mb-12 border-b border-slate-200 pb-12 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
                O Papel do Parlamentar
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Os deputados e senadores são os representantes eleitos pelo povo. Sua missão é traduzir as demandas da sociedade em leis, fiscalizar o uso do dinheiro público e participar ativamente das decisões fundamentais do país.
              </p>
            </div>

            {/* Navegação das Abas (Pills Style) */}
            <div className="flex items-center justify-center mb-16">
              <div className="inline-flex gap-2 bg-white p-2 rounded-full border border-slate-200 shadow-sm">
                {[
                  { name: "Poderes & Competências", icon: <Gavel size={18} /> },
                  { name: "Ação e Dia a Dia", icon: <Clock3 size={18} /> }
                ].map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${
                      activeTab === index 
                        ? "bg-blue-600 text-white shadow-lg" 
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Conteúdo das Abas */}
            <div className="grid grid-cols-1 gap-12">
              
              {/* ABA 0: PODERES & COMPETÊNCIAS - Layout Bento Matrix */}
              {activeTab === 0 && (
                <div className="grid md:grid-cols-2 gap-8 transition-opacity duration-300 opacity-100">
                  
                  {/* Função Legislativa - Destaque Largo */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-blue-900">
                      <FileText size={120} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-6">
                        <FileText size={28} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Função Legislativa</h3>
                      <p className="text-slate-500 text-sm mb-6 max-w-md">Propõe, debate e vota as leis federais, emendas à Constituição e medidas provisórias.</p>
                      
                      {/* Lista de Ações Específicas */}
                      <ul className="space-y-2.5 border-t border-slate-100 pt-5 mt-auto text-sm text-slate-600">
                        <li className="flex items-start gap-2.5"><CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0"/> Propor novas leis e códigos</li>
                        <li className="flex items-start gap-2.5"><CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0"/> Alterar a Constituição Federal</li>
                        <li className="flex items-start gap-2.5"><CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0"/> Votar tratados internacionais</li>
                      </ul>
                    </div>
                  </div>

                  {/* Outras Funções em Grid Menor */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Função Fiscalizadora */}
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm group">
                      <Eye className="text-green-600 mb-4" size={24} />
                      <h4 className="font-bold text-slate-900 mb-1">Fiscalizadora</h4>
                      <p className="text-[15px] text-slate-500 leading-tight">Controla os gastos do Governo e convoca ministros para dar explicações.</p>
                    </div>
                    {/* Função Orçamentária */}
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm group">
                      <Wallet className="text-yellow-600 mb-4" size={24} />
                      <h4 className="font-bold text-slate-900 mb-1">Orçamentária</h4>
                      <p className="text-[15px] text-slate-500 leading-tight">Define onde e quanto o Governo deve investir o dinheiro público.</p>
                    </div>
                    {/* Função Julgadora (Destaque Largo) */}
                    <div className="col-span-2 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                      <div className="p-3 bg-red-50 text-red-600 rounded-xl shrink-0">
                        <Scale size={32} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">Função Julgadora e Autorizadora</h4>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                          Aprova indicações de autoridades (como ministros do STF) e autoriza a abertura de processos contra o Presidente da República.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA 1: AÇÃO E DIA A DIA - Layout de Timeline Moderna */}
              {activeTab === 1 && (
                <div className="max-w-4xl mx-auto transition-opacity duration-300 opacity-100">
                  <p className="text-center text-slate-500 mb-12 max-w-lg mx-auto leading-relaxed">
                    A rotina parlamentar deve ir além do plenário. Descubra os diferentes cenários onde eles devem atuam para transformar propostas em realidade.
                  </p>
                  
                  <div className="relative border-l-2 border-dashed border-blue-200 ml-6 space-y-12 pb-10">
                    {[
                      { title: "No Gabinete", desc: "Reuniões com assessoria e recepção de demandas de prefeitos e eleitores.", icon: <User size={18}/> },
                      { title: "Nas Comissões", desc: "Debate técnico e detalhado de projetos de lei e audiências públicas.", icon: <BookOpen size={18}/> },
                      { title: "No Plenário", desc: "Votação formal e decisiva de projetos e grandes temas nacionais.", icon: <Users size={18}/> },
                      { title: "Nas Bases Eleitorais", desc: "Contato direto com a população para ouvir problemas e fiscalizar obras locais.", icon: <Home size={18}/> }
                    ].map((item, i) => (
                      <div key={i} className="relative pl-12 flex items-start gap-5 group">
                        {/* Bullet da Timeline */}
                        <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-sm group-hover:scale-110 transition-transform" />
                        
                        {/* Ícone Contextual */}
                        <div className="flex-shrink-0 p-3 bg-white rounded-xl border border-blue-100 text-blue-600 shadow-sm mt-0.5">
                          {item.icon}
                        </div>
                        
                        {/* Texto */}
                        <div>
                          <h4 className="font-bold text-lg text-slate-950 mb-1 tracking-tight">{item.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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