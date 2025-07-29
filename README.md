# 🚀 AI Tracking Revolution - Landing Page

Una landing page revolucionaria para un sistema de tracking automático con IA que genera análisis personalizados y feedback inteligente para equipos de ventas.

## ✨ Características Principales

### 🎨 **Diseño Futurista**
- Paleta de colores sci-fi (Azul eléctrico #0066FF, Púrpura #6B46C1, Verde neón #00FF88)
- Animaciones cinematográficas con Framer Motion
- Efectos de partículas y elementos 3D sutiles
- Gradientes animados y efectos glow

### ⚡ **Funcionalidades Interactivas**
- **Hero dinámico** con textos animados tipo typewriter
- **Gestor de links inteligente** con validación en tiempo real
- **Sistema de análisis con IA** conectado a webhook
- **Visualización de resultados** con métricas de closers
- **Reportes detallados** con formato markdown

### 🛠️ **Stack Tecnológico**
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Deployment**: Optimizado para Vercel

## 🎯 **Experiencia de Usuario**

1. **Agregar Links**: Los usuarios pueden agregar URLs con el closer responsable
2. **Validación Inteligente**: Validación automática de URLs y feedback visual
3. **Análisis con IA**: Procesamiento automático con indicadores de progreso
4. **Resultados Dinámicos**: Tabla de closers ordenada por performance
5. **Reportes Detallados**: Análisis completo con insights personalizados

## 🚀 **Instalación y Uso**

```bash
# Clonar el repositorio
git clone https://github.com/lcqv/paginatesteo.git
cd paginatesteo

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔗 **Integración con Webhook**

La aplicación se conecta a un webhook POST en:
```
https://conexiones.automatizacionesia.com/webhook/recibirparanalisis
```

### Payload enviado:
```json
{
  "links": [
    {
      "id": "abc123",
      "url": "https://ejemplo.com",
      "domain": "ejemplo.com",
      "closer": "Juan Pérez",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z",
  "totalLinks": 1
}
```

### Respuesta esperada:
```json
[
  {
    "resumen": {
      "closers": [
        {
          "name": "Juan",
          "totalProspectos": 5,
          "totalCierres": 2,
          "closeRate": 40.0
        }
      ]
    }
  },
  {
    "output": "Reporte detallado en markdown..."
  }
]
```

## 🎨 **Componentes Principales**

- **HeroSection**: Hero dinámico con animaciones épicas
- **LinkManager**: Gestor interactivo de links con validación
- **BenefitsSection**: Sección de beneficios con micro-animaciones
- **FuturisticButton**: Botones con efectos glow y animaciones
- **GlowInput**: Inputs con efectos de brillo futurista
- **AnimatedText**: Textos con efectos typewriter

## 📊 **Performance**

- ⚡ Carga optimizada < 3 segundos
- 🎯 Animaciones a 60fps
- 📱 Diseño completamente responsivo
- ♿ Accesibilidad optimizada
- 🚀 SEO optimizado

## 🔧 **Scripts Disponibles**

```bash
npm run dev      # Desarrollo
npm run build    # Construcción para producción
npm run start    # Servidor de producción
npm run lint     # Linting
```

## 🌟 **Desarrollado con**

- **Principio 80/20**: Enfoque en elementos de máximo impacto visual
- **Performance First**: Optimización de Core Web Vitals
- **UX Cinematográfico**: Cada interacción cuenta una historia
- **Responsive Design**: Perfecto en móvil, tablet y desktop

---

**🔮 Una experiencia que transporta a los usuarios al futuro del tracking con IA**

*Desarrollado por el equipo de AI Tracking Revolution*
