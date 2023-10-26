-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "isTestOrg" BOOLEAN;

UPDATE "Org" SET "isTestOrg" = true WHERE id IN('0a9f98d7-61b0-4169-a57c-c0a90c42d04e', 'e648b25f-37bf-445c-bf90-00c87f00d84f', '2510b651-720e-405b-85ce-e4cb0a1966dd', '66268c30-5d82-45aa-9ad6-8ed9be83ce2c', 'ef358344-9427-49ff-a96a-d456a47d05fc', 'bb180d71-a49e-4315-a7d7-30ef73ab3a77', '752e05ce-4a81-4148-87c5-30832406d48c', 'f040c93b-ad1b-4ddd-8df4-562faed4f98b', '4b603e66-efdb-4b9a-ab1f-f6567af51d8f', 'f73f4313-7126-4543-878d-6b4f5ed5412e', '76ae5166-3874-419b-a0c2-53bf316fe7a5');
