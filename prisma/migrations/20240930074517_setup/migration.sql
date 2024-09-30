-- CreateTable
CREATE TABLE "Category_sub_level_1" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sub_level_2_id_list" INTEGER[],
    "desc" TEXT,

    CONSTRAINT "Category_sub_level_1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category_sub_level_2" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "Category_sub_level_2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_sub_level_1_id" INTEGER NOT NULL,
    "item_img" TEXT,
    "desc" TEXT,
    "amount" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "cost_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubLevel2ToSubLevel1" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_sub_level_1_name_key" ON "Category_sub_level_1"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_sub_level_2_name_key" ON "Category_sub_level_2"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SubLevel2ToSubLevel1_AB_unique" ON "_SubLevel2ToSubLevel1"("A", "B");

-- CreateIndex
CREATE INDEX "_SubLevel2ToSubLevel1_B_index" ON "_SubLevel2ToSubLevel1"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_category_sub_level_1_id_fkey" FOREIGN KEY ("category_sub_level_1_id") REFERENCES "Category_sub_level_1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubLevel2ToSubLevel1" ADD CONSTRAINT "_SubLevel2ToSubLevel1_A_fkey" FOREIGN KEY ("A") REFERENCES "Category_sub_level_1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubLevel2ToSubLevel1" ADD CONSTRAINT "_SubLevel2ToSubLevel1_B_fkey" FOREIGN KEY ("B") REFERENCES "Category_sub_level_2"("id") ON DELETE CASCADE ON UPDATE CASCADE;
