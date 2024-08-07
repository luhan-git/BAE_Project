using Microsoft.EntityFrameworkCore;
using BAE_WEB.Repositories.Interfaces;
using BAE_WEB.Models;

namespace BAE_WEB.Repositories.Implementations
{
    public class VentaRepository : GenericRepository<Ventum>, IVentaRepository
    {
        private readonly BaeContext _context;
        public VentaRepository(BaeContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Ventum> Registrar(Ventum ventum)
        {
            Ventum ventaGenerada = new();
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    foreach (DetalleVentum dv in ventum.DetalleVenta)
                    {
                        Libro libroEncontrado = _context.Libros.Where(l => l.IdLibro == dv.IdLibro).First();
                        libroEncontrado.Stock -= dv.Cantidad;
                        _context.Libros.Update(libroEncontrado);
                        await _context.SaveChangesAsync();
                    }
                    NumeroCorrelativo correlative = _context.NumeroCorrelativos.Where(nc => nc.Gestion == "venta").First();
                    correlative.UltimoNumero += 1;
                    correlative.FechaActualizacion = DateTime.Now;
                    _context.NumeroCorrelativos.Update(correlative);
                    await _context.SaveChangesAsync();
                    string ceros = string.Concat(Enumerable.Repeat("0", correlative.CantidadDigitos.Value));
                    string numeroVenta = ceros + correlative.UltimoNumero.ToString();
                    numeroVenta = numeroVenta.Substring(numeroVenta.Length - correlative.CantidadDigitos.Value, correlative.CantidadDigitos.Value);
                    ventum.NumeroVenta = numeroVenta;
                    _context.Venta.Add(ventum);
                    await _context.SaveChangesAsync();
                    ventaGenerada = ventum;
                    transaction.Commit();

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
            return ventaGenerada;
        }

        public async Task<List<DetalleVentum>> Reporte(DateTime fechaInicio, DateTime fechaFin)
        {
            List<DetalleVentum> resumen = await _context.DetalleVenta
               .Include(v => v.IdVentaNavigation).ThenInclude(u => u.IdUsuarioNavigation)
               .Include(v => v.IdVentaNavigation).ThenInclude(tdv => tdv.IdTipoDocumentoVentaNavigation)
               .Where(dv => dv.IdVentaNavigation.FechaRegistro.Value.Date >= fechaInicio.Date &&
               dv.IdVentaNavigation.FechaRegistro.Value.Date <= fechaFin.Date).ToListAsync();
            return resumen;
        }
    }
}