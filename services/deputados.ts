import { Deputado, Despesa, Proposicao, Partido, UFs, ParlamentarBackend, DespesaBackend, GastoResumo } from '@/types'; 

// Função auxiliar para fazer requisições
async function fazerRequisicao(endpoint: string): Promise<any> {
  const baseURL = 'https://dadosabertos.camara.leg.br/api/v2';
  
  try {
    // Tenta primeiro com proxy (para desenvolvimento)
    if (typeof window !== 'undefined') {
      console.log(`📡 Tentando via proxy: /api/camara${endpoint}`);
      const proxyResponse = await fetch(`/api/camara${endpoint}`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (proxyResponse.ok) {
        return await proxyResponse.json();
      }
    }
    
    // Se proxy falhar ou estiver no servidor, tenta direto
    console.log(`📡 Tentando direto: ${baseURL}${endpoint}`);
    const directResponse = await fetch(`${baseURL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!directResponse.ok) {
      throw new Error(`HTTP ${directResponse.status}: ${directResponse.statusText}`);
    }
    
    return await directResponse.json();
    
  } catch (error: any) {
    console.error(`❌ Erro na requisição ${endpoint}:`, error.message);
    throw error;
  }
}

// Busca deputado por ID (detalhado)
export async function buscarDeputadoPorId(id: number): Promise<ParlamentarBackend | null> {
  try {
    console.log(`🔍 Buscando deputado com ID: ${id}`);
    
    const data = await fazerRequisicao(`/deputados/${id}`);
    
    if (!data || !data.dados) {
      console.error('Resposta da API sem dados:', data);
      return null;
    }
    
    const dadosApi = data.dados;
    
    // Log para debug
    console.log('✅ Dados recebidos da API:', {
      id: dadosApi.id,
      nome: dadosApi.ultimoStatus?.nome,
      partido: dadosApi.ultimoStatus?.siglaPartido,
      uf: dadosApi.ultimoStatus?.siglaUf,
      foto: !!dadosApi.ultimoStatus?.urlFoto
    });
    
    return {
      id: dadosApi.id,
      nomeParlamentar: dadosApi.ultimoStatus?.nomeEleitoral || dadosApi.ultimoStatus?.nome || '',
      nomeCivil: dadosApi.nomeCivil || '',
      siglaPartido: dadosApi.ultimoStatus?.siglaPartido || '',
      uf: dadosApi.ultimoStatus?.siglaUf || '',
      urlFoto: dadosApi.ultimoStatus?.urlFoto || 'https://placehold.co/200x250/e2e8f0/808080?text=Sem+Foto',
      dataNascimento: dadosApi.dataNascimento || '',
      email: dadosApi.ultimoStatus?.email || dadosApi.ultimoStatus?.gabinete?.email,
      situacao: dadosApi.ultimoStatus?.situacao || '',
      gabinete: dadosApi.ultimoStatus?.gabinete ? {
        sala: dadosApi.ultimoStatus.gabinete.sala,
        predio: dadosApi.ultimoStatus.gabinete.predio,
        telefone: dadosApi.ultimoStatus.gabinete.telefone,
        andar: dadosApi.ultimoStatus.gabinete.andar,
        nomeGabinete: dadosApi.ultimoStatus.gabinete.nome,
        emailGabinete: dadosApi.ultimoStatus.gabinete.email
      } : undefined,
      redesSociais: (dadosApi.redeSocial || []).map((url: string) => ({
        url,
        rede: url.includes('twitter.com') ? 'Twitter' : 
               url.includes('facebook.com') ? 'Facebook' : 
               url.includes('instagram.com') ? 'Instagram' : 
               url.includes('youtube.com') ? 'YouTube' : 'Outra'
      }))
    };
  } catch (error: any) {
    console.error(`❌ Erro ao buscar deputado ${id}:`, error.message);
    return null;
  }
}

// Busca lista simplificada de deputados (para homepage)
export async function getDeputadosLista(itens: number = 8): Promise<Deputado[]> {
  try {
    console.log(`📋 Buscando lista de deputados (${itens} itens)`);
    
    const data = await fazerRequisicao(`/deputados?ordem=ASC&ordenarPor=nome&itens=${itens}`);
    
    if (!data || !data.dados) {
      console.error('Resposta da API sem dados:', data);
      return [];
    }
    
    const deputadosApi = data.dados;
    
    return deputadosApi.map((dep: any) => ({
      id: dep.id,
      uri: dep.uri,
      nome: dep.nome,
      siglaPartido: dep.siglaPartido,
      uriPartido: dep.uriPartido,
      siglaUf: dep.siglaUf,
      urlFoto: dep.urlFoto || 'https://placehold.co/400x300/e2e8f0/808080?text=Sem+Foto'
    })) as Deputado[];
  } catch (error: any) {
    console.error('❌ Erro ao buscar lista de deputados:', error.message);
    return [];
  }
}

// Busca despesas de um deputado
export async function buscarDespesasDeputado(id: number, filtros?: { ano?: number, mes?: number, pagina?: number }): Promise<DespesaBackend[]> {
  try {
    console.log(`💰 Buscando despesas do deputado ${id}`, filtros);
    
    let endpoint = `/deputados/${id}/despesas?ordem=DESC&ordenarPor=dataDocumento`;
    
    if (filtros?.ano) endpoint += `&ano=${filtros.ano}`;
    if (filtros?.mes) endpoint += `&mes=${filtros.mes}`;
    
    const itens = filtros?.pagina ? '10' : '15';
    endpoint += `&itens=${itens}`;
    
    if (filtros?.pagina) {
      endpoint += `&pagina=${filtros.pagina}`;
    }
    
    const data = await fazerRequisicao(endpoint);
    
    if (!data || !data.dados) {
      console.error('Resposta da API sem dados:', data);
      return [];
    }
    
    const despesasApi = data.dados || [];
    
    return despesasApi.map((despesa: any) => ({
      data: despesa.dataDocumento || '',
      tipo: despesa.tipoDespesa || '',
      fornecedor: despesa.nomeFornecedor || '',
      valor: despesa.valorLiquido || despesa.valorDocumento || 0,
      urlDocumento: despesa.urlDocumento
    })) as DespesaBackend[];
  } catch (error: any) {
    console.error(`❌ Erro ao buscar despesas do deputado ${id}:`, error.message);
    return [];
  }
}

// Busca resumo de gastos (agrupado por tipo)
export async function buscarResumoGastosDeputado(id: number): Promise<GastoResumo[]> {
  try {
    console.log(`📊 Buscando resumo de gastos do deputado ${id}`);
    
    // Busca despesas do ano atual
    const anoAtual = new Date().getFullYear();
    const data = await fazerRequisicao(`/deputados/${id}/despesas?ano=${anoAtual}&itens=50`);
    
    if (!data || !data.dados) {
      console.error('Resposta da API sem dados:', data);
      return [];
    }
    
    const despesasApi = data.dados || [];
    
    // Agrupa por tipo de despesa
    const resumoPorTipo = despesasApi.reduce((acc: any, despesa: any) => {
      const tipo = despesa.tipoDespesa || 'Outras Despesas';
      if (!acc[tipo]) {
        acc[tipo] = 0;
      }
      acc[tipo] += despesa.valorLiquido || despesa.valorDocumento || 0;
      return acc;
    }, {});
    
    // Converte para o formato esperado
    return Object.entries(resumoPorTipo)
      .map(([tipoDespesa, total]) => ({
        tipoDespesa,
        total: total as number
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  } catch (error: any) {
    console.error(`❌ Erro ao buscar resumo de gastos do deputado ${id}:`, error.message);
    return [];
  }
}

// Busca deputados com filtros (para listagem)
export async function buscarDeputadosComFiltros(filtros: { nome?: string, partido?: string, uf?: string, pagina?: number }) {
  try {
    console.log('🔍 Buscando deputados com filtros:', filtros);
    
    let endpoint = '/deputados?ordem=ASC&ordenarPor=nome';
    
    if (filtros.nome) endpoint += `&nome=${encodeURIComponent(filtros.nome)}`;
    if (filtros.partido) endpoint += `&siglaPartido=${encodeURIComponent(filtros.partido)}`;
    if (filtros.uf) endpoint += `&siglaUf=${encodeURIComponent(filtros.uf)}`;
    
    const itensPorPagina = 12;
    const pagina = filtros.pagina || 1;
    
    endpoint += `&pagina=${pagina}&itens=${itensPorPagina}`;
    
    const data = await fazerRequisicao(endpoint);
    
    if (!data || !data.dados) {
      console.error('Resposta da API sem dados:', data);
      return { data: [], meta: { total: 0, pagina, itensPorPagina, totalPaginas: 0 } };
    }
    
    const deputadosApi = data.dados || [];
    const links = data.links || [];
    
    // Extrai informações de paginação dos links
    let totalPaginas = 1;
    const lastLink = links.find((link: any) => link.rel === 'last');
    if (lastLink && lastLink.href) {
      const match = lastLink.href.match(/pagina=(\d+)/);
      if (match) {
        totalPaginas = parseInt(match[1], 10);
      }
    }
    
    // Estima o total baseado nas páginas
    const total = totalPaginas * itensPorPagina;
    
    const deputadosTransformados = deputadosApi.map((dep: any) => ({
      id: dep.id,
      nomeParlamentar: dep.nome,
      siglaPartido: dep.siglaPartido,
      uf: dep.siglaUf,
      urlFoto: dep.urlFoto || 'https://placehold.co/200x250/e2e8f0/808080?text=Sem+Foto',
      situacao: 'Em Exercício'
    })) as ParlamentarBackend[];
    
    return {
      data: deputadosTransformados,
      meta: {
        total,
        pagina,
        itensPorPagina,
        totalPaginas
      }
    };
  } catch (error: any) {
    console.error('❌ Erro ao buscar deputados com filtros:', error.message);
    return { 
      data: [], 
      meta: { 
        total: 0, 
        pagina: filtros.pagina || 1, 
        itensPorPagina: 12, 
        totalPaginas: 0 
      } 
    };
  }
}

// Funções mantidas para compatibilidade
export async function getDespesasDeputado(id: number): Promise<Despesa[]> {
  try {
    const data = await fazerRequisicao(`/deputados/${id}/despesas?ordem=DESC&ordenarPor=dataDocumento&itens=15`);
    
    if (!data || !data.dados) {
      return [];
    }
    
    const despesasApi = data.dados || [];
    return despesasApi.map((desp: any) => ({
      mes: desp.mes,
      tipoDespesa: desp.tipoDespesa,
      valorLiquido: desp.valorLiquido || 0,
      dataDocumento: desp.dataDocumento
    })) as Despesa[];
  } catch (error: any) {
    console.error("❌ Erro ao buscar despesas:", error.message);
    return [];
  }
}

export async function getProposicoesDeputado(id: number): Promise<Proposicao[]> {
  try {
    const data = await fazerRequisicao(`/proposicoes?idDeputadoAutor=${id}&ordem=DESC&ordenarPor=id&itens=5`);
    
    if (!data || !data.dados) {
      return [];
    }
    
    return data.dados as Proposicao[];
  } catch (error: any) {
    console.error("❌ Erro ao buscar proposições:", error.message);
    return [];
  }
}

export async function getVotacoesDeputado(id: number) {
  try {
    const data = await fazerRequisicao(`/votacoes?dataInicio=2024-01-01&dataFim=2024-12-31&idDeputado=${id}&itens=5`);
    
    if (!data || !data.dados) {
      return [];
    }
    
    return data.dados; 
  } catch (error: any) {
    console.error("❌ Erro ao buscar votações:", error.message);
    return [];
  }
}

export async function getPartidos(): Promise<Partido[]> {
  try {
    const data = await fazerRequisicao(`/partidos?ordem=ASC&ordenarPor=sigla`);
    
    if (!data || !data.dados) {
      return [];
    }
    
    return data.dados as Partido[];
  } catch (error: any) {
    console.error("❌ Erro ao buscar partidos:", error.message);
    return [];
  }
}

export { UFs };