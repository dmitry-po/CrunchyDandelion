USE CrunchyDandelionApp;

CREATE TABLE "Orders" (
    "OrderId" INT NOT NULL PRIMARY KEY,
	"ShiftId" INT NOT NULL,
	"ChannelId" INT NOT NULL,
	"DeliveryAddress" VARCHAR(100),
	"Recepient" VARCHAR(100),
	"RecepientPhone" VARCHAR(12),
	"DeliveryType" VARCHAR(20),
	"PaymentType" VARCHAR(20),
	"Weight" FLOAT,
	"DeliveryTime" TIME,
	"Price" FLOAT,
	"Paid" SMALLINT,
	"Comment" VARCHAR(200)
);

Insert into "Orders" values(1, 1, 1, '����������� ��������, ����������� �������, 21', '�����', '+79161234567', '� ����', '��������', 1.816, '11:00', 368.00, 0, '��� �����');
Insert into "Orders" values(2, 1, 1, '������, ������������ ��., �. 10, ���. 5', '�������', '+79161234567', '� �����', '������', 21.9, '12:00', 17990.00, 0, '������� �� ��������');

select * from "Orders"