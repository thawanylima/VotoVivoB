import { Header } from '@/components/layout/HeaderLayout';
import Image from "next/image";

export default function EducativoPage() {
  return (
    <>
      <Header />

      <main className="bg-neutral-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-10">

          {/* Hero */}
          <section className="mb-12">
            <h1 className="text-4xl font-extrabold text-brasil-blue tracking-tight mb-3">
              Educativo
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Entenda de forma simples como funciona a política no Brasil e como isso impacta sua vida.
            </p>
          </section>

          {/* Estado */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🇧🇷 O que é o Estado brasileiro?
            </h2>

            <p className="text-gray-600 mb-6">
              O Brasil é formado por União, Estados, Distrito Federal e Municípios. Cada um tem autonomia para cuidar de suas responsabilidades.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <h3 className="font-bold text-brasil-blue">União</h3>
                <p className="text-sm text-gray-600 mt-1">Cuida de assuntos nacionais</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <h3 className="font-bold text-brasil-green">Estados</h3>
                <p className="text-sm text-gray-600 mt-1">Atuam em nível regional</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <h3 className="font-bold text-brasil-yellow">Municípios</h3>
                <p className="text-sm text-gray-600 mt-1">Cuidam do dia a dia da população</p>
              </div>
            </div>
          </section>

          {/* Democracia */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🗳️ Democracia representativa
            </h2>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-gray-700">
                O poder vem do povo, que escolhe representantes por meio do voto para tomar decisões em seu nome.
              </p>
            </div>
          </section>

          {/* Poderes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              ⚖️ Os três poderes
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition">
                <h3 className="font-bold text-brasil-blue mb-2">Executivo</h3>
                <p className="text-sm text-gray-600">Administra o país e executa políticas públicas.</p>
                <p className="text-xs text-gray-400 mt-2">Ex: hospitais, programas sociais</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-yellow-100 hover:shadow-lg transition">
                <h3 className="font-bold text-yellow-600 mb-2">Legislativo</h3>
                <p className="text-sm text-gray-600">Cria leis e fiscaliza o governo.</p>
                <p className="text-xs text-gray-400 mt-2">Ex: orçamento público</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-red-100 hover:shadow-lg transition">
                <h3 className="font-bold text-red-600 mb-2">Judiciário</h3>
                <p className="text-sm text-gray-600">Julga conflitos e garante direitos.</p>
                <p className="text-xs text-gray-400 mt-2">Ex: julgamento de crimes</p>
              </div>
            </div>
            <div className="mt-8">
            <Image
            src="/imagens/info3-estado-brasileiro.png"
            alt="Infográfico dos três poderes"
            width={900}
            height={500}
            className="rounded-2xl shadow-md mx-auto"
            />
            </div>
          </section>

        {/* Parlamentar */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🧑‍⚖️ O que faz um parlamentar?
            </h2>

            <p className="text-gray-600 mb-6">
              Parlamentares (deputados e senadores) são representantes eleitos que atuam no Poder Legislativo. Eles criam leis, fiscalizam o governo e representam a população.
            </p>

            {/* Funções principais */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-brasil-blue mb-2">Criar leis</h3>
                <p className="text-sm text-gray-600">Elaboram regras que organizam a sociedade.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-brasil-green mb-2">Fiscalizar</h3>
                <p className="text-sm text-gray-600">Acompanham e controlam ações do governo.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-brasil-yellow mb-2">Orçamento</h3>
                <p className="text-sm text-gray-600">Aprovam como o dinheiro público será gasto.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-gray-800 mb-2">Representar</h3>
                <p className="text-sm text-gray-600">Levam as demandas da população para o governo.</p>
              </div>
            </div>

            {/* Dia a dia */}
            <h3 className="text-xl font-semibold mb-4">📌 No dia a dia</h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-sm text-gray-700">
                  📄 Propõem leis e projetos
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-sm text-gray-700">
                  🗳️ Votam projetos e decisões importantes
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-sm text-gray-700">
                  🏛️ Participam de comissões e investigações (CPIs)
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-sm text-gray-700">
                  🎤 Debatem e defendem ideias
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-sm text-gray-700">
                  ⏱️ Devem comparecer às sessões e cumprir regras
                </p>
              </div>
            </div>
          </section>

          {/* Despesas */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              💰 Quanto custa um parlamentar?
            </h2>

            <p className="text-gray-600 mb-6 max-w-2xl">
              Além do salário, parlamentares possuem recursos para manter seu trabalho, como equipe, transporte e estrutura.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-brasil-blue mb-2">Salário</h3>
                <p className="text-lg font-semibold">R$ 46.366</p>
                <p className="text-xs text-gray-500 mt-2">Pode ter desconto por faltas</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-brasil-green mb-2">Verba de Gabinete</h3>
                <p className="text-sm text-gray-600">Equipe de assessores</p>
                <p className="text-xs text-gray-500 mt-2">Até 25 pessoas para deputados e11 para senadores</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-brasil-yellow mb-2">Cota Parlamentar</h3>
                <p className="text-sm text-gray-600">Custeio do mandato</p>
                <p className="text-xs text-gray-500 mt-2">~R$ 40 mil a R$ 58 mil/mês</p>
              </div>
            </div>

            <div className="space-y-4">

              <details className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <summary className="font-medium cursor-pointer">
                  O que está incluído na cota parlamentar?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  A Cota para o Exercício da Atividade Parlamentar é uma verba mensal que reembolsa despesas rotineiras do mandato. 
                </p>
                <p className="mt-2 text-sm text-gray-600">
                - Deputados Federais (CEAP): Os valores variam de R$ 41.612,55 (DF) a R$ 58.474,70 (RR). Além da cota, têm direito a até oito passagens aéreas extras por mês para voar entre seu estado e Brasília.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                 - Senadores (CEAPS): É formada por uma verba fixa de R$ 15.000 somada a uma verba de transporte que varia por estado, resultando em totais que vão de R$ 21.045,20 (DF e GO) a R$ 44.276,60 (AM).
                </p>
                <p className="mt-2 text-sm text-gray-600">
                 - Gastos incluídos: Aluguel de escritório de apoio, contas de água, luz, internet e telefone móvel, combustíveis e lubrificantes, contratação de consultorias técnicas e pesquisas, serviços de segurança privada, táxi, pedágio, alimentação e passagens aéreas ou terrestres.
                </p>

              </details>

              <details className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <summary className="font-medium cursor-pointer">
                  Quanto custa um gabinete?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                Verba de Gabinete: É o valor destinado ao pagamento dos salários dos funcionários que trabalham diretamente para o parlamentar.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Deputados têm cerca de R$ 118 mil/mês. No Senado, pode chegar a ~R$ 497 mil.
                </p>
              </details>

              <details className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <summary className="font-medium cursor-pointer">
                  Eles têm outros benefícios?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Auxílio Moradia: Podem usar imóveis funcionais ou receber auxílio-moradia.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Auxílio-saúde: têm direito a atendimento médico e odontológico.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Também recebem a ajuda de custo equivalente a um salário no início e fim do mandato.
                </p>
              </details>

            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              ❓ Perguntas frequentes
            </h2>

            <div className="space-y-4">
              <details className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <summary className="font-medium cursor-pointer">
                  Quem decide o preço da passagem?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  A Prefeitura (Executivo municipal).
                </p>
              </details>

              <details className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <summary className="font-medium cursor-pointer">
                  Quem cria as leis?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  O Poder Legislativo.
                </p>
              </details>

              <details className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <summary className="font-medium cursor-pointer">
                  Quem julga conflitos?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  O Poder Judiciário.
                </p>
              </details>

              <details className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <summary className="font-medium cursor-pointer">
                  Por que isso importa?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Porque impacta diretamente sua vida: saúde, educação, transporte e segurança.
                </p>
              </details>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
