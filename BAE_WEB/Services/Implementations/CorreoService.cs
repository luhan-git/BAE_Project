using System.Net;
using System.Net.Mail;
using BAE_WEB.Models;
using BAE_WEB.Services.Interfaces;
using static BAE_WEB.Repositories.Interfaces.IGenericRepository;

namespace BAE_WEB.Services.Implementations
{
    public class CorreoService : ICorreoService
    {
        private readonly IGenericRepository<Configuracion> _configRepository;
        public CorreoService(IGenericRepository<Configuracion> configRepository)
        {
            _configRepository = configRepository;
        }
        public async Task<bool> EnviarCorreo(string correo, string asunto, string mensaje)
        {
            try
            {
                IQueryable<Configuracion> query = await _configRepository.Consultar(c => c.Recurso.Equals("Servicio_Correo"));
                Dictionary<string, string> config = query.ToDictionary(keySelector: c => c.Propiedad, elementSelector: c => c.Valor);
                var credenciales = new NetworkCredential(config["correo"], config["clave"]);
                var correoMessage = new MailMessage
                {
                    From = new MailAddress(config["correo"], config["alias"]),
                    Subject = asunto,
                    Body = mensaje,
                    IsBodyHtml = true
                };
                correoMessage.To.Add(new MailAddress(correo));
                var clienteServidor = new SmtpClient
                {
                    Host = config["host"],
                    Port = int.Parse(config["puerto"]),
                    Credentials = credenciales,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                };
                clienteServidor.Send(correoMessage);
                return true;

            }
            catch
            {
                return false;
            }
        }
    }
}