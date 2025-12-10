'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from "@/components/layout/HeaderLayout";
import { 
  getDeputadoById, 
  getDespesasDeputado, 
  getResumoGastosDeputado,
  FiltrosDespesas 
} from '@/services/backend-api';
import { 
  ParlamentarBackend, 
  DespesaBackend, 
  GastoResumo 
} from '@/types';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  MapPin, 
  TrendingUp,
  FileText,
  Vote,
  DollarSign,
  PieChart,
  BarChart3,
  Filter,
  Download,
  Share2,
  AlertCircle,
  Search
} from 'lucide-react';

type AbaAtiva = 'visao-geral' | 'despesas' | 'proposicoes' | 'votacoes';

export default function PerfilParlamentar() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  
  const [deputado, setDeputado] = useState<ParlamentarBackend | null>(null);
  const [loading, setLoading] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('visao-geral');
  const [despesas, setDespesas] = useState<DespesaBackend[]>([]);
  const [resumoGastos, setResumoGastos] = useState<GastoResumo[]>([]);
  const [filtroDespesas, setFiltroDespesas] = useState<FiltrosDespesas>({
    ano: new Date().getFullYear(),
    mes: undefined,
    pagina: 1
  });

  useEffect(() => {
    if (isNaN(id)) {
      router.push('/deputados');
      return;
    }
    
    carregarDados();
  }, [id, filtroDespesas]);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [deputadoData, despesasData, resumoData] = await Promise.all([
        getDeputadoById(id),
        getDespesasDeputado(id, filtroDespesas),
        getResumoGastosDeputado(id)
      ]);
      
      setDeputado(deputadoData);
      setDespesas(despesasData);
      setResumoGastos(resumoData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brasil-blue"></div>
          <p className="mt-4 text-slate-600">Carregando perfil do parlamentar...</p>
        </div>
      </main>
    );
  }

  if (!deputado) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Parlamentar não encontrado
            </h2>
            <p className="text-slate-600 mb-6">
              O parlamentar solicitado não está disponível no sistema.
            </p>
            <button
              onClick={() => router.push('/deputados')}
              className="bg-brasil-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Voltar para a lista
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Botão voltar */}
        <button
          onClick={() => router.push('/deputados')}
          className="mb-6 text-brasil-blue hover:text-blue-700 font-medium inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Voltar para lista
        </button>

        {/* Cabeçalho do perfil */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Foto */}
            <div className="flex-shrink-0">
              <img
                src={deputado.urlFoto || 'https://placehold.co/200x250/e2e8f0/808080?text=Sem+Foto'}
                alt={deputado.nomeParlamentar}
                className="w-48 h-64 object-cover rounded-lg"
              />
            </div>
            
            {/* Informações principais */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {deputado.nomeParlamentar}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-lg font-bold">
                  {deputado.siglaPartido}
                </span>
                <span className="text-slate-600 text-lg">•</span>
                <span className="text-slate-700 text-lg">{deputado.uf}</span>
                <span className="text-slate-600 text-lg">•</span>
                <span className="text-slate-700 text-lg">Deputado Federal</span>
              </div>
              
              <div className="mb-6">
                <span className={`px-4 py-2 rounded-lg font-semibold ${deputado.situacao === 'Em Exercício' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {deputado.situacao || 'Situação não informada'}
                </span>
              </div>
              
              {/* Informações biográficas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="text-slate-400" size={20} />
                  <div>
                    <p className="text-sm text-slate-500">Data de Nascimento</p>
                    <p className="font-medium">
                      {deputado.dataNascimento 
                        ? new Date(deputado.dataNascimento).toLocaleDateString('pt-BR')
                        : 'Não informado'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="text-slate-400" size={20} />
                  <div>
                    <p className="text-sm text-slate-500">Nome Civil</p>
                    <p className="font-medium">{deputado.nomeCivil || deputado.nomeParlamentar}</p>
                  </div>
                </div>
                
                {deputado.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="text-slate-400" size={20} />
                    <div>
                      <p className="text-sm text-slate-500">E-mail Oficial</p>
                      <p className="font-medium">{deputado.email}</p>
                    </div>
                  </div>
                )}
                
                {deputado.gabinete?.telefone && (
                  <div className="flex items-center gap-3">
                    <Phone className="text-slate-400" size={20} />
                    <div>
                      <p className="text-sm text-slate-500">Telefone do Gabinete</p>
                      <p className="font-medium">{deputado.gabinete.telefone}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contatos e redes sociais */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-3">Contatos e Redes Sociais</h3>
                <div className="flex flex-wrap gap-3">
                  {deputado.gabinete && (
                    <div className="flex items-center gap-2 bg-blue-50 text-brasil-blue px-4 py-2 rounded-lg">
                      <Building size={16} />
                      <span className="text-sm font-medium">
                        Gabinete: {deputado.gabinete.sala || 'Sala não informada'}
                        {deputado.gabinete.predio && ` • ${deputado.gabinete.predio}`}
                      </span>
                    </div>
                  )}
                  
                  {deputado.redesSociais && deputado.redesSociais.map((rede, index) => (
                    <a
                      key={index}
                      href={rede.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                    >
                      {rede.rede || 'Rede Social'}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          {/* Navegação das abas */}
          <div className="border-b border-slate-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setAbaAtiva('visao-geral')}
                className={`flex-1 min-w-0 px-6 py-4 font-semibold text-center whitespace-nowrap border-b-2 transition-colors ${abaAtiva === 'visao-geral' ? 'border-brasil-blue text-brasil-blue' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <BarChart3 size={18} />
                  Visão Geral
                </div>
              </button>
              
              <button
                onClick={() => setAbaAtiva('despesas')}
                className={`flex-1 min-w-0 px-6 py-4 font-semibold text-center whitespace-nowrap border-b-2 transition-colors ${abaAtiva === 'despesas' ? 'border-brasil-blue text-brasil-blue' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <DollarSign size={18} />
                  Despesas
                </div>
              </button>
              
              <button
                onClick={() => setAbaAtiva('proposicoes')}
                className={`flex-1 min-w-0 px-6 py-4 font-semibold text-center whitespace-nowrap border-b-2 transition-colors ${abaAtiva === 'proposicoes' ? 'border-brasil-blue text-brasil-blue' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileText size={18} />
                  Proposições
                </div>
              </button>
              
              <button
                onClick={() => setAbaAtiva('votacoes')}
                className={`flex-1 min-w-0 px-6 py-4 font-semibold text-center whitespace-nowrap border-b-2 transition-colors ${abaAtiva === 'votacoes' ? 'border-brasil-blue text-brasil-blue' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Vote size={18} />
                  Votações
                </div>
              </button>
            </nav>
          </div>
          
          {/* Conteúdo das abas */}
          <div className="p-8">
            {abaAtiva === 'visao-geral' && <AbaVisaoGeral deputado={deputado} resumoGastos={resumoGastos} />}
            {abaAtiva === 'despesas' && <AbaDespesas despesas={despesas} resumoGastos={resumoGastos} />}
            {abaAtiva === 'proposicoes' && <AbaProposicoes />}
            {abaAtiva === 'votacoes' && <AbaVotacoes />}
          </div>
        </div>
      </div>
    </main>
  );
}

function AbaVisaoGeral({ deputado, resumoGastos }: { deputado: ParlamentarBackend, resumoGastos: GastoResumo[] }) {
  const totalGastos = resumoGastos.reduce((sum, item) => sum + item.total, 0);
  
  // Cores para os segmentos do gráfico
  const colors = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#06b6d4', // cyan-500
  ];
  
  // Função para renderizar o gráfico
  const renderGraficoPizza = () => {
    if (resumoGastos.length === 0) return null;
    
    // Caso especial: apenas uma categoria (100%)
    if (resumoGastos.length === 1 && resumoGastos[0].total > 0) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Círculo completo para 100% */}
          <circle cx="50" cy="50" r="40" fill={colors[0]} stroke="white" strokeWidth="2" />
          {/* Círculo central branco */}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>
      );
    }
    
    // Caso normal: múltiplas categorias
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {(() => {
          let accumulatedAngle = 0;
          const centerX = 50;
          const centerY = 50;
          const radius = 40;
          
          return resumoGastos.map((item, index) => {
            const percentage = totalGastos > 0 ? (item.total / totalGastos) : 0;
            
            // Ignora categorias com 0%
            if (percentage <= 0) return null;
            
            const angle = percentage * 360;
            
            // Ajuste para evitar problemas com ângulo completo (359.99 em vez de 360)
            const adjustedAngle = angle >= 360 ? 359.99 : angle;
            
            const startAngle = accumulatedAngle;
            const endAngle = startAngle + adjustedAngle;
            
            const startRad = (startAngle - 90) * Math.PI / 180;
            const endRad = (endAngle - 90) * Math.PI / 180;
            
            const x1 = centerX + radius * Math.cos(startRad);
            const y1 = centerY + radius * Math.sin(startRad);
            const x2 = centerX + radius * Math.cos(endRad);
            const y2 = centerY + radius * Math.sin(endRad);
            
            const largeArcFlag = adjustedAngle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            accumulatedAngle += adjustedAngle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="2"
              />
            );
          });
        })()}
        
        {/* Círculo central branco */}
        <circle cx="50" cy="50" r="25" fill="white" />
      </svg>
    );
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Visão Geral do Mandato</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="text-brasil-blue" size={24} />
            <span className="text-sm font-semibold text-slate-600">Último mês</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">
            {totalGastos > 0 
              ? `R$ ${totalGastos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : 'Não disponível'}
          </p>
          <p className="text-sm text-slate-600">Total gasto</p>
        </div>
        
        <div className="bg-green-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="text-green-600" size={24} />
            <span className="text-sm font-semibold text-slate-600">Este mandato</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">-</p>
          <p className="text-sm text-slate-600">Proposições apresentadas</p>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Vote className="text-purple-600" size={24} />
            <span className="text-sm font-semibold text-slate-600">2025</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">-</p>
          <p className="text-sm text-slate-600">Comparecimento em votações</p>
        </div>
        
        <div className="bg-orange-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-orange-600" size={24} />
            <span className="text-sm font-semibold text-slate-600">Média comparativa</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">-</p>
          <p className="text-sm text-slate-600">vs partido/casa</p>
        </div>
      </div>
      
      {/* Distribuição de gastos */}
      {resumoGastos.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Distribuição de Gastos por Tipo</h3>
          <div className="bg-slate-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gráfico de pizza */}
              <div className="flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {renderGraficoPizza()}
                  
                  {/* Texto no centro */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">
                        {totalGastos > 0 
                          ? `R$ ${Math.round(totalGastos).toLocaleString('pt-BR')}`
                          : 'N/A'}
                      </p>
                      <p className="text-xs text-slate-600">Total</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Legenda */}
              <div className="space-y-4">
                {resumoGastos.map((item, index) => {
                  const percentual = totalGastos > 0 ? (item.total / totalGastos) * 100 : 0;
                  
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div 
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: colors[index % colors.length] }}
                        ></div>
                        <span className="font-medium text-slate-700 break-words overflow-hidden">
                          {item.tipoDespesa}
                        </span>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p className="font-semibold text-slate-900 whitespace-nowrap">
                          R$ {item.total.toLocaleString('pt-BR', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}
                        </p>
                        <p className="text-sm text-slate-600 whitespace-nowrap">
                          {percentual.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  );
                })}
                
                {/* Total - só mostra se houver mais de uma categoria */}
                {resumoGastos.length > 1 && (
                  <div className="pt-4 mt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-slate-300"></div>
                        <span className="font-bold text-slate-900">Total</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">
                          R$ {totalGastos.toLocaleString('pt-BR', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}
                        </p>
                        <p className="text-sm text-slate-600">100%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Comissões */}
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Participação em Comissões</h3>
        <div className="bg-slate-50 rounded-xl p-6">
          <p className="text-slate-600 italic">
            Dados de comissões estarão disponíveis em breve.
          </p>
        </div>
      </div>
    </div>
  );
}

function AbaDespesas({ despesas, resumoGastos }: { despesas: DespesaBackend[], resumoGastos: GastoResumo[] }) {
  const totalGastos = resumoGastos.reduce((sum, item) => sum + item.total, 0);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Despesas Detalhadas</h2>
        
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 rounded-lg px-4 py-2">
            <p className="text-sm text-slate-600">Mês Atual</p>
            <p className="text-lg font-bold text-slate-900">
              R$ {(totalGastos / 3).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg px-4 py-2">
            <p className="text-sm text-slate-600">Média Partido</p>
            <p className="text-lg font-bold text-slate-900">R$ --</p>
          </div>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="bg-slate-50 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h3 className="font-semibold text-slate-900">Filtros</h3>
          <div className="flex flex-wrap gap-3">
            <select className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brasil-blue focus:border-transparent">
              <option>Mês/Trimestre/Ano</option>
              <option>Último mês</option>
              <option>Último trimestre</option>
              <option>Último ano</option>
            </select>
            
            <select className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brasil-blue focus:border-transparent">
              <option>Todos os tipos de despesa</option>
              {resumoGastos.map((item, index) => (
                <option key={index}>{item.tipoDespesa}</option>
              ))}
            </select>
            
            <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Filter size={16} />
              Aplicar
            </button>
          </div>
        </div>
        
        {/* Ações */}
        <div className="flex justify-end gap-3">
          <button className="text-slate-700 hover:text-slate-900 px-4 py-2 rounded-lg border border-slate-300 hover:border-slate-400 transition-colors flex items-center gap-2">
            <Share2 size={16} />
            Compartilhar
          </button>
        </div>
      </div>
      
      {/* Tabela de despesas */}
      {despesas.length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">Data</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Tipo</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Fornecedor</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Valor</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Documento</th>
                </tr>
              </thead>
              <tbody>
                {despesas.map((despesa, index) => (
                  <tr key={index} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="p-4">
                      {new Date(despesa.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-50 text-brasil-blue px-3 py-1 rounded-full text-sm font-medium">
                        {despesa.tipo}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-slate-900">
                      {despesa.fornecedor || 'Não informado'}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      R$ {despesa.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-4">
                      {despesa.urlDocumento ? (
                        <a
                          href={despesa.urlDocumento}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brasil-blue hover:underline text-sm"
                        >
                          Ver documento
                        </a>
                      ) : (
                        <span className="text-slate-400 text-sm">Não disponível</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-xl p-12 text-center">
          <PieChart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Nenhuma despesa encontrada
          </h3>
          <p className="text-slate-600">
            Não há registros de despesas para o período selecionado.
          </p>
        </div>
      )}
    </div>
  );
}

function AbaProposicoes() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Proposições Legislativas</h2>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar nas ementas..."
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brasil-blue focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
        </div>
      </div>
      
      <div className="bg-slate-50 rounded-xl p-12 text-center">
        <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Dados em desenvolvimento
        </h3>
        <div className="inline-flex items-center gap-2 text-sm text-slate-500">
          <span className="animate-pulse">●</span>
          <span>Em breve: Lista de PL, PEC, status e timeline de tramitação</span>
        </div>
      </div>
    </div>
  );
}

function AbaVotacoes() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Histórico de Votações</h2>
      
      <div className="bg-slate-50 rounded-xl p-12 text-center">
        <Vote className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Dados em desenvolvimento
        </h3>
        <div className="inline-flex items-center gap-2 text-sm text-slate-500">
          <span className="animate-pulse">●</span>
          <span>Em breve: Como votou, alinhamento com partido, gráficos por tema</span>
        </div>
      </div>
    </div>
  );
}

