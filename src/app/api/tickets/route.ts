import { prisma } from "@/lib/prisma";
export async function GET(){
  const config = await prisma.config.findUnique({where:{id:1}});
  const tickets = await prisma.ticket.findMany({orderBy:{numero:"asc"}});
  const pagos:Record<string,string>={}, reservados:Record<string,string>={};
  for(const t of tickets){ if(t.status==="pago") pagos[String(t.numero)]=t.nome||""; else if(t.status==="reservado") reservados[String(t.numero)]=t.nome||""; }
  return Response.json({ config, pagos, reservados });
}
