USE CrunchyDandelionApp;

CREATE TABLE "OrderLines" (
    "OrderId" INT NOT NULL,
	"LineNum" INT NOT NULL,
	"Item" VARCHAR(100),
	"Volume" FLOAT,
	"Weight" FLOAT,
	"Unit" VARCHAR(10),
	PRIMARY KEY ("OrderId", "LineNum")
);

Insert into "OrderLines" values(1, 1, 'Горошек', 1, 0.4, 'шт');
Insert into "OrderLines" values(1, 2, 'Кукуруза', 3, 0.6, 'шт');
Insert into "OrderLines" values(1, 3, 'Картофель', 1.2, 1.2, 'кг');

select * from "OrderLines"