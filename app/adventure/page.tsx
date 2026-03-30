"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Heart, Star, Trash2, Plus, Minus, Flag } from "lucide-react";

export default function AdventureHome() {
  const [task, setTask] = useState("");
  const [mission, setMission] = useState("");
  const [category, setCategory] = useState("dates");
  const [tasks, setTasks] = useState<{ text: string; done: boolean; category: string }[]>([]);
  const [missions, setMissions] = useState<{ text: string; progress: number }[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("advHome_tasks");
    const storedMissions = localStorage.getItem("advHome_missions");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedMissions) setMissions(JSON.parse(storedMissions));
  }, []);

  const addTask = () => {
    if (!task.trim()) return;
    const newTasks = [...tasks, { text: task, done: false, category }];
    setTasks(newTasks);
    setTask("");
    localStorage.setItem("advHome_tasks", JSON.stringify(newTasks));
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    localStorage.setItem("advHome_tasks", JSON.stringify(updated));
  };

  const addMission = () => {
    if (!mission.trim()) return;
    const newMissions = [...missions, { text: mission, progress: 0 }];
    setMissions(newMissions);
    setMission("");
    localStorage.setItem("advHome_missions", JSON.stringify(newMissions));
  };

  const updateMissionProgress = (index, value) => {
    const updated = [...missions];
    updated[index].progress = Math.min(100, Math.max(0, value));
    setMissions(updated);
    localStorage.setItem("advHome_missions", JSON.stringify(updated));
  };

  const removeTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("advHome_tasks", JSON.stringify(updated));
  };

  const removeMission = (index) => {
    const updated = missions.filter((_, i) => i !== index);
    setMissions(updated);
    localStorage.setItem("advHome_missions", JSON.stringify(updated));
  };

  const colors = {
    dates: "bg-pink-200 border-pink-300 text-pink-900",
    viagens: "bg-blue-200 border-blue-300 text-blue-900",
    trilhas: "bg-green-200 border-green-300 text-green-900",
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center pb-20">
      
      {/* ==== BANNER PREMIUM ADVENTURE ==== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full relative overflow-hidden rounded-b-[48px] shadow-2xl"
        style={{ height: 380 }}
      >
        {/* ── Camada 0: céu gradiente ── */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(170deg, #1a1035 0%, #3d2c6e 28%, #c0502a 60%, #f5a623 80%, #ffd97d 100%)",
          }}
        />

        {/* ── Camada 1: estrelas ── */}
        {[
          { cx: "8%",  cy: "9%",  r: 1.3 },
          { cx: "18%", cy: "5%",  r: 1   },
          { cx: "30%", cy: "12%", r: 1.5 },
          { cx: "45%", cy: "4%",  r: 1   },
          { cx: "55%", cy: "14%", r: 1.2 },
          { cx: "68%", cy: "7%",  r: 0.9 },
          { cx: "78%", cy: "3%",  r: 1.4 },
          { cx: "88%", cy: "11%", r: 1   },
          { cx: "93%", cy: "19%", r: 0.8 },
          { cx: "12%", cy: "22%", r: 0.7 },
          { cx: "38%", cy: "20%", r: 1   },
        ].map((s, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full bg-white"
            style={{ left: s.cx, top: s.cy, width: s.r * 2 + "px", height: s.r * 2 + "px" }}
          />
        ))}

        {/* ── Camada 2: sol com brilho ── */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute"
          style={{ right: "12%", top: "12%" }}
        >
          {/* halo */}
          <div
            className="absolute rounded-full"
            style={{
              width: 110, height: 110,
              top: -19, left: -19,
              background: "radial-gradient(circle, rgba(255,200,80,0.45) 0%, transparent 70%)",
            }}
          />
          {/* disco */}
          <div
            className="rounded-full"
            style={{
              width: 72, height: 72,
              background: "radial-gradient(circle at 38% 38%, #ffe87a, #f5a623)",
              boxShadow: "0 0 32px 12px rgba(245,166,35,0.5)",
            }}
          />
          {/* raios */}
          <svg width="72" height="72" viewBox="0 0 72 72" className="absolute top-0 left-0" style={{ opacity: 0.55 }}>
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
              <line
                key={deg}
                x1="36" y1="4" x2="36" y2="12"
                stroke="#ffd97d" strokeWidth="2.2" strokeLinecap="round"
                transform={`rotate(${deg} 36 36)`}
              />
            ))}
          </svg>
        </motion.div>

        {/* ── Camada 3: montanhas distantes (roxo/névoa) ── */}
        <motion.svg
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          viewBox="0 0 400 160"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full"
          style={{ height: 220 }}
        >
          <polygon
            points="0,160 60,60 120,100 180,30 240,90 310,50 370,80 400,60 400,160"
            fill="#6b3d9e" opacity="0.45"
          />
          <polygon
            points="0,160 80,80 160,40 230,70 290,35 350,65 400,45 400,160"
            fill="#4a2880" opacity="0.35"
          />
        </motion.svg>

        {/* ── Camada 4: montanhas próximas (laranja/âmbar) ── */}
        <motion.svg
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          viewBox="0 0 400 130"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full"
          style={{ height: 180 }}
        >
          {/* neve pico esquerdo */}
          <polygon points="0,130 70,20 140,130" fill="#c0502a" opacity="0.85" />
          <polygon points="55,40 70,20 85,40" fill="white" opacity="0.75" />
          {/* pico central */}
          <polygon points="100,130 200,10 300,130" fill="#a83e20" opacity="0.9" />
          <polygon points="182,30 200,10 218,30" fill="white" opacity="0.8" />
          {/* pico direito */}
          <polygon points="270,130 340,35 400,130" fill="#c0502a" opacity="0.85" />
          <polygon points="325,55 340,35 355,55" fill="white" opacity="0.7" />
        </motion.svg>

        {/* ── Camada 5: chão verde ── */}
        <motion.svg
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full"
          style={{ height: 90 }}
        >
          <path
            d="M0,80 Q50,30 120,50 Q200,70 280,35 Q340,20 400,45 L400,80 Z"
            fill="#2d6a4f"
          />
          <path
            d="M0,80 Q80,55 160,65 Q240,75 320,55 Q360,48 400,60 L400,80 Z"
            fill="#1b4332"
          />
        </motion.svg>

        {/* ── Camada 6: pinheiros ── */}
        <motion.svg
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          viewBox="0 0 400 120"
          className="absolute bottom-0 w-full"
          style={{ height: 110 }}
        >
          {/* árvore esquerda */}
          <polygon points="28,95 42,40 56,95" fill="#1b4332" />
          <polygon points="22,80 42,28 62,80" fill="#2d6a4f" />
          <polygon points="16,68 42,14 68,68" fill="#40916c" />
          <rect x="38" y="95" width="8" height="14" fill="#6b3a2a" />

          {/* árvore pequena */}
          <polygon points="68,95 78,60 88,95" fill="#1b4332" />
          <polygon points="64,82 78,48 92,82" fill="#2d6a4f" />
          <rect x="74" y="95" width="6" height="10" fill="#6b3a2a" />

          {/* direita — grupo de 3 */}
          <polygon points="300,95 316,38 332,95" fill="#1b4332" />
          <polygon points="294,78 316,24 338,78" fill="#2d6a4f" />
          <polygon points="288,62 316,10 344,62" fill="#40916c" />
          <rect x="312" y="95" width="8" height="14" fill="#6b3a2a" />

          <polygon points="340,98 352,55 364,98" fill="#1b4332" />
          <polygon points="335,84 352,42 369,84" fill="#2d6a4f" />
          <rect x="348" y="98" width="7" height="11" fill="#6b3a2a" />

          <polygon points="368,99 378,65 388,99" fill="#1b4332" />
          <polygon points="364,86 378,52 392,86" fill="#2d6a4f" />
          <rect x="374" y="99" width="6" height="10" fill="#6b3a2a" />
        </motion.svg>

        {/* ── Camada 7: trilha ── */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          viewBox="0 0 400 80"
          className="absolute bottom-0 w-full"
          style={{ height: 80 }}
        >
          <path
            d="M160,80 Q190,50 220,58 Q260,68 290,48 Q320,32 360,55"
            stroke="#d4a056" strokeWidth="3.5" fill="none"
            strokeDasharray="6 4" strokeLinecap="round" opacity="0.7"
          />
        </motion.svg>

        {/* ── Camada 8: fogueira ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="absolute"
          style={{ bottom: 22, left: "50%", transform: "translateX(-50%)" }}
        >
          <svg viewBox="0 0 48 48" width="52" height="52">
            {/* brilho */}
            <circle cx="24" cy="30" r="14" fill="rgba(255,140,0,0.18)" />
            {/* lenhas */}
            <line x1="10" y1="42" x2="28" y2="36" stroke="#6b3a2a" strokeWidth="3" strokeLinecap="round" />
            <line x1="38" y1="42" x2="20" y2="36" stroke="#6b3a2a" strokeWidth="3" strokeLinecap="round" />
            {/* chama externa */}
            <motion.path
              d="M24,36 Q18,28 22,18 Q24,24 28,20 Q30,28 24,36Z"
              fill="#f5a623"
              animate={{ scaleY: [1, 1.12, 0.95, 1.08, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "24px 36px" }}
            />
            {/* chama interna */}
            <motion.path
              d="M24,36 Q21,31 23,24 Q24,28 26,25 Q27,31 24,36Z"
              fill="#ffe066"
              animate={{ scaleY: [1, 1.15, 0.92, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
              style={{ transformOrigin: "24px 36px" }}
            />
          </svg>
        </motion.div>

        {/* ── Texto sobreposto ── */}
        <div className="absolute inset-0 flex flex-col justify-center items-center" style={{ paddingBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="px-5 py-1 rounded-full mb-4"
            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}
          >
            <span className="text-white text-xs font-semibold tracking-widest uppercase opacity-90">
              ✦ Sua jornada começa aqui ✦
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-4xl font-extrabold text-white text-center leading-tight"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.45)", letterSpacing: "-0.5px" }}
          >
            Adventure List
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-white/80 text-base font-medium mt-2 text-center max-w-xs"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            Trilhas, viagens e momentos que valem lembrar
          </motion.p>
        </div>
      </motion.div>


      {/* ==== CONTEÚDO PRINCIPAL ==== */}
      <div className="w-full max-w-3xl p-6 space-y-10">
        
        {/* ==== CATEGORIAS ==== */}
        <Card className="bg-white shadow-xl rounded-3xl p-6 border border-neutral-200">
          <CardContent className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-900">
              Categorias de Aventura
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "dates", label: "Dates" },
                { id: "viagens", label: "Viagens" },
                { id: "trilhas", label: "Trilhas" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`
                    p-3 rounded-xl font-semibold shadow-sm border text-center
                    ${category === c.id
                      ? colors[c.id]
                      : "bg-neutral-100 text-neutral-600 border-neutral-300"
                    }
                  `}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Add Task */}
            <div className="flex gap-3 items-center">
              <Input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Adicionar nova ideia..."
                className="rounded-xl"
              />
<Button
  onClick={addTask}
  className="
    bg-emerald-600 
    text-white 
    rounded-full 
    px-6 
    py-3 
    text-lg 
    font-semibold 
    shadow-lg 
    flex 
    items-center 
    gap-3
    transition 
    active:scale-95
    hover:bg-emerald-500
  "
>
  <svg 
    width="22" 
    height="22" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8"/>
  </svg>

  Adicionar
</Button>
            </div>

            {/* List */}
            <div className="space-y-4">
              {tasks.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl border shadow-sm
                    ${colors[t.category]}
                  `}
                >
                  <Button
                    onClick={() => toggleTask(i)}
                    variant="ghost"
                    className="rounded-full h-10 w-10 flex items-center justify-center bg-white/60 shrink-0"
                  >
                    <Heart
                      className="h-6 w-6 transition-all duration-200"
                      style={{
                        fill: t.done ? "#e11d48" : "transparent",
                        color: t.done ? "#e11d48" : "#9f1239",
                        transform: t.done ? "scale(1.2)" : "scale(1)",
                      }}
                    />
                  </Button>

                  <span
                    className={`text-lg font-medium flex-1 ${
                      t.done ? "line-through opacity-60" : ""
                    }`}
                  >
                    {t.text}
                  </span>

                  <Button
                    onClick={() => removeTask(i)}
                    variant="ghost"
                    className="rounded-full h-9 w-9 flex items-center justify-center bg-white/40 hover:bg-red-100 shrink-0"
                  >
                    <Trash2 className="h-4 w-4 text-red-400 hover:text-red-600" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ==== MISSÕES ==== */}
        <Card className="bg-white shadow-xl rounded-3xl border border-neutral-200 overflow-hidden">
          {/* Header colorido */}
          <div
            className="px-6 pt-6 pb-4"
            style={{
              background: "linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-2xl p-2">
                  <Flag className="text-white h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Missões da Jornada</h2>
                  <p className="text-white/70 text-xs mt-0.5">
                    {missions.filter((m) => m.progress === 100).length} de {missions.length} concluídas
                  </p>
                </div>
              </div>
              {/* mini progress geral */}
              <div className="text-right">
                <span className="text-3xl font-extrabold text-white">
                  {missions.length === 0
                    ? "—"
                    : Math.round(missions.reduce((a, m) => a + m.progress, 0) / missions.length)
                  }%
                </span>
                <p className="text-white/60 text-xs">progresso geral</p>
              </div>
            </div>

            {/* barra geral */}
            {missions.length > 0 && (
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.round(missions.reduce((a, m) => a + m.progress, 0) / missions.length)}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            )}
          </div>

          <CardContent className="space-y-5 px-6 pt-5 pb-6">
            {/* Add mission */}
            <div className="flex gap-2 items-center">
              <Input
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addMission()}
                placeholder="Ex: 5 trilhas, 1 acampamento..."
                className="rounded-2xl border-neutral-200 focus:border-emerald-400"
              />
              <Button
                onClick={addMission}
                className="rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white px-5 gap-2 shrink-0"
              >
                <Plus className="h-4 w-4" /> Adicionar
              </Button>
            </div>

            {missions.length === 0 && (
              <div className="text-center py-8 text-neutral-400">
                <Flag className="mx-auto h-10 w-10 mb-2 opacity-30" />
                <p className="text-sm">Nenhuma missão ainda. Adicione sua primeira!</p>
              </div>
            )}

            <div className="space-y-4">
              {missions.map((m, i) => {
                const done = m.progress === 100;
                const color =
                  m.progress === 100
                    ? { bar: "#059669", bg: "#ecfdf5", border: "#6ee7b7", text: "#064e3b" }
                    : m.progress >= 50
                    ? { bar: "#d97706", bg: "#fffbeb", border: "#fcd34d", text: "#78350f" }
                    : { bar: "#3b82f6", bg: "#eff6ff", border: "#93c5fd", text: "#1e3a8a" };

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border p-4 shadow-sm"
                    style={{ background: color.bg, borderColor: color.border }}
                  >
                    {/* linha título + badge + trash */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-base flex-1" style={{ color: color.text }}>
                        {m.text}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: done ? "#059669" : color.bar,
                            color: "white",
                          }}
                        >
                          {done ? "✓ Concluída" : `${m.progress}%`}
                        </span>
                        <Button
                          onClick={() => removeMission(i)}
                          variant="ghost"
                          className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-100 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </div>

                    {/* barra de progresso */}
                    <div className="mt-3 h-3 bg-white/60 rounded-full overflow-hidden border" style={{ borderColor: color.border }}>
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${m.progress}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{ background: color.bar }}
                      />
                    </div>

                    {/* botões -/+ */}
                    <div className="flex items-center justify-between mt-3 gap-2">
                      <div className="flex gap-2">
                        {[10, 25].map((step) => (
                          <button
                            key={step}
                            onClick={() => updateMissionProgress(i, m.progress - step)}
                            disabled={m.progress === 0}
                            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border bg-white/70 hover:bg-red-50 hover:border-red-300 disabled:opacity-30 transition"
                            style={{ borderColor: color.border, color: color.text }}
                          >
                            <Minus className="h-3 w-3" />{step}%
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {[25, 10].map((step) => (
                          <button
                            key={step}
                            onClick={() => updateMissionProgress(i, m.progress + step)}
                            disabled={m.progress === 100}
                            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border bg-white/70 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-30 transition"
                            style={{ borderColor: color.border, color: color.text }}
                          >
                            <Plus className="h-3 w-3" />{step}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}