# 🔪 SRAP - REALIDADES CRUDAS

**"Tu corazon quiere cambiar el mundo, tu cuerpo pide descanso, y tu cabeza sabe que manana toca pagar el alquiler."**

---

SRAP es una plataforma de autoevaluacion existencial gamificada. Combina psicologia brutal, filosofia cruda y mecanicas de juego RPG para crear un sistema de crecimiento personal sin autoengano.

Potenciada por **Google Gemini AI**, **Supabase** y **React**, SRAP no te da palmaditas en la espalda. Te muestra el mapa de tu campo de batalla interno y te obliga a elegir que centro vas a sacrificar hoy.

---

## STACK TECNOLOGICO

**Frontend:**
- React 19 + TypeScript
- TailwindCSS (diseño oscuro, brutal, responsive)
- Vite (build ultrarapido)

**Backend:**
- Supabase (Auth, Database, Edge Functions)
- PostgreSQL con RLS (Row Level Security)
- Supabase Edge Functions (Deno runtime)

**AI:**
- Google Gemini 2.0 Flash (analisis cinico en <2s)
- API key protegida en backend

**Gamificacion:**
- Sistema de XP y niveles (1-10)
- Achievements desbloqueables
- Racha diaria (streak tracking)
- Dashboard de progreso en tiempo real

---

## INSTALACION Y CONFIGURACION

### 1. Clonar Repositorio
```bash
git clone https://github.com/tu-usuario/srap-realidades-crudas.git
cd srap-realidades-crudas
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raiz del proyecto:

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

La `GEMINI_API_KEY` debe configurarse en los **Supabase Edge Function Secrets**, no en `.env`.

### 4. Setup Supabase

#### A. Crear Proyecto Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Copia `Project URL` y `anon/public key` a tu `.env`

#### B. Ejecutar Migracion de Base de Datos
Ejecuta el SQL en el SQL Editor de Supabase:
```sql
-- Ver contenido completo en el archivo de migracion
-- (disponible en el proyecto como supabase/migrations/...)
```

O usa la CLI de Supabase:
```bash
supabase db push
```

#### C. Deploy Edge Function
La Edge Function `srap-analyze` ya esta creada. Para deployarla:
```bash
# (Esto se hace automaticamente via MCP tools en desarrollo)
```

#### D. Configurar Gemini API Key
1. Obten tu API key de [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Configurala como secret en Supabase:
```bash
supabase secrets set GEMINI_API_KEY=tu_key_aqui
```

### 5. Ejecutar en Desarrollo
```bash
npm run dev
```

La app estara disponible en `http://localhost:3000`

### 6. Build para Produccion
```bash
npm run build
npm run preview  # Preview del build
```

---

## ARQUITECTURA

Ver `ARCHITECTURE.md` para blueprint tecnico completo.

**Flujo Simplificado:**
```
Usuario completa examen
  ↓
Frontend envia request a Edge Function
  ↓
Edge Function llama Gemini API (key segura)
  ↓
AI analiza con prompt brutal
  ↓
Respuesta se guarda en Supabase
  ↓
XP, niveles y achievements se actualizan
  ↓
Dashboard se refresca con nuevo progreso
```

---

## FILOSOFIA SRAP

### Los 3 Centros

1. **CABEZA** (Mente/Control)
   - Promete: Control total
   - Exige: Aceptar el caos y actuar igual

2. **CORAZON** (Emocion/Significado)
   - Promete: Proposito y sentido
   - Exige: Tolerar el vacio y construir sentido

3. **CUERPO** (Fisico/Placer)
   - Promete: Placer constante
   - Exige: Soportar dolor y moverte igual

### El Principio del Sacrificio

No existe "equilibrio perfecto". Cada dia debes elegir conscientemente que centro sacrificar para que los otros dos sobrevivan. SRAP te obliga a admitir esa eleccion sin autoengano.

### Gamificacion Existencial

- **XP Base:** 50 por evaluacion
- **Streak Bonus:** +10 XP por dia consecutivo
- **Niveles:** 1 a 10 (de "Novato Perdido" a "Decodificador Supremo")
- **Achievements:** Desde "Primera Sangre" hasta "Maestro de la Realidad"

El progreso es medible. La realidad es cuantificable. El autoengano, imposible.

---

## CARACTERISTICAS

- Evaluaciones diarias de los 3 centros
- Analisis AI brutal y directo
- Sistema de progreso gamificado
- Historial completo de evaluaciones
- Dashboard de estadisticas
- Racha diaria con bonificaciones
- Achievements desbloqueables
- Micro-interacciones y feedback visual
- Responsive design (mobile-first)
- Modo oscuro por defecto (realidad no es brillante)

---

## SEGURIDAD

- **Row Level Security (RLS)** en todas las tablas
- API key de Gemini nunca expuesta en frontend
- Autenticacion via Supabase Auth
- Validacion de datos en frontend y backend
- CORS configurado correctamente en Edge Functions

---

## DEPLOYMENT

### Vercel (Recomendado para Frontend)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Supabase Edge Functions
Ya deployadas automaticamente via MCP tools.

---

## CONTRIBUIR

Este proyecto nace de la metodologia **SRAP Chalamandra Magistral**. Si quieres contribuir:

1. Fork el repositorio
2. Crea una branch con tu feature
3. Asegurate de que el build pasa
4. Envia PR con descripcion brutal de cambios

Principios de contribucion:
- Codigo limpio y modular
- Sin autoengano tecnico
- Sin features innecesarias
- Realidad > Ilusion

---

## LICENCIA

MIT License. Usa, modifica, destruye. La realidad no tiene copyright.

---

## CONTACTO Y CREDITOS

**Creado por:** Equipo SRAP Senior (Decodificadora Chalamandra Magistral)

**Tecnologias:**
- React Team
- Supabase Team
- Google Gemini Team
- Tailwind Labs

**Filosofia:**
- Gurdjieff (Los 3 Centros)
- Nietzsche (Realidades crudas)
- Estoicismo (Aceptacion activa)
- RPG Mechanics (Gamificacion medible)

---

**RECUERDA:** Este no es un app de "vibra alta". Es un simulador de triaje para el alma. Si buscas consuelo, ve a otro lado. Si buscas verdad medible, bienvenido a SRAP.
