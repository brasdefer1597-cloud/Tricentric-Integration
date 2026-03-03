# ARQUITECTURA SRAP - BLUEPRINT TECNICO

## VISION GENERAL

SRAP es una plataforma de autoevaluacion existencial gamificada que combina psicologia brutal, filosofia cruda y mecanicas de juego para crear un sistema de crecimiento personal sin autoengano.

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                        │
├─────────────────────────────────────────────────────────────────┤
│  Components:                                                    │
│  ├─ SectionHeader        (UI: Branding)                        │
│  ├─ GamificationDashboard (UI: Stats, Levels, XP)             │
│  ├─ SectionTruths        (Content: Filosofia SRAP)            │
│  ├─ SectionExam          (Logic: Core Evaluation Flow)         │
│  └─ SectionBreathing     (UI: Micro-interaccion)              │
│                                                                 │
│  Hooks:                                                         │
│  ├─ useProfile           (Data: User state)                    │
│  ├─ useGamification      (Logic: XP, Levels, Achievements)    │
│  └─ useAnalysis          (API: Gemini AI communication)        │
│                                                                 │
│  Lib:                                                           │
│  ├─ supabase.ts          (Client initialization)               │
│  └─ gamification.ts      (XP calculations, level logic)        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE BACKEND                             │
├─────────────────────────────────────────────────────────────────┤
│  Authentication:                                                │
│  └─ Email/Password (RLS-protected)                             │
│                                                                 │
│  Database (PostgreSQL):                                         │
│  ├─ user_profiles       (Gamification state)                   │
│  ├─ evaluations         (Historical record)                    │
│  ├─ achievements        (Unlockable rewards)                   │
│  └─ user_achievements   (User progress tracking)               │
│                                                                 │
│  Edge Functions:                                                │
│  └─ srap-analyze        (Gemini AI proxy - API key secured)    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
├─────────────────────────────────────────────────────────────────┤
│  Google Gemini API:                                             │
│  └─ gemini-2.0-flash-exp (Brutal AI analysis)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## FLUJO DE DATOS CRITICO

### 1. USUARIO COMPLETA EXAMEN

```
User Input (SectionExam)
   ↓
[bleeding, sacrifice, oxygen, synthesis]
   ↓
useAnalysis.analyze()
   ↓
Edge Function: srap-analyze
   ↓
Gemini API (prompt engineering brutal)
   ↓
AI Response → Modal Display
   ↓
User clicks GUARDAR
   ↓
Supabase:
  ├─ Insert evaluation record
  ├─ Update user_profiles (XP, streak, level)
  └─ Check & unlock achievements
   ↓
refreshProfile() → Update UI
```

### 2. GAMIFICACION ENGINE

```
Profile Data:
  ├─ experience_points: 1250
  ├─ current_level: 4
  ├─ streak_days: 12
  └─ total_evaluations: 15

Calculations (gamification.ts):
  ├─ calculateLevel(xp) → Determina nivel actual
  ├─ getXPForNextLevel(level) → XP requeridos
  └─ shouldUnlockAchievement() → Logica de logros

Display:
  └─ GamificationDashboard → Visualizacion completa
```

---

## ESTRUCTURA DE DIRECTORIOS

```
/
├── components/
│   ├── ui/
│   │   ├── Modal.tsx           # Componente reutilizable de dialog
│   │   ├── LoadingSpinner.tsx  # Estado de carga unificado
│   │   ├── ProgressBar.tsx     # Barra de progreso gamificada
│   │   └── LevelBadge.tsx      # Badge de nivel con animacion
│   ├── SectionHeader.tsx       # Header con branding SRAP
│   ├── SectionTruths.tsx       # Filosofia de los 3 centros
│   ├── SectionExam.tsx         # Core: Formulario de evaluacion
│   ├── SectionBreathing.tsx    # Micro-interaccion: Oxigeno
│   └── GamificationDashboard.tsx # Dashboard de stats
│
├── hooks/
│   ├── useProfile.ts           # Fetch & manage user profile
│   ├── useGamification.ts      # Calculate XP, levels, achievements
│   └── useAnalysis.ts          # Communicate with AI Edge Function
│
├── lib/
│   ├── supabase.ts             # Supabase client singleton
│   └── gamification.ts         # XP curves, level logic
│
├── types/
│   ├── index.ts                # Core TypeScript types
│   └── database.ts             # Supabase auto-generated types
│
├── supabase/
│   └── functions/
│       └── srap-analyze/
│           └── index.ts        # Edge Function: Gemini API proxy
│
├── App.tsx                     # Main app component
├── index.tsx                   # React entry point
├── index.html                  # HTML shell
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind + safelist
└── tsconfig.json               # TypeScript config
```

---

## PATRONES DE DISEÑO IMPLEMENTADOS

