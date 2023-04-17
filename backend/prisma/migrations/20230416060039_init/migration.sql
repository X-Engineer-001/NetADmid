-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "posterID" INTEGER NOT NULL,
    "text" TEXT NOT NULL DEFAULT 'test',

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_posterID_fkey" FOREIGN KEY ("posterID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
