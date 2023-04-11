-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "posterID" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_posterID_fkey" FOREIGN KEY ("posterID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
