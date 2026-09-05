export async function POST(req:Request){
  const { pw } = await req.json();
  if(pw !== (process.env.ADMIN_PASSWORD||"bela2026")) return Response.json({error:"senha incorreta"},{status:401});
  return new Response(JSON.stringify({ok:true}), { headers: { "Set-Cookie": `admin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400` , "Content-Type":"application/json"} });
}
