-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "name" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "user_country_visits" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "countryName" TEXT NOT NULL,
    "visitCount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "user_country_visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_country_visits_userId_countryName_key" ON "user_country_visits"("userId", "countryName");

-- AddForeignKey
ALTER TABLE "user_country_visits" ADD CONSTRAINT "user_country_visits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_country_visits" ADD CONSTRAINT "user_country_visits_countryName_fkey" FOREIGN KEY ("countryName") REFERENCES "countries"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
