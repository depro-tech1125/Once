@echo off
title ONCE - Analizador Numerico de Vectores
chcp 65001 >nul
cls
color 0B

echo  ========================================================================
echo                   SISTEMA ONCE - MODO LOCAL
echo  ========================================================================
echo.
echo   [1] Abrir Interfaz Grafica Web (Moderna, Clara y con Estilos)
echo   [2] Ejecutar version en Consola C# (.NET)
echo   [3] Salir
echo.
echo  ========================================================================
echo   Iniciando automaticamente la Interfaz Grafica Web en tu navegador...
echo  ========================================================================
echo.

start "" "%~dp0index.html"

echo  [OK] Interfaz web cargada en tu navegador con exito.
echo.
echo  Si deseas ejecutar tambien la consola en C#, presiona [2].
echo  Para cerrar esta ventana, presiona cualquier otra tecla.
echo.
set /p opcion="Opcion (1/2/3): "

if "%opcion%"=="2" (
    cls
    echo  Ejecutando Once.exe en consola...
    echo.
    dotnet run --project "%~dp0Once.csproj"
    pause
)

exit
