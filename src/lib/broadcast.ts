type Ctrl = ReadableStreamDefaultController;
const clients = new Set<Ctrl>();
export function add(c:Ctrl){ clients.add(c); }
export function remove(c:Ctrl){ clients.delete(c); }
export function broadcast(data:any){
  const msg=`data: ${JSON.stringify(data)}\n\n`;
  for(const c of clients){ try{ c.enqueue(new TextEncoder().encode(msg)); }catch{ clients.delete(c); } }
}
