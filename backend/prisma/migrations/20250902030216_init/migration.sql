-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Concept" (
    "id" SERIAL NOT NULL,
    "uri" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "Concept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Relation" (
    "id" SERIAL NOT NULL,
    "uri" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Relation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Fact" (
    "id" SERIAL NOT NULL,
    "startUri" TEXT NOT NULL,
    "relationUri" TEXT NOT NULL,
    "endUri" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "public"."User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Concept_uri_key" ON "public"."Concept"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "Relation_uri_key" ON "public"."Relation"("uri");
