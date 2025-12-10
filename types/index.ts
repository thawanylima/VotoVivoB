export interface Deputado {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido: string;
  siglaUf: string;
  urlFoto: string;
}

export interface Despesa {
  mes: number;
  tipoDespesa: string;
  valorLiquido: number;
  dataDocumento: string;
}

export interface Proposicao {
  id: number;
  siglaTipo: string;
  numero: number;
  ano: number;
  ementa: string;
}

export interface Partido {
  id: number;
  sigla: string;
  nome: string;
}

export const UFs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];
export interface ParlamentarBackend {
  id: number;
  nomeParlamentar: string;
  siglaPartido: string;
  uf: string;
  urlFoto: string;
  nomeCivil?: string;
  dataNascimento?: string;
  email?: string;
  situacao?: string;
  gabinete?: Gabinete;
  redesSociais?: RedeSocial[];
}

export interface Gabinete {
  sala?: string;
  predio?: string;
  telefone?: string;
  andar?: string;
  nomeGabinete?: string;
  emailGabinete?: string;
}

export interface RedeSocial {
  url: string;
  rede?: string;
}

export interface DespesaBackend {
  data: string;
  tipo: string;
  fornecedor: string;
  valor: number;
  urlDocumento?: string;
}

export interface GastoResumo {
  tipoDespesa: string;
  total: number;
}

export interface DeputadosResponse {
  data: ParlamentarBackend[];
  meta: {
    total: number;
    pagina: number;
    itensPorPagina: number;
    totalPaginas: number;
  };
}