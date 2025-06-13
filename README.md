
# Barbería José El Barbero - Landing Page

Una landing page moderna y elegante para la barbería de José El Barbero, con sistema de reservas integrado y panel de administración.

## 🌟 Características

- **Diseño Moderno**: Estilo contemporáneo con paleta de colores premium (negro, dorado, blanco)
- **Carrusel de Imágenes**: Hero section con carrusel automático de imágenes de la barbería
- **Sistema de Reservas**: Calendario interactivo para que los clientes reserven citas online
- **Panel de Administración**: Gestión completa de citas (ver, completar, cancelar, eliminar)
- **Secciones Completas**:
  - Hero con carrusel de imágenes
  - Servicios con precios y duración
  - Galería de trabajos
  - Información de contacto
  - Testimonios de clientes
- **Responsive Design**: Optimizado para todos los dispositivos
- **Animaciones Suaves**: Transiciones y efectos visuales elegantes

## 🚀 Tecnologías Utilizadas

- **React 18** con TypeScript
- **Vite** para el bundling y desarrollo
- **Tailwind CSS** para el diseño
- **Shadcn/UI** para componentes
- **Lucide React** para iconos
- **Date-fns** para manejo de fechas

## 📦 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos para Ejecutar Localmente

1. **Clonar el repositorio**
```bash
git clone [tu-repositorio-url]
cd barberia-jose-landing
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Acceder a la aplicación**
```
http://localhost:8080
```

## 🌐 Despliegue en GitHub Pages

### Opción 1: Automático con GitHub Actions

1. **Fork del repositorio** o sube tu código a un repositorio de GitHub

2. **Configurar GitHub Pages**:
   - Ve a `Settings` → `Pages`
   - Selecciona `Deploy from a branch`
   - Elige `main` como branch
   - Selecciona `/ (root)` como folder

3. **Crear archivo de workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Opción 2: Manual

1. **Construir el proyecto**:
```bash
npm run build
```

2. **El archivo `dist/` contendrá los archivos estáticos**

3. **Subir el contenido de `dist/` a la rama `gh-pages`** o configurar GitHub Pages para usar la carpeta `dist/` de la rama main.

### Configuración de Vite para GitHub Pages

Si tu repositorio no está en la raíz del dominio, actualiza `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/nombre-de-tu-repositorio/',
  // ... resto de configuración
});
```

## 🔧 Configuración del Sistema de Reservas

### Panel de Administración
- **Acceso**: Botón "Admin" en el header
- **Contraseña por defecto**: `admin123`
- **Funcionalidades**:
  - Ver citas del día
  - Ver citas de la semana
  - Completar citas
  - Cancelar citas
  - Eliminar citas

### Personalización

1. **Cambiar servicios**: Edita el array `services` en `src/components/Services.tsx`
2. **Actualizar horarios**: Modifica `timeSlots` en `src/components/BookingSystem.tsx`
3. **Cambiar información de contacto**: Actualiza `src/components/Contact.tsx`
4. **Personalizar colores**: Modifica las variables CSS en `src/index.css`

## 📱 Funcionalidades del Sistema

### Para Clientes
- ✅ Ver servicios y precios
- ✅ Reservar citas online
- ✅ Seleccionar fecha y hora
- ✅ Ver galería de trabajos
- ✅ Información de contacto

### Para el Barbero (Admin)
- ✅ Ver agenda del día
- ✅ Ver agenda semanal
- ✅ Marcar citas como completadas
- ✅ Cancelar citas
- ✅ Eliminar citas del sistema

## 🎨 Personalización del Diseño

### Colores
Los colores están definidos en `src/index.css` usando variables CSS:
- `--primary`: Dorado (#FFD700)
- `--background`: Negro oscuro
- `--card`: Gris oscuro
- `--foreground`: Dorado claro

### Tipografía
- Fuente principal: System fonts optimizadas
- Gradiente dorado para títulos principales
- Jerarquía visual clara

## 📞 Soporte y Contacto

Para soporte técnico o consultas sobre la implementación:

- **Instagram**: [@jose_elbarbero_](https://www.instagram.com/jose_elbarbero_/?hl=es)
- **Email**: jose@elbarbero.com
- **Teléfono**: +34 123 456 789

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para José El Barbero - Barbería Moderna y Contemporánea**
