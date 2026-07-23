-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en', 'fa');

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" "Locale" NOT NULL DEFAULT 'en',
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "highlights" TEXT[],
    "metrics" JSONB,
    "stack" TEXT[],
    "link" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" "Locale" NOT NULL DEFAULT 'en',
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bullets" TEXT[],
    "stack" TEXT[],
    "mediaImage" TEXT NOT NULL,
    "mediaAlt" TEXT NOT NULL,
    "mediaVideo" TEXT,
    "link" TEXT,
    "repo" TEXT,
    "caseStudy" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" "Locale" NOT NULL DEFAULT 'en',
    "title" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "heroMediaSrc" TEXT NOT NULL,
    "heroMediaAlt" TEXT NOT NULL,
    "heroMediaCaption" TEXT,
    "heroMediaVideo" TEXT,
    "metrics" JSONB NOT NULL,
    "stack" TEXT[],
    "liveUrl" TEXT,
    "repoUrl" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudySection" (
    "id" TEXT NOT NULL,
    "caseStudyId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "kicker" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "body" TEXT[],
    "bullets" TEXT[],
    "mediaSrc" TEXT,
    "mediaAlt" TEXT,
    "mediaCaption" TEXT,
    "mediaVideo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" "Locale" NOT NULL DEFAULT 'en',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "readingTime" TEXT NOT NULL,
    "tags" TEXT[],
    "blocks" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" "Locale" NOT NULL DEFAULT 'en',
    "quote" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "link" TEXT,
    "avatar" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Experience_locale_order_idx" ON "Experience"("locale", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_slug_locale_key" ON "Experience"("slug", "locale");

-- CreateIndex
CREATE INDEX "Project_locale_order_idx" ON "Project"("locale", "order");

-- CreateIndex
CREATE INDEX "Project_locale_featured_idx" ON "Project"("locale", "featured");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_locale_key" ON "Project"("slug", "locale");

-- CreateIndex
CREATE INDEX "CaseStudy_locale_order_idx" ON "CaseStudy"("locale", "order");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_slug_locale_key" ON "CaseStudy"("slug", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudySection_caseStudyId_order_key" ON "CaseStudySection"("caseStudyId", "order");

-- CreateIndex
CREATE INDEX "Article_locale_date_idx" ON "Article"("locale", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_locale_key" ON "Article"("slug", "locale");

-- CreateIndex
CREATE INDEX "Testimonial_locale_order_idx" ON "Testimonial"("locale", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_slug_locale_key" ON "Testimonial"("slug", "locale");

-- AddForeignKey
ALTER TABLE "CaseStudySection" ADD CONSTRAINT "CaseStudySection_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "CaseStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
