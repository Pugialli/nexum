-- CreateTable
CREATE TABLE "@carreiras" (
    "carreira_label" TEXT NOT NULL,
    "carreira_value" TEXT NOT NULL,

    CONSTRAINT "@carreiras_pkey" PRIMARY KEY ("carreira_value")
);

-- CreateIndex
CREATE UNIQUE INDEX "@carreiras_carreira_label_key" ON "@carreiras"("carreira_label");
