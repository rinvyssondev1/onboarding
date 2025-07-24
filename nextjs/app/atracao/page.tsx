"use client";
import { useState } from "react";

export default function NovaAtracaoPage() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/attraction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", description: "" });
      } else {
        setError("Erro ao criar atração.");
      }
    } catch {
      setError("Erro ao criar atração.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Nova Atração</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg p-3 text-lg"
            placeholder="Nome da atração"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <textarea
            className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg p-3 text-base"
            placeholder="Descrição"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={4}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition mt-2"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Criar Atração"}
          </button>
          {success && <div className="text-green-600 text-center font-medium mt-2">Atração criada com sucesso!</div>}
          {error && <div className="text-red-600 text-center font-medium mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}
