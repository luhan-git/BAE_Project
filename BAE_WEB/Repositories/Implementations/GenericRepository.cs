using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using static BAE_WEB.Repositories.Interfaces.IGenericRepository;
using BAE_WEB.Models;

namespace BAE_WEB.Repositories.Implementations
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly BaeContext _context;
        public GenericRepository(BaeContext context)
        {
            _context = context;
        }
        public async Task<IQueryable<TEntity>> Consultar(Expression<Func<TEntity, bool>>? filters = null)
        {
            IQueryable<TEntity> queryEntidad = filters == null ? _context.Set<TEntity>() : _context.Set<TEntity>().Where(filters);
            return queryEntidad;
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            try
            {
                await _context.Set<TEntity>().AddAsync(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch
            {

                throw;
            }
        }

        public async Task<bool> Delete(TEntity entity)
        {
            try
            {
                _context.Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {

                throw;
            }
        }

        public async Task<TEntity?> Obtener(Expression<Func<TEntity, bool>> filters)
        {
            try
            {
                TEntity? entity = await _context.Set<TEntity>().FirstOrDefaultAsync(filters);
                return entity;
            }
            catch
            {

                throw;
            }
        }

        public async Task<bool> Update(TEntity entity)
        {
            try
            {
                _context.Update(entity);//metodo mas corto
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {

                throw;
            }
        }
    }
}
