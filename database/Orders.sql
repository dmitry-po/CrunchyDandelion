USE CrunchyDandelionApp;

CREATE TABLE "Orders" (
    "OrderId" INT NOT NULL PRIMARY KEY,
	"Shiftid" INT NOT NULL,
	"DeliveryAddress" VARCHAR(100),
	"DeliveryTime" TIME
);

Insert into "Orders" values(1, 1, 'Мичуринский Проспект, Олимпийская Деревня, 21', '11:00');

select * from "Orders"