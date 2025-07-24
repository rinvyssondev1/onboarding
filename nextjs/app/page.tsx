'use client';
import { useEffect, useState } from 'react';

type Attraction = {
  id: number;
  name: string;
  description: string;
};

type Work = {
  id: number;
  title: string;
  author: string;
  description: string;
};

export default function Home() {

  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [form, setForm] = useState({ title: '', author: '', description: '' });
  const [editingAttractionId, setEditingAttractionId] = useState<number | null>(null);
  const [editAttractionForm, setEditAttractionForm] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch('/api/attraction')
      .then(res => res.json())
      .then(setAttractions);
  }, []);

  const loadWorks = (id: number) => {
    fetch(`/api/attraction/${id}/work`)
      .then(res => res.json())
      .then(setWorks);
  };

  const handleSelectAttraction = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    loadWorks(attraction.id);
  };

  const handleAddWork = async () => {
    if (!selectedAttraction) return;
    const res = await fetch(`/api/attraction/${selectedAttraction.id}/work`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: '', author: '', description: '' });
      loadWorks(selectedAttraction.id);
    }
  };

  // Função para iniciar edição
  const handleEditAttraction = (a: Attraction) => {
    setEditingAttractionId(a.id);
    setEditAttractionForm({ name: a.name, description: a.description });
  };

  // Função para cancelar edição
  const handleCancelEdit = () => {
    setEditingAttractionId(null);
    setEditAttractionForm({ name: '', description: '' });
  };


  // Função para salvar edição
  const handleSaveEdit = async (id: number) => {
    const res = await fetch(`/api/attraction/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editAttractionForm),
    });
    if (res.ok) {
      // Atualiza lista localmente
      setAttractions(attractions.map(a => a.id === id ? { ...a, ...editAttractionForm } : a));
      handleCancelEdit();
    }
  };

  // Função para deletar uma obra
  const handleDeleteWork = async (id: number) => {
    if (!selectedAttraction) return;
    if (!window.confirm('Tem certeza que deseja excluir esta obra?')) return;
    const res = await fetch(`/api/attraction/${selectedAttraction.id}/work/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setWorks(works.filter(w => w.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-10 text-center tracking-tight drop-shadow">Atrações Turísticas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Lista de atrações */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-semibold text-indigo-700">Lista de atrações</span>
              <button
                onClick={() => window.location.href = '/atracao'}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Nova Atração
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {attractions.map((a) => (
                <div
                  key={a.id}
                  className={`relative rounded-2xl shadow-lg bg-white text-black transition-all duration-200 border-2 ${selectedAttraction?.id === a.id ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-transparent hover:border-indigo-300'} group`}
                  style={{ minHeight: 120 }}
                >
                  <button
                    className="absolute top-3 right-3 p-2 rounded-full bg-indigo-50 hover:bg-indigo-200 shadow transition hidden group-hover:block"
                    title="Editar atração"
                    onClick={e => { e.stopPropagation(); handleEditAttraction(a); }}
                    tabIndex={-1}
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.79l-4 1 1-4 14.362-14.303z" />
                    </svg>
                  </button>
                  {editingAttractionId === a.id ? (
                    <form
                      className="flex flex-col gap-3 p-6"
                      onSubmit={e => { e.preventDefault(); handleSaveEdit(a.id); }}
                    >
                      <input
                        type="text"
                        className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg p-2 text-lg font-semibold"
                        value={editAttractionForm.name}
                        onChange={e => setEditAttractionForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Nome da atração"
                        required
                      />
                      <textarea
                        className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg p-2 text-base"
                        value={editAttractionForm.description}
                        onChange={e => setEditAttractionForm(f => ({ ...f, description: e.target.value }))}
                        placeholder="Descrição"
                        required
                        rows={3}
                      />
                      <div className="flex gap-2 mt-2">
                        <button type="submit" className="bg-green-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-green-700 transition">Salvar</button>
                        <button type="button" className="bg-gray-200 px-4 py-1.5 rounded-lg hover:bg-gray-300 transition" onClick={handleCancelEdit}>Cancelar</button>
                      </div>
                    </form>
                  ) : (
                    <div onClick={() => handleSelectAttraction(a)} className="cursor-pointer p-6">
                      <h2 className="text-2xl font-bold text-indigo-700 mb-1 flex items-center gap-2">
                        {a.name}
                        {selectedAttraction?.id === a.id && <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">Selecionada</span>}
                      </h2>
                      <p className="text-base text-gray-600">{a.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes da atração */}
          <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col">
            {selectedAttraction ? (
              <>
                <h2 className="text-3xl font-bold text-indigo-800 mb-4">Obras de {selectedAttraction.name}</h2>
                <ul className="mb-6 flex flex-col gap-3">
                  {works.length === 0 && <li className="text-gray-400 italic">Nenhuma obra cadastrada.</li>}
                  {works.map((w) => (
                    <li key={w.id} className="border border-indigo-100 bg-indigo-50 p-3 rounded-lg shadow-sm flex items-start justify-between gap-2 group">
                      <div>
                        <div className="font-semibold text-lg text-indigo-700">{w.title}</div>
                        <div className="text-sm text-gray-700 mb-1">Autor: <span className="font-medium">{w.author}</span></div>
                        <p className="text-sm text-gray-600">{w.description}</p>
                      </div>
                      <button
                        title="Excluir obra"
                        className="p-2 rounded-full bg-red-50 hover:bg-red-200 text-red-600 transition hidden group-hover:block"
                        onClick={() => handleDeleteWork(w.id)}
                        type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-4 mt-auto">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-700">Nova Obra</h3>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Título"
                      className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg p-2 text-black"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Autor"
                      className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg p-2 text-black"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                    />
                    <textarea
                      placeholder="Descrição"
                      className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg p-2 text-black"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                    />
                    <button
                      onClick={handleAddWork}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition mt-2 self-end"
                    >
                      Adicionar Obra
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-indigo-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A5.25 5.25 0 0 1 21 10.25c0 2.485-1.5 4.5-4.5 4.5H7.5C4.5 14.75 3 12.735 3 10.25a5.25 5.25 0 0 1 5.638-5.036A7.5 7.5 0 0 1 12 2.25c1.7 0 3.27.56 4.362 1.964z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v6m0 0l2.25-2.25M12 12.75l-2.25-2.25" />
                </svg>
                <p className="text-lg">Selecione uma atração para ver as obras.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


