import { prisma } from "@/lib/prisma";
import { add, remove } from "@/lib/broadcast";
export async function GET(){
  const config=await prisma.config.findUnique({where:{id:1}});
  const tickets=await prisma.ticket.findMany({orderBy:{numero:"asc"}});
  const pagos:Record<string,string>={}, reservados:Record<string,string>={}; for(const t of tickets){ if(t.status==="pago") pagos[String(t.numero)]=t.nome||""; else if(t.status==="reservado") reservados[String(t.numero)]=t.nome||""; }
  const init={ config, pagos, reservados };
  const stream = new ReadableStream({
    start(controller){ add(controller); controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(init)}\n\n`)); },
    cancel(controller){ remove(controller); }
  });
  return new Response(stream, { headers: { "Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive" } });
}
export const dynamic = "force-dynamic";
