import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main(){
  await prisma.config.upsert({ where:{id:1}, update:{}, create:{ id:1, titulo:"Rifa da Bela", premio:"Alexa", valor:"R$ 20", pix:"05806787508", sorteio:"07/10/2026 19:00hs", inicio:501, quantidade:50 }});
  const pagos:Record<string,string>={"520":"Laize","539":"Laize","513":"Miguel Malvar","523":"Miguel Malvar","533":"Miguel Malvar","510":"Sueline","537":"Maya (Juliana)","543":"Matheus (Luana)","529":"Little John (Mai)","528":"Enzo e Luiza (Bruna)","502":"Hugo (Marluce)","544":"Miguel Toretto (Tayse)","506":"Thel (Naty)","534":"Lara (Dai)","503":"Caio (Poli)","515":"Gabrielzinho (Milena)","504":"Arthur (Vanessa)","522":"Núbia Vilas boas","521":"Maria (Pamela)"};
  const reservados:Record<string,string>={"501":"Nívia","507":"Nívia","517":"Nívia","519":"Nívia","530":"Nívia","550":"Arthur (Lai)","546":"Helô e Levi (Ivanessa)","511":"Vovó Zete","508":"Vovó Zete","532":"Vovo Joao","549":"Lucas (Livia)","524":"Arthur (Brenda)"};
  for(let n=501;n<=550;n++){ const k=String(n); const status=k in pagos?"pago":k in reservados?"reservado":"disponivel"; const nome=pagos[k]||reservados[k]||null; await prisma.ticket.upsert({ where:{numero:n}, update:{status,nome}, create:{numero:n,status,nome}}); }
  console.log("seed ok");
}
main().finally(()=>prisma.$disconnect());
