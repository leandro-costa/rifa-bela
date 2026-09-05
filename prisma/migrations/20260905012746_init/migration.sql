-- CreateTable
CREATE TABLE "Ticket" (
    "numero" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'disponivel',
    "nome" TEXT,
    "fone" TEXT,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("numero")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "titulo" TEXT NOT NULL,
    "premio" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "pix" TEXT NOT NULL,
    "sorteio" TEXT NOT NULL,
    "inicio" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);
