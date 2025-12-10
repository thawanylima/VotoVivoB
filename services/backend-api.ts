import { 
  buscarDeputadoPorId, 
  buscarDespesasDeputado, 
  buscarResumoGastosDeputado,
  buscarDeputadosComFiltros 
} from './deputados';

export interface FiltrosDeputados {
  nome?: string;
  partido?: string;
  uf?: string;
  pagina?: number;
}

export interface FiltrosDespesas {
  ano?: number;
  mes?: number;
  pagina?: number;
}

export async function getDeputados(filtros: FiltrosDeputados = {}) {
  try {
    const response = await buscarDeputadosComFiltros(filtros);
    return response;
  } catch (error) {
    console.error("Erro ao buscar deputados", error);
    return { 
      data: [], 
      meta: { 
        total: 0, 
        pagina: filtros.pagina || 1, 
        itensPorPagina: 10, 
        totalPaginas: 0 
      } 
    };
  }
}

export async function getDeputadoById(id: number) {
  try {
    return await buscarDeputadoPorId(id);
  } catch (error) {
    console.error(`Erro ao buscar deputado ${id}`, error);
    return null;
  }
}

export async function getDespesasDeputado(id: number, filtros: FiltrosDespesas = {}) {
  try {
    return await buscarDespesasDeputado(id, filtros);
  } catch (error) {
    console.error(`Erro ao buscar despesas do deputado ${id}`, error);
    return [];
  }
}

export async function getResumoGastosDeputado(id: number) {
  try {
    return await buscarResumoGastosDeputado(id);
  } catch (error) {
    console.error(`Erro ao buscar resumo de gastos do deputado ${id}`, error);
    return [];
  }
}