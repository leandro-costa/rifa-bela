import { prisma } from "@/lib/prisma";
import { broadcast } from "@/lib/broadcast";
function authed(req:Request){ return req.headers.get("cookie")?.includes("admin=1"); }
export async function POST(req:Request){
  if(!authed(req)) return Response.json({error:"unauthorized"},{status:401});
  const { numero, action } = await req.json();
  if(action==="pago") await prisma.ticket.updateMany({ where:{ numero:Number(numero), status:"reservado"}, data:{status:"pago"}});
  else if(action==="reverter") await prisma.ticket.updateMany({ where:{ numero:Number(numero), status:"pago"}, data:{status:"reservado"}});
  else if(action==="cancelar") await prisma.ticket.updateMany({ where:{ numero:Number(numero), status:"reservado"}, data:{status:"disponivel", nome:null, fone:null}});
  else return Response.json({error:"ação inválida"},{status:400});
  const config=await prisma.config.findUnique({where:{id:1}}); const tickets=await prisma.ticket.findMany({orderBy:{numero:"asc"}}); const pagos:Record<string,string>={}, reservados:Record<string,string>={}; for(const t of tickets){ if(t.status==="pago") pagos[String(t.numero)]=t.nome||""; else if(t.status==="reservado") reservados[String(t.numero)]=t.nome||""; }
  broadcast({ config, pagos, reservados });
  return Response.json({ok:true});
}
