/*
  # SRAP Core Schema - Sistema de Gamificacion Existencial

  ## 1. Tablas Principales
  
  ### `user_profiles`
  Perfil extendido del usuario con metricas de gamificacion.
  - `id` (uuid, PK, ref: auth.users)
  - `display_name` (text) - Nombre para mostrar
  - `total_evaluations` (int) - Contador de examenes completados
  - `current_level` (int) - Nivel actual del usuario (1-10)
  - `experience_points` (int) - XP acumulados
  - `streak_days` (int) - Dias consecutivos de evaluacion
  - `last_evaluation_date` (date) - Ultima vez que completo examen
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `evaluations`
  Registro historico de cada examen SRAP completado.
  - `id` (uuid, PK)
  - `user_id` (uuid, FK -> user_profiles)
  - `bleeding_center` (text) - cabeza | corazon | cuerpo
  - `sacrifice_center` (text) - cabeza | corazon | cuerpo
  - `oxygen_actions` (text[]) - Array de acciones elegidas
  - `synthesis_text` (text) - Sintesis escrita por usuario
  - `ai_analysis` (text) - Respuesta de SRAP-AI
  - `ai_synthesis_feedback` (text, nullable) - Analisis de sintesis
  - `xp_earned` (int) - XP ganados en esta evaluacion
  - `completed_at` (timestamptz)

  ### `achievements`
  Sistema de logros desbloqueables.
  - `id` (uuid, PK)
  - `key` (text, unique) - Identificador del logro (ej: "first_evaluation")
  - `title` (text) - Titulo del logro
  - `description` (text) - Descripcion
  - `icon` (text) - Emoji o icono
  - `xp_reward` (int) - XP que otorga
  - `created_at` (timestamptz)

  ### `user_achievements`
  Logros desbloqueados por usuario.
  - `id` (uuid, PK)
  - `user_id` (uuid, FK -> user_profiles)
  - `achievement_id` (uuid, FK -> achievements)
  - `unlocked_at` (timestamptz)

  ## 2. Seguridad
  - RLS habilitado en todas las tablas
  - Usuarios solo pueden ver/editar sus propios datos
  - Achievements son publicos (read-only para usuarios)

  ## 3. Indices
  - Indice en user_id para queries rapidas
  - Indice en completed_at para analisis temporal
  - Indice compuesto en user_achievements para prevenir duplicados

  ## 4. Gamificacion
  - Niveles del 1 al 10 (cada nivel requiere mas XP)
  - XP base por evaluacion: 50
  - Bonus por streak: +10 XP por dia
  - Achievements otorgan XP adicional
*/

-- Habilitar UUID si no esta habilitado
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text DEFAULT 'Guerrero SRAP',
  total_evaluations int DEFAULT 0,
  current_level int DEFAULT 1,
  experience_points int DEFAULT 0,
  streak_days int DEFAULT 0,
  last_evaluation_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Tabla de evaluaciones
CREATE TABLE IF NOT EXISTS evaluations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  bleeding_center text NOT NULL CHECK (bleeding_center IN ('cabeza', 'corazon', 'cuerpo')),
  sacrifice_center text NOT NULL CHECK (sacrifice_center IN ('cabeza', 'corazon', 'cuerpo')),
  oxygen_actions text[] DEFAULT '{}',
  synthesis_text text DEFAULT '',
  ai_analysis text DEFAULT '',
  ai_synthesis_feedback text,
  xp_earned int DEFAULT 50,
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own evaluations"
  ON evaluations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own evaluations"
  ON evaluations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_evaluations_user_id ON evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_completed_at ON evaluations(completed_at DESC);

-- Tabla de achievements
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  icon text DEFAULT '⚔️',
  xp_reward int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- Tabla de achievements desbloqueados
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);

-- Insertar achievements iniciales
INSERT INTO achievements (key, title, description, icon, xp_reward) VALUES
  ('first_blood', 'Primera Sangre', 'Completaste tu primer examen SRAP. Bienvenido al campo de batalla.', '🩸', 100),
  ('week_warrior', 'Guerrero Semanal', 'Mantuviste una racha de 7 dias consecutivos.', '⚔️', 200),
  ('month_survivor', 'Superviviente Mensual', '30 dias enfrentando la realidad cruda.', '💀', 500),
  ('level_5', 'Veterano SRAP', 'Alcanzaste el nivel 5. Ya no hay vuelta atras.', '🎖️', 300),
  ('level_10', 'Maestro de la Realidad', 'Nivel 10. Has visto el abismo y el abismo te ha visto.', '👁️', 1000),
  ('ten_evaluations', 'Decada de Decisiones', 'Completaste 10 evaluaciones. Conoces tus sacrificios.', '📊', 250),
  ('honest_synthesis', 'Honestidad Brutal', 'Tu sintesis fue validada por SRAP-AI como genuina.', '✍️', 150)
ON CONFLICT (key) DO NOTHING;

-- Funcion para actualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
