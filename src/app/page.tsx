export default function DashboardOverview() {
  return (
    <div className="animate-in fade-in duration-1000 ease-out">
      <header className="mb-16 md:mb-24">
        <h1 className="text-sm font-light tracking-wide text-[#ededed]">
          Dashboard Overview
        </h1>
        <p className="text-xs text-white/40 mt-2 font-extralight">
          System status and key metrics
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-24">
        {/* Card 1 */}
        <div className="group border border-[#333333]/30 bg-[#0F0F0F] rounded-2xl p-7 hover:border-[#333333]/80 hover:bg-[#111111] transition-all duration-500 ease-out flex flex-col justify-between h-40">
          <div className="flex justify-between items-center">
            <h2 className="text-xs text-white/50 font-light">Nodos Activos</h2>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] shadow-[0_0_8px_rgba(0,255,65,0.6)]"></div>
          </div>
          <p className="text-5xl font-extralight tracking-tight text-[#EDEDED]">
            142
          </p>
        </div>

        {/* Card 2 */}
        <div className="group border border-[#333333]/30 bg-[#0F0F0F] rounded-2xl p-7 hover:border-[#333333]/80 hover:bg-[#111111] transition-all duration-500 ease-out flex flex-col justify-between h-40">
          <h2 className="text-xs text-white/50 font-light">Uso de CPU</h2>
          <p className="text-5xl font-extralight tracking-tight text-[#EDEDED]">
            18%
          </p>
        </div>

        {/* Card 3 */}
        <div className="group border border-[#333333]/30 bg-[#0F0F0F] rounded-2xl p-7 hover:border-[#333333]/80 hover:bg-[#111111] transition-all duration-500 ease-out flex flex-col justify-between h-40">
          <div className="flex justify-between items-center">
            <h2 className="text-xs text-white/50 font-light">Alertas</h2>
            <span className="text-[10px] text-[#00FF41] border border-[#00FF41]/30 bg-[#00FF41]/5 px-2 py-0.5 rounded-full font-light tracking-wide">
              Normal
            </span>
          </div>
          <p className="text-5xl font-extralight tracking-tight text-[#EDEDED]">
            0
          </p>
        </div>
      </div>

      {/* Chart Area */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs text-white/50 font-light">
            Rendimiento del Clúster (Última Hora)
          </h3>
        </div>
        <div className="w-full h-96 rounded-2xl border border-dashed border-[#333333]/40 flex items-center justify-center hover:border-[#333333]/80 hover:bg-[#0F0F0F]/30 transition-all duration-700 ease-out group">
          <span className="text-xs text-white/20 font-extralight group-hover:text-white/40 transition-colors duration-500">
            Área de Gráfico
          </span>
        </div>
      </section>
    </div>
  );
}
