# BAE

> [!NOTE]
>
> <p>
> Diseño e implementacion de un sistema web para
> la gestion del proceso de ventas en la 
> distribuidora Bae
> </p>

> [!NOTE]
> TECNOLOGIAS USADAS
>
> | C#   | .NET   | SQL Server |
> | ---- | ------ | ---------- |
> | JS   | jQuery | Bootstrap  |
> | HTML | Razor  | CSS        |
> | GIT  | GitHub |            |
>
> HERRAMIENTAS
>
> | VSCode | SSMS | Sdk .Net 7 |
> | ------ | ---- | ---------- |

> [!IMPORTANT]
> COMO LEVANTAR EL SERVICIO EN MODO DESARROLO

> [!WARNING]
> ANTES DE INICIAR
>
> 1.Tener instalado visual studio code
>
> 2.Tener instalado git y tener cuenta en git hub
>
> 3.Tener instalado el sdk .NET7
>
> 4.Tener instalado o tener acceso a una instancia de
> base de datos SQL server
>
> 5.Tener instalado el SSMS SQL Server Management Studio

> [!TIP]
> ESTAS LISTO ? EMPECEMOS
>
> 1.  Clonar el repositorio usando el comando git clone
>
> 2.  Navegar hacia la carpeta CapstoneG14/
>
> 3.  Ingresar el comando dotnet restore
>
> 4.  Ingresar en la instancia de la base de datos SQL server
>
> 5.  Revisar los scripts que se encuentran en la carpeta CapstoneG14/Data/;
>     encontraras 3 scrpts, el primero es el esquema de la base de dados, el segundo
>     son los inserts con datos iniciales para que el sitema pueda funcionar, y el tercero es
>     un script con el esquema, datos iniciales, y datos de prueba todo en uno
>
> 6.  Ejecutar el script del esquema y el script de inserts iniciales
>
> 7.  Puedes elgir ejecutar el script todo en uno, si haces esto pasar al punto 9
>
> 8.  Cambiar las configuracion de las apis [ir a configuracion de apis]
>
> 9.  Regresar a la carpeta CapstoneG14/appsettings.json
>
> 10. Cambiar la cadena de conexion por la del servidor actual de bd
>
> 11. Ejecutar el comando dotnet clear (no es obligatorio pero puede resolver problemas)
>
> 12. Ejecutar el comando dotnet build
>
> 13. Ejecutar el comando dotnet run
>
> 14. Ya tienes corriendo la palicacion web
>
> 15. Logueate con las credenciales sysadmin@bae.com 123

> [!WARNING]
> CONFIGURACION DE APIS
>
> 1.  Despues de ejecutar los scripts
>
> 2.  Realizar un select from \* configuracion
>     se mostrara una tabla con 3 columnas
>
> | recurso          | propiedad | valor   |
> | ---------------- | --------- | ------- |
> | Firebase_storage | email     | xxxxx   |
> | Firebase_storage | clave     | xxxxx   |
> | Firebase_storage | ruta      | xxx.com |
> | Firebase_storage | api_key   | xxxxxxx |
> | Servicio_Correo  | correo    | xxxxxxx |
> | Servicio_Correo  | clave     | xxxxxxx |
> | Servicio_Correo  | alias     | xxxxxxx |
>
> 4.  Revisar el archivo configApis
>
> 5.  Para el recurso servio_Correo:
>     correo [Es el correo con el cual esta configurado el servicio]
>     clave [Es la contraseña de de aplicacion del correo]
>     alias [Es el nobre con el que te llegara el correo, no es obligatorio cambiarlo]
>
> 6.  Para el recurso de Firebase_Storage
>     email[Es un usuario con el cual nos vamos a autenticar en el servicio de firebase]
>     clave[es la contraseña del usuario para ingresar al servicio de firebase]
>     ruta[Es la ruta fisica en donde se encuentra el storage]
>     api_key[Es la llave con la cual ingresamos al sevicio de storage]
>
> 7.  Reemplazar los valores por los que se enuentran dentro del archivo de
>     configApis

> [!CAUTION]
> QUE HACER SI NO ENCUENTRO EL ARCHIVO configApis?
>
> LAS APIS NO FUNCIONAN?
>
> COMO CONSIGO NUEVAS APIS?

> [!TIP]
> INSTRUCCIONES PARA CONSGUIR NUEVAS APIS

> [!NOTE]
> PAQUETES UTILIZADOS
>
> 1.  dotnet add package Microsoft.EntityFrameworkCore.SqlServer
> 2.  dotnet add package Microsoft.EntityFrameworkCore.Tools
> 3.  dotnet tool install --global dotnet-ef
> 4.  dotnet add package Firebase.Auth
> 5.  dotnet add package FirebaseStorage.net
> 6.  dotnet add package AutoMapper
> 7.  dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
> 8.  dotnet add package DinkToPDF , Librerias que se encuetran en:
>     CapstoneG14/Utilities/LibreriaPDF y extenciones que se encuentran en :CapstoneG14/Utilities/Extenciones

> [!IMPORTANT]
> COMO HACER SCAFFOLD
>
> 1.  dotnet ef dbcontext scaffold "Server=server_name;Database=bd_name;User=sa;Password=password;Trusted_Connection=False;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -o Models

> [!NOTE]
> COMO CREAR UN NUEVO PROYECTO MVC
>
> 1.  dotnet new mvc

> [!NOTE]
> Esto es una nota importante que debes tener en cuenta.

> [!TIP]
> Aquí tienes un consejo útil para mejorar tu código.

> [!IMPORTANT]
> Por favor, ten en cuenta que esta acción es irreversible.

> [!WARNING]
> Este procedimiento puede causar la pérdida de datos. ¡Ten cuidado!

> [!CAUTION]
> ¡Advertencia! Este proceso puede afectar el rendimiento del sistema.
