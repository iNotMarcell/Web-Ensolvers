-- Crear base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'notes_app')
BEGIN
    CREATE DATABASE notes_app;
    PRINT ' Base de datos notes_app creada';
END
ELSE
BEGIN
    PRINT '  Base de datos notes_app ya existe';
END
GO

USE notes_app;
GO

-- ========================================
-- Eliminar tablas existentes (si necesario)
-- ========================================
PRINT 'Eliminando restricciones de clave foránea...';

DECLARE @sql NVARCHAR(MAX) = N'';
SELECT @sql += N'ALTER TABLE ' + QUOTENAME(OBJECT_SCHEMA_NAME(parent_object_id)) + '.' + 
               QUOTENAME(OBJECT_NAME(parent_object_id)) + 
               ' DROP CONSTRAINT ' + QUOTENAME(name) + ';'
FROM sys.foreign_keys;

IF LEN(@sql) > 0
BEGIN
    EXEC sp_executesql @sql;
    PRINT ' Restricciones eliminadas';
END
GO

-- Eliminar tablas si existen
IF OBJECT_ID('dbo.Notes', 'U') IS NOT NULL 
BEGIN
    DROP TABLE dbo.Notes;
    PRINT ' Tabla Notes eliminada';
END

IF OBJECT_ID('dbo.Categories', 'U') IS NOT NULL 
BEGIN
    DROP TABLE dbo.Categories;
    PRINT ' Tabla Categories eliminada';
END

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL 
BEGIN
    DROP TABLE dbo.Users;
    PRINT ' Tabla Users eliminada';
END
GO

-- ========================================
-- Crear tablas
-- ========================================

-- Tabla Users
PRINT 'Creando tabla Users...';
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    name NVARCHAR(100),
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE()
);
PRINT ' Tabla Users creada';
GO

-- Tabla Categories
PRINT 'Creando tabla Categories...';
CREATE TABLE Categories (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL UNIQUE,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE()
);
PRINT ' Tabla Categories creada';
GO

-- Tabla Notes
PRINT 'Creando tabla Notes...';
CREATE TABLE Notes (
    id INT PRIMARY KEY IDENTITY(1,1),
    titulo NVARCHAR(200) NOT NULL,
    contenido NVARCHAR(MAX) NOT NULL,
    categoria NVARCHAR(100) DEFAULT 'Sin categoría',
    archivada BIT DEFAULT 0,
    fechaCreacion DATETIME2 DEFAULT GETDATE(),
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE()
);
PRINT ' Tabla Notes creada';
GO

-- ========================================
-- Insertar datos de ejemplo
-- ========================================

-- Insertar usuario administrador
PRINT 'Insertando usuario administrador...';
-- Contraseña: admin123 (encriptada con bcrypt)
INSERT INTO Users (username, password, name, createdAt, updatedAt)
VALUES ('admin', '$2a$10$rYQ5YZXk7.xJ5yHGxqJGpuK8X3qH.gXEFQH9qVFqZvXMx5xH.gXE', 'Administrador', GETDATE(), GETDATE());
PRINT ' Usuario admin creado (usuario: admin, contraseña: admin123)';
GO

-- Insertar categorías de ejemplo
PRINT 'Insertando categorías de ejemplo...';
INSERT INTO Categories (nombre, createdAt, updatedAt)
VALUES 
    ('Trabajo', GETDATE(), GETDATE()),
    ('Personal', GETDATE(), GETDATE()),
    ('Urgente', GETDATE(), GETDATE()),
    ('Ideas', GETDATE(), GETDATE());
PRINT ' Categorías de ejemplo creadas';
GO

-- Insertar notas de ejemplo
PRINT 'Insertando notas de ejemplo...';
INSERT INTO Notes (titulo, contenido, categoria, archivada, fechaCreacion, createdAt, updatedAt)
VALUES 
    ('Bienvenida al Sistema', 'Esta es tu primera nota en el sistema de gestión de notas.', 'Personal', 0, GETDATE(), GETDATE(), GETDATE()),
    ('Reunión del equipo', 'Preparar agenda para la reunión semanal del equipo.', 'Trabajo', 0, GETDATE(), GETDATE(), GETDATE()),
    ('Ideas para el proyecto', 'Implementar sistema de notificaciones y búsqueda avanzada.', 'Ideas', 0, GETDATE(), GETDATE(), GETDATE());
PRINT ' Notas de ejemplo creadas';
GO

-- ========================================
-- Verificación final
-- ========================================
PRINT '';
PRINT '========================================';
PRINT '   Configuración completada';
PRINT '========================================';
PRINT '';

-- Mostrar estadísticas
SELECT 
    (SELECT COUNT(*) FROM Users) as 'Usuarios',
    (SELECT COUNT(*) FROM Categories) as 'Categorías',
    (SELECT COUNT(*) FROM Notes) as 'Notas';

PRINT '';
PRINT ' Base de datos configurada correctamente';
PRINT '';
PRINT 'Credenciales por defecto:';
PRINT '  Usuario: admin';
PRINT '  Contraseña: admin123';
PRINT '';