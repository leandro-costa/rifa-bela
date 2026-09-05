import { prisma } from "@/lib/prisma";
import { broadcast } from "@/lib/broadcast";
export async function POST(req:Request){
  const { numero, nome, fone } = await req.json();
  if(!nome?.trim() || !numero) return Response.json({error:"nome e numero obrigatórios"}, {status:400});
  const config = await prisma.config.findUnique({where:{id:1}});
  if(!config) return Response.json({error:"config não encontrada"},{status:500});
  const n=Number(numero);
  if(n < config.inicio || n >= config.inicio+config.quantidade) return Response.json({error:"fora do intervalo"},{status:400});
  const updated = await prisma.ticket.updateMany({ where:{ numero:n, status:"disponivel" }, data:{ status:"reservado", nome:nome.trim(), fone:fone||null }});
  if(updated.count===0) return Response.json({error:"Número indisponível"}, {status:409});
  const tickets=await prisma.ticket.findMany({orderBy:{numero:"asc"}}); const pagos:Record<string,string>={}, reservados:Record<string,string>={}; for(const t of tickets){ if(t.status==="pago") pagos[String(t.numero)]=t.nome||""; else if(t.status==="reservado") reservados[String(t.numero)]=t.nome||""; }
  broadcast({ config, pagos, reservados });
  return Response.json({ok:true});
}
