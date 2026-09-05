"use client";
import { useEffect, useState } from "react";
export default function Home(){
  const [data,setData]=useState<any>(null); const [sel,setSel]=useState<number|null>(null); const [nome,setNome]=useState("");
  const load=()=>fetch("/api/tickets").then(r=>r.json()).then(setData);
  useEffect(()=>{ load(); const es=new EventSource("/api/tickets/stream"); es.onmessage=e=>setData(JSON.parse(e.data)); return ()=>es.close(); },[]);
  const fmt=(n:number)=>String(n).padStart(3,"0");
  const reservar=async()=>{ const res=await fetch("/api/reserve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numero:sel,nome})}); if(!res.ok){alert((await res.json()).error); return;} setSel(null); setNome(""); load(); };
  if(!data) return <p className="p-4">Carregando...</p>;
  const pagos=Object.keys(data.pagos).length, reservados=Object.keys(data.reservados).length;
  return (
    <main className="max-w-4xl mx-auto p-4">
      <header className="text-center mb-4"><h1 className="text-2xl font-bold">{data.config.titulo}</h1><p className="text-sm">Prêmio: {data.config.premio} · Valor: {data.config.valor} · Sorteio: {data.config.sorteio}</p><p className="italic text-sm">Pix: {data.config.pix}</p></header>
      <div className="flex gap-2 justify-center my-3 text-xs"><span className="border border-black px-2 py-1 rounded bg-white">DISPONÍVEL</span><span className="border border-black px-2 py-1 rounded bg-orange-400">RESERVADO</span><span className="border border-black px-2 py-1 rounded bg-green-600 text-white">PAGO</span></div>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {Array.from({length:data.config.quantidade},(_,i)=>{ const n=data.config.inicio+i, k=String(n); const isPago=k in data.pagos, isRes=k in data.reservados&&!isPago; const st=isPago?"pago":isRes?"reservado":"disponivel"; const nm=isPago?data.pagos[k]:isRes?data.reservados[k]:""; return <div key={n} onClick={()=>!isPago&&!isRes&&setSel(n)} className={`h-[62px] border border-black rounded flex flex-col items-center justify-center p-1 ${st==="pago"?"bg-green-600 text-white":st==="reservado"?"bg-orange-400 cursor-default":"bg-white cursor-pointer"}`}><span className="font-bold text-[15px]">{fmt(n)}</span>{nm&&<span className="text-[10px] text-center leading-none">{nm}</span>}</div>;})}
      </div>
      <p className="text-center mt-3 text-sm">Disponíveis: <b>{data.config.quantidade-pagos-reservados}</b> | Reservados: <b>{reservados}</b> | Pagos: <b>{pagos}</b></p>
      <p className="text-center mt-2"><a href="/admin" className="underline text-sm">Área do admin</a></p>
      {sel!==null&&<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4" onClick={()=>setSel(null)}><div className="bg-white p-4 rounded border w-full max-w-sm" onClick={e=>e.stopPropagation()}><h3 className="font-bold mb-2">Reservar número {fmt(sel)}</h3><label className="block mb-2 text-sm">Nome* <input value={nome} onChange={e=>setNome(e.target.value)} className="w-full border p-2 rounded"/></label><div className="flex gap-2"><button onClick={reservar} className="bg-black text-white px-4 py-2 rounded text-sm">Confirmar</button><button onClick={()=>setSel(null)} className="border px-4 py-2 rounded text-sm">Cancelar</button></div></div></div>}
    </main>
  );
}