### 1. SEPARACION DE CONCERNS (SoC)
- **UI Components**: Solo rendering, delegando logica a hooks
- **Hooks**: Encapsulan estado y side effects
- **Lib**: Utilidades puras, sin side effects

### 2. SINGLE SOURCE OF TRUTH
- `supabase.auth` → Estado de autenticacion
- `user_profiles` → Estado de gamificacion
- `evaluations` → Historial inmutable

### 3. COMPOSITION OVER INHERITANCE
- Componentes UI atomicos reutilizables
- Props explicitas, no props drilling
- Custom hooks para logica compartida

### 4. PROGRESSIVE ENHANCEMENT
- App funciona sin auth (modo lectura)
- Gamificacion aparece solo si logged in
- Fallbacks en errores de API

---

## SEGURIDAD

### RLS (Row Level Security)
Todas las tablas tienen RLS habilitado con politicas restrictivas:
- **SELECT**: Solo datos propios (`auth.uid() = user_id`)
- **INSERT**: Solo crear registros propios
- **UPDATE**: Solo modificar datos propios
- **DELETE**: Bloqueado (data integrity)

### API Key Protection
- Gemini API key **nunca** expuesta en frontend
- Gestionada via Edge Function en servidor
- Usuario autenticado via JWT en requests

### Data Validation
- TypeScript types estrictos
- Database constraints (CHECK, UNIQUE, FK)
- Input validation en frontend y backend

---

## GAMIFICACION: MECANICAS

### Sistema de XP
```typescript
Base XP: 50 por evaluacion
Bonus Streak: +10 XP por dia consecutivo
Achievement Bonus: Variable (50-1000 XP)

Curva de Niveles:
Nivel 1: 0 XP
Nivel 2: 100 XP
Nivel 3: 250 XP
Nivel 4: 500 XP
Nivel 5: 850 XP
Nivel 6: 1300 XP
Nivel 7: 1900 XP
Nivel 8: 2700 XP
Nivel 9: 3750 XP
Nivel 10: 5000 XP (MAX)
```

### Achievements Disponibles
1. **Primera Sangre** (100 XP): Completar primer examen
2. **Guerrero Semanal** (200 XP): 7 dias de racha
3. **Superviviente Mensual** (500 XP): 30 dias de racha
4. **Veterano SRAP** (300 XP): Alcanzar nivel 5
5. **Maestro de la Realidad** (1000 XP): Alcanzar nivel 10
6. **Decada de Decisiones** (250 XP): 10 evaluaciones totales
7. **Honestidad Brutal** (150 XP): Sintesis validada por IA

### Loops de Engagement
- **Daily Streak**: Incentiva uso diario
- **Progress Bars**: Feedback visual de avance
- **Achievement Unlocks**: Micro-recompensas
- **Level Titles**: Status social (ej: "Decodificador Supremo")

---

## MICRO-INTERACCIONES

### Feedback Visual
- **Breathing Animation**: Indica vida, presencia
- **Pulse Effect**: Botones criticos (ACEPTAR REALIDAD)
- **Shimmer**: Progress bars en movimiento
- **Scale In**: Modals con entrada suave
- **Fade In**: Transiciones de secciones

### Feedback Haptico (Conceptual)
- Click en centro (bleeding/sacrifice) → Subtle vibration
- Achievement unlock → Sharp pulse
- Level up → Extended celebration

---

## DEPLOYMENT CHECKLIST

### Variables de Entorno Requeridas
```bash
# Frontend (.env)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Backend (Supabase Secrets)
GEMINI_API_KEY=AIzaSy...
```

### Pasos de Deploy
1. Configurar proyecto Supabase
2. Ejecutar migracion `create_srap_core_schema`
3. Deploy Edge Function `srap-analyze`
4. Configurar Gemini API key en secrets
5. Build frontend: `npm run build`
6. Deploy a Vercel/Netlify

### Health Checks
- [ ] Database migrations aplicadas
- [ ] Edge Function deployed
- [ ] API keys configuradas
- [ ] Build exitoso
- [ ] Auth funcionando
- [ ] RLS policies activas

---

## FUTURAS MEJORAS (ROADMAP)

### Fase 2: Social
- Compartir evaluaciones anonimas
- Comparar estadisticas con otros usuarios
- Tabla de clasificacion (leaderboard)

### Fase 3: Analytics
- Dashboard de tendencias (¿que centro sangra mas?)
- Graficos de progreso temporal
- Predicciones de IA sobre patrones

### Fase 4: Expansion
- Exportar historial a PDF
- Integracion con calendario
- Recordatorios inteligentes

---

**CONCLUS
ION**: Esta arquitectura prioriza **seguridad**, **escalabilidad** y **engagement**. Cada decision tecnica refuerza la filosofia SRAP: realidades crudas, sin autoengano, con progreso medible.
