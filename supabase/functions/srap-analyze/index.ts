import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// CORS headers - required for client access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Type definitions for request payloads
interface AnalyzeMiseryPayload {
  type: "misery";
  bleeding: string;
  sacrifice: string;
  oxygen: string[];
}

interface AnalyzeSynthesisPayload {
  type: "synthesis";
  synthesis: string;
}

type RequestPayload = AnalyzeMiseryPayload | AnalyzeSynthesisPayload;

// Gemini API interaction
async function callGeminiAPI(prompt: string, systemInstruction: string): Promise<string> {
  const apiKey = Deno.env.get("GEMINI_API_KEY");

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured in Edge Function secrets");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 500,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Gemini API error:", error);
    throw new Error(`Gemini API failed: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ||
         "La IA se niega a analizar tal nivel de contradicción.";
}

// Main handler
Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Parse request body
    const payload: RequestPayload = await req.json();

    let prompt = "";
    const systemInstruction = "Eres SRAP-AI. No usas emojis amigables. Usas metáforas de guerra y supervivencia.";

    // Build prompt based on type
    if (payload.type === "misery") {
      prompt = `
        Actúa como una IA brutalmente honesta y cínica llamada SRAP-AI.
        Analiza la situación actual del usuario sin ofrecer consuelo falso.

        Datos del usuario:
        - Centro que más sangra (sufre): ${payload.bleeding}
        - Sacrificio elegido hoy: ${payload.sacrifice}
        - Acciones de oxígeno (alivio): ${payload.oxygen.join(', ') || 'Ninguna'}

        Tu tarea:
        1. Confirma por qué su elección de sacrificio es dolorosa pero necesaria.
        2. Advierte sobre las consecuencias de ignorar los otros centros.
        3. Da un veredicto de una sola frase lapidaria.

        Usa un tono oscuro, filosófico y directo. Nada de "todo va a salir bien".
      `;
    } else if (payload.type === "synthesis") {
      prompt = `
        Actúa como una IA brutalmente honesta y cínica llamada SRAP-AI.
        Analiza la síntesis del usuario sobre su situación.

        Síntesis del usuario: ${payload.synthesis}

        Tu tarea:
        1. Evalúa si la síntesis es honesta o es autoengaño.
        2. Si es honesta, confirma la dureza de la elección.
        3. Si es autoengaño, destrúyelo con lógica fría.
        4. Termina con una pregunta cortante que le obligue a reflexionar.

        Usa un tono oscuro y directo. Sé implacable pero útil.
      `;
    } else {
      throw new Error("Invalid request type");
    }

    // Call Gemini API
    const analysis = await callGeminiAPI(prompt, systemInstruction);

    // Return response
    return new Response(
      JSON.stringify({ analysis }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Edge Function error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
        analysis: "Error de conexión. Incluso la IA te ha abandonado hoy."
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
