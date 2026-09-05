-- CreateTable
CREATE TABLE "Ticket" (
    "numero" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'disponivel',
    "nome" TEXT,
    "fone" TEXT
);

-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "titulo" TEXT NOT NULL,
    "premio" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "pix" TEXT NOT NULL,
    "sorteio" TEXT NOT NULL,
    "inicio" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL
);
